from flask import Flask, jsonify, request
from archive import Archive
from blockchain import Chain, Node
from client import Client
import requests, pymongo, json

# Instantiate the Node
app      = Flask(__name__)
archive  = Archive()
node     = Node()
# protocol = Client()

#Name Age, BloodType, Alergies
chain = Chain(id='3076301006072a8648ce3d020106052b8104002203620004c9f62827303857bfabdd6510dc43cb96d3c26d4533ea7a372d2e452f6e609d8074c7de1ae24298235ed7f26e753390c50bc854c18a7cab33598693bc3d9714087658c7859fcf5ee2d2c3796988399ebf653f2dd7aa913f0fb675eda6cff74a13', data={"name" : "Ben" , "dob" : "40","bloodType": "A+", "allergies" : "none", "doctorkey" : ""})
chain2 = Chain(id='3076301006072a8648ce3d020106052b8104002203620004f7454c81ef41950e6d56cb14a983b61720ec4d8943feee89d7e3a1e2384ab819ed5ffa180226e3c41a84a69810179a80c3738415e4ff8ff6be51c63f75f0ddb71c53c4fb4718409c067814a7d054e1faed5e30a8b6a87d5d5e9c088ea662fac8', data={"name" : "Ana" , "dob" : "21","bloodType": "B+", "allergies" : "none", "doctorkey" : ""})	
archive.add_record(chain)
archive.add_record(chain2)

DB_KEY = "mongodb+srv://medchain:<password>@cluster0.tji1t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
client = pymongo.MongoClient(DB_KEY)
db = client.user


"""
A route for verifying that an address/pubkey is authorized to use the platform
"""
@app.route('/search/<opt>/<key>', methods=['GET'])
def deal_with_input(opt, key):
    if opt == 'patient':
        patients = db.patient
        res = patients.find_one({'address': key})
    else:
        doctors = db.doc
        res = doctors.find_one({'address': key})

    if not res:
        return jsonify({'error': 'This address does not exist.'}), 404

    return jsonify({
        'name': res['name'],
        'address': res['address']
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
    return jsonify(archive.fetch_record(id).chain), 200


if __name__ == '__main__':
    from argparse import ArgumentParser

    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=4242,
                        type=int, help='port to listen on')
    args = parser.parse_args()
    port = args.port

    app.run(host='0.0.0.0', port=port, debug=True)
