import hashlib
import json
from os import urandom
from urllib.parse import urlparse
from datetime import datetime
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.kdf.hkdf import HKDF
from cryptography.hazmat.primitives.asymmetric import ec

class Chain:
    def __init__(self, id=None, data=None, exported=None):
        self._chain = []

        # Since multiple blockchains are used there
        # must be some kind of identifier for each one
        # to find and update it when necessary
        self.id = id

        # Genesis block, extra data is optional
        if exported:
            self._chain.append(exported)
        else:
            self.new_block(previous_hash=1, data=data)
    
    def new_block(self, previous_hash, data=None):
        # Basic header for any block
        block = {
            'index': len(self._chain) + 1,
            'previous_hash': previous_hash or self.hash(self.last_block),
            'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        }

        # Ugly syntax for merging two dictionaries
        if data:
            block = {**block, **data}
        
        self._chain.append(block)
        return block

 
    def print_chain(self):
        print('============================')
        for block in self._chain:
            print(json.dumps(block, indent=4))
            print('============================')


    @property
    def last_block(self):
        return self._chain[-1]


    @property
    def chain(self):
        return self._chain


    @staticmethod
    def hash(block):
        block_string = json.dumps(block, sort_keys=True).encode()
        return hashlib.sha256(block_string).hexdigest()


    def valid_chain(self, chain):
        """
        Determine if a given blockchain is valid
        :param chain: A blockchain
        :return: True if valid, False if not
        """

        last_block = chain[0]
        current_index = 1

        while current_index < len(chain):
            block = chain[current_index]

            # Check that the hash of the block is correct
            last_block_hash = self.hash(last_block)
            if block['previous_hash'] != last_block_hash:
                return False

            last_block = block
            current_index += 1

        return True

    @staticmethod
    def chain_hash(chain):
        chain_hash = hashes.Hash(hashes.SHA256())

        for block in chain:
            block_string = json.dumps(block, sort_keys=True).encode()
            chain_hash.update(block_string)

        return chain_hash.finalize().hex()

    def resolve_conflicts(self, compare_chain, node_object, signature, pubkey):
        """
        This is our consensus algorithm, it resolves conflicts
        by replacing our chain with the longest one in the network.
        :return: True if our chain was replaced, False if not
        """
        neighbors = node_object.get_neighbors()
        new_chain = None

        # We're only looking for chains longer than ours
        max_length = len(self._chain)

        # Grab and verify the chains from all the nodes in our network
        length = len(compare_chain)
        signature = bytes.fromhex(signature)
        public_key = serialization.load_der_public_key(bytes.fromhex(pubkey))

        try:
            hash_check = bytes.fromhex(self.chain_hash(chain))
            public_key.verify(signature, hash_check, ec.ECDSA(hashes.SHA256()))
        except:
            return False

        # Check if the length is longer and the chain is valid
        if length > max_length and self.valid_chain(chain):
            max_length = length
            new_chain = compare_chain

        # Replace our chain if we discovered a new, valid chain longer than ours
        if new_chain:
            self._chain = new_chain
            return True

        return False


class Node:
    def __init__(self):
        self.neighbors = set()

        # Keep this safe!
        self._wallet_seed = int.from_bytes(urandom(16), byteorder='big')
        self._private_key = ec.derive_private_key(self._wallet_seed, ec.SECP384R1())

    def register_node(self, address):
        parsed_url = urlparse(address)
        if parsed_url.netloc:
            self.neighbors.add(parsed_url.netloc)
        elif parsed_url.path:
            # Accepts an URL without scheme like '192.168.0.5:5000'.
            self.neighbors.add(parsed_url.path)
        else:
            raise ValueError('Invalid URL')

    def get_neighbors(self):
        return self.neighbors

    def generate_signature(self, data):
        hash = bytes.fromhex(data)

        signature = self._private_key.sign(
            hash,
            ec.ECDSA(hashes.SHA256())
        )

        return signature.hex()

    def generate_transaction_addr(self):
        public_key = self._private_key.public_key()
        serialized_public_key = public_key.public_bytes(
            encoding=serialization.Encoding.DER,
            format=serialization.PublicFormat.SubjectPublicKeyInfo
        )

        # Transaction addresses are made of hashing the public key once
        address = hashes.Hash(hashes.SHA256())
        address.update(serialized_public_key)

        # Return tuple of tx address and public key to verify
        return (address.finalize().hex(), serialized_public_key.hex())

    def verify_addr(self, addr, pubkey):
        # Regenerate the given addresses
        address = hashes.Hash(hashes.SHA256())
        sender_public_bytes = bytes.fromhex(pubkey)
        address.update(sender_public_bytes)

        # The two public keys both generate the corresponding addresses
        if (address.finalize().hex() == addr):
            return True
        else:
            return False

    def verify_block(self, block):
        txsig = bytes.fromhex(block.get('txsig'))
        pubkey = serialization.load_der_public_key(bytes.fromhex(block.get('pubkey')))
        try:
            pubkey.verify(txsig, b'I have authorized this transaction.', ec.ECDSA(hashes.SHA256()))
            return True
        except:
            return False
