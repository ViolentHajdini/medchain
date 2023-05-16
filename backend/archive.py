"""
Archive is the container class for the medical records,
as each blockchain represents a patient's medical records.
It conducts exchanges on behalf of the clients calling it as well,
given that they provide the necessary keys to authenticate it
"""
from blockchain import Chain
import hashlib

class Archive:
    def __init__(self):
        self._archive = []

    def add_record(self, new_record):
        """
        Adds a new block to the library

            new_block: Chain -> Chain object (representing a patient)
            return: bool -> True for success, False otherwise 
        """

        for record in self._archive:
            if record.id == new_record.id:
                return False

        self._archive.append(new_record)
        return True

    def print_records(self):
        """
        Prints all the patients in the database
        """
        for record in self._archive:
            print(record.id)

    def create_exchange(self, data):
        """
        Create a record that is verified by both doctor and patient

        data = {
            patient: the address of the patient
            doctor: the address of the doctor
            pubkey: the doctor's public key
            docsig: the doctor's digial signature
        }
        """

        for block in self._archive:
            if block.id == data['patient']:
                data = {
                    'doctor': data['doctor'],
                    'pubkey': data['pubkey'],
                    'docsig': data['docsig']
                }

                previous_hash = block.hash(block.last_block)
                block.new_block(previous_hash, data=data)
                return True
        
        return False

    def fetch_record(self, req):
        """
        Looks for a specific patient's record

            req: str -> the id of the chain (patient)
        """
        for record in self._archive:
            if record.id == req:
                return record