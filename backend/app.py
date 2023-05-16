from flask import Flask, jsonify, request, g, current_app
from archive import Archive
from blockchain import Chain, Node
from client import Client
from dotenv import load_dotenv
import requests, pymongo, json, os

load_dotenv()

HOST_NAME = '127.0.0.1'
PORT      = 4242

# Instantiate the Node
app      = Flask(__name__)

# protocol = Client()

DB_KEY = os.getenv('MONGO_DB_KEY')
client = pymongo.MongoClient(DB_KEY)
db = client.medchain

"""
Return this node's full host name and port
ex: 127.0.0.1:9001
"""
def getFullHostName():
    return HOST_NAME + ':' + str(PORT)

"""
Get an entire archive's last block
"""
@app.route('/archive/get/<id>', methods=['GET'])
def getArchive(id):
    print(current_app.config['archive']._archive[0].id)
    rec = current_app.config['archive'].fetch_record(id)
    return jsonify(rec.last_block), 200

"""
A route for creating a signature
"""
@app.route('/signature/create', methods=['GET'])
def createAccount():
    (a, k) = current_app.config['node'].generate_transaction_addr()
    return jsonify({'address': a, 'pubkey': k.decode('utf-8'), 'seed': current_app.config['node']._wallet_seed}), 200


"""
Create an archive
"""
@app.route('/archive/create/patient', methods=['POST'])
def createArchive():
    _data = request.json.get('data')
    #a = address, k = pubkey
    (a, k) = current_app.config['node'].generate_transaction_addr()

    token = Chain(id=a, data=_data)
    current_app.config['archive'].add_record(token)
    obj = {
        'id' : token.id,
        'name': token.chain[0]['name'],
        'dob' : token.chain[0]['dob'],
        'bloodType' : token.chain[0]['bloodType'],
        'allergies' : token.chain[0]['allergies'],
    }
    db.patient.insert_one(obj)
    del obj['_id']
    if len(current_app.config['node'].get_neighbors()) > 0:    
        for node in list(current_app.config['node'].get_neighbors()):
            try: 
                response = requests.post(f'http://{node}/archive/recieve/patient', json=obj)
                print(response)
                response.raise_for_status()
            except Exception as e:
                print("Error: ", e)
                return jsonify({}), 500

    return jsonify(a, _data), 200


"""
Route to create a profile for patient recognized by other nodes in the network
"""
@app.route('/archive/recieve/patient', methods=['POST'])
def receivePatientProfile():
    _data = request.get_json()
    _id = _data['id']
    del _data['id']
    patient = Chain(id=_id, data= _data)
    print(patient)
    current_app.config['archive'].add_record(patient)
    return jsonify({}), 201




"""
Create a profile for doctor
"""
@app.route('/archive/create/doctor', methods=['POST'])
def createDoctorProfile():
    _data = request.json.get('data')
    #a = address, k = pubkey
    (a, k) = current_app.config['node'].generate_transaction_addr()

    obj = {
        'id' : a,
        'name': _data['name'],
    }
    db.doc.insert_one(obj)
    return jsonify(a, _data), 200


"""
A route for verifying that an address/pubkey is authorized to use the platform
"""
@app.route('/search/<opt>/<key>', methods=['GET'])
def deal_with_input(opt, key):
    if opt == 'patient':
        patients = db.patient
        res = patients.find_one({'id': key})
    else:
        doctors = db.doc
        res = doctors.find_one({'id': key})

    if not res:
        return jsonify({'error': 'This address does not exist.'}), 404

    return jsonify({
        'name': res['name'],
        'address': res['id']
    }), 200


"""
A route for creating a new patient record on the platform
"""
@app.route('/record/new', methods=['POST'])
def record():
    id = request.json['id']
    data = request.json['data']
    record = current_app.config['archive'].fetch_record(id)

    #setting the block with data
    block = record.new_block(record.hash(record.last_block), data=data)

    return jsonify(block), 200


"""
Retrieves the record of a specific patient given their id
"""
@app.route('/record/chain/<id>', methods=['GET'])
def book_chain(id):
    if not id:
        return jsonify({}), 400
    print("ID being passed: ", id)
    print("ID returned", current_app.config['archive'].print_records())
    return jsonify(current_app.config['archive'].fetch_record(id).chain), 200


#
# P2P Endpoints
#

"""
Add a node as a neighbor and send
"""
@app.route('/node/register', methods=['POST'])
def registerNode():
    ip = request.json['ip']  # List of IP addresses, ex. 127.0.0.1:5000
    for i in ip:
        # Register the node and sends identity to neighbors
        if i not in current_app.config['node'].get_neighbors():
            current_app.config['node'].register_node(i)
            try:
                requests.post('http://'+ i + '/node/register', json={'ip': [getFullHostName()]})
            except Exception as e:
                print('ERROR: Could not send identity to node:', i, " E: ", e)
    # Return list of this node's neighbors
    return jsonify({'neighbors': list(current_app.config['node'].get_neighbors())}), 200





    # TODO: send over the blockchain

"""
Route to send a new block to the other neighbors
"""
@app.route('/block/receive', methods=['POST'])
def receiveBlock():
    id       = request.json['id']
    block    = request.json['block']
    chain    = current_app.config['archive'].fetch_record(id)
    new_hash = chain.hash(chain.last_block)
    new_block = chain.new_block(new_hash, block)
    return jsonify(new_block), 200


"""
Route for a node to receive new blocks
"""
@app.route('/block/send', methods=['POST'])
def sendBlock():
    neighbors = list(current_app.config['node'].get_neighbors())
    _json = {
        'id': request.json['id'],
        'block': request.json['block']
    }
    success = []
    for i in neighbors:
        try:
            res = requests.post('http://' + i + '/block/receive', json=_json)
            res.raise_for_status()
        except Exception as e:
            print(e)
            return jsonify({"error": "Failed to send a block to node: " + i}), 500
        success.append(res.json())
    return jsonify(success), 200



if __name__ == '__main__':
    from argparse import ArgumentParser

    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=4242,
                        type=int, help='port to listen on')
    args = parser.parse_args()
    PORT = args.port
    with app.app_context():
        current_app.config['archive'] = Archive()
        #node = Node()
        #archive  = Archive()
        current_app.config['node'] = Node()
    app.run(host=HOST_NAME, port=PORT, debug=True)
