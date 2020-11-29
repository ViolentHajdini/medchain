from flask import Flask, jsonify, request
from archive import Archive
from blockchain import Chain, Node
import requests
import pymongo

# Instantiate the Node
app     = Flask(__name__)
archive = Archive()
node    = Node()

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
        return jsonify({'error': 'Could not find what you were looking for.'}), 404

    return jsonify({
        'name': res['name'],
        'address': res['address']
    }), 200


@app.route('/record/new', methods=['POST'])
def record():
    values = request.get_json()
    patient = values['patient']
    record = Chain(id=patient, data={
        'note': "Genesis Block -- New Record created.",
    })

    if archive.add_record(record):
        return jsonify(record.last_block), 200
    else:
        return {'error': 'This book must already exist.'}, 400


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
