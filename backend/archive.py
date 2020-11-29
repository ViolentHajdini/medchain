from blockchain import Chain
import hashlib

class Archive:
    def __init__(self):
        self._archive = []

    def add_record(self, new_record):
        for record in self._archive:
            if record.id == new_record.id:
                return False

        self._archive.append(new_record)
        return True

    def print_records(self):
        for record in self._archive:
            print(record.id)

    def create_exchange(self, data):
        if data['sender'] == data['recipient']:
            return False

        for book in self._archive:
            if book.id == data['patient']:
                data = {
                    'doctor': data['doctor'],
                    'pubkey': data['pubkey'],
                    'docsig': data['docsig']
                }

                previous_hash = book.hash(book.last_block)
                book.new_block(previous_hash, data=data)
                return True
        
        return False

    def fetch_record(self, req):
        for record in self._archive:
            if record.id == req:
                return record
