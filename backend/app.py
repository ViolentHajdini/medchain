from flask import Flask, jsonify, request
from archive import Archive
from blockchain import Chain, Node
from client import Client
import requests, pymongo, json

# Instantiate the Node
app      = Flask(__name__)
archive  = Archive()
node     = Node()
protocol = Client()

DB_KEY = "mongodb+srv://dave:dave@cluster0.sj9u0.mongodb.net/user?retryWrites=true&w=majority"
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
