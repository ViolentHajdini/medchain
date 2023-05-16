from flask import Flask, jsonify, request
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
archive  = Archive()
node     = Node()
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
    print(archive._archive[0].id)
    rec = archive.fetch_record(id)
    return jsonify(rec.last_block), 200


"""
A route for creating a signature
"""
@app.route('/signature/create', methods=['GET'])
def createAccount():
    node = Node()
    (a, k) = node.generate_transaction_addr()
    return jsonify({'address': a, 'pubkey': k.decode('utf-8'), 'seed': node._wallet_seed}), 200


"""
Create an archive
"""
@app.route('/archive/create/patient', methods=['POST'])
def createArchive():
    _data = request.json.get('data')
    node = Node()
    #a = address, k = pubkey
    (a, k) = node.generate_transaction_addr()

    token = Chain(id=a, data=_data)
    archive.add_record(token)
    obj = {
        'id' : token.id,
        'name': token.chain[0]['name'],
        # 'dob' : token.chain[0]['dob'],
        # 'bloodType' : token.chain[0]['bloodType'],
        # 'allergies' : token.chain[0]['allergies'],
    }
    #db.patient.insert_one(obj)

    return jsonify(obj), 200



"""
Create a profile for doctor
"""
@app.route('/archive/create/doctor', methods=['POST'])
def createDoctorProfile():
    _data = request.json.get('data')
    node = Node()
    #a = address, k = pubkey
    (a, k) = node.generate_transaction_addr()

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
    record = archive.fetch_record(id)

    #setting the block with data
    block = record.new_block(record.hash(record.last_block), data=data)

    return jsonify(block), 200



"""
Retrieves the record of a specific patient given their id
"""
@app.route('/record/chain/<id>', methods=['GET'])
def book_chain(id):
    print("ID being passed: ", id)
    print("ID returned", archive.print_records())
    return jsonify(archive.fetch_record(id).chain), 200


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
        if i not in node.get_neighbors():
            node.register_node(i)
            try:
                requests.post('http://' + i + '/node/register', json={'ip': [getFullHostName()]})
            except:
                print('ERROR: Could not send identity to node:', i)

    # Return list of this node's neighbors
    return jsonify({'neighbors': list(node.get_neighbors())}), 200

    # TODO: send over the blockchain


"""
Route for a node to receive new blocks
"""
@app.route('/block/receive', methods=['POST'])
def receiveBlock():
    id       = request.json['id']
    chain    = archive.fetch_record(id)
    try:
        chain.resolve_conflicts(id, node.neighbors)
    except:
        endpoint = 'http://' + node.get_neighbors()[0] + '/get/chain/' + id
        res = requests.get(endpoint)
        archive.add_record(Chain(id=id, exported=res.json()['chain']))

    return jsonify("SUCCESS"), 200


"""
Route to send a new block to the other neighbors

Expects a request of
{
    'id': chain id,
    'block': block data
}
"""
@app.route('/block/send', methods=['POST'])
def sendBlock():
    success = []
    neighbors = node.get_neighbors()
    for i in neighbors:
        try:
            print(i + '/block/send')
            res = requests.post('http://' + i + '/block/receive', json=request.json)
            success.append(res.json())
        except:
           success.append({"error": "Failed to send a block to node: " + i})

    return jsonify(success), 200


"""
Route for sending blockchain to node connecting to the network
"""
@app.route('/get/chain/<token>', methods=['GET'])
def getChain(token):
    r = archive.fetch_record(token)
    try:
        chain = r.chain
    except:
        chain = []
    (a, k) = node.generate_transaction_addr()
    return jsonify({
        "chain": chain,
        "signature": node.generate_signature('123456'),
        "public_key": k.decode('utf-8'),
    }), 200


if __name__ == '__main__':
    from argparse import ArgumentParser

    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=4242,
                        type=int, help='port to listen on')
    args = parser.parse_args()
    PORT = args.port

    app.run(host=HOST_NAME, port=PORT, debug=True)
