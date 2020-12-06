from flask import Flask, jsonify, request
from archive import Archive
from blockchain import Chain, Node
from client import Client
import requests, pymongo, json
#from jsonsocketclient import sendJ


# Instantiate the Node
app      = Flask(__name__)
archive  = Archive()
node     = Node()
protocol = Client()

# @TODO REMOVE THIS SHIT LATER
chain = Chain(id='cadd75339625c5401af9b5cce0b0d402f56c44891001a885ca93f8f24b48079f')
chain2 = Chain(id='635f25285d53b1f77690c9382af70d27934057dcb3ad578bc16d406805c028c')
archive.add_record(chain)
archive.add_record(chain2)

DB_KEY = "mongodb+srv://dave:dave@cluster0.sj9u0.mongodb.net/user?retryWrites=true&w=majority"
client = pymongo.MongoClient(DB_KEY)
db = client.user

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


@app.route('/record/new', methods=['POST'])
def record():
    values = request.get_json()
    id = values['id']
    data = values['data']
    record = archive.fetch_record(id)

    block = record.new_block(record.hash(record.last_block), data=data)
    protocol.set_data = json.dumps(block, sort_keys=True)
    protocol.listen()
    
    return jsonify(block), 200



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
