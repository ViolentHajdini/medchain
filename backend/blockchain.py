"""
The main Chain class, this represents an individual
blockchain that is flexible with the data it can take
and is built in with hashing functions that handle
the blockchain functionality. All the data that can be added
to the blocks themselves is arbitrary and has a flexible
amount of use cases.
"""

import hashlib
import json
from os import urandom
from urllib.parse import urlparse
from datetime import datetime
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.kdf.hkdf import HKDF
from cryptography.hazmat.primitives.asymmetric import ec
import requests

class Chain:
    def __init__(self, id=None, data=None, exported=None):
        """
        Chain constructor

            id: any -> gives the blockchain a unique id
            data: dict -> data you would like to put into the genesis block
            exported: dict -> if the chain already exists you can import the genesis block
        """

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
        """
        Create a new block in the chain

            previous_hash: hex -> a hashed value of the previous block in the chain
            data: dict -> extra data to be added into the block (can literally be anything)
        """

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
        """
        Prints the contents of the chain
        """
        print('============================')
        for block in self._chain:
            print(json.dumps(block, indent=4))
            print('============================')

    @property
    def last_block(self):
        """
        Retrieves the last block of the chain

            return: dict -> the last block dictionary
        """

        return self._chain[-1]

    @property
    def chain(self):
        """
        Retrieves the chain as an array

            return: dict[] -> array of dictionaries (blocks)
        """
        return self._chain

    @staticmethod
    def hash(block):
        """
        Helper method for returning a hash of a block

            return: hex -> a hashed value for a given block
        """
        block_string = json.dumps(block, sort_keys=True).encode()
        return hashlib.sha256(block_string).hexdigest()


    def resolve_conflicts(self, chain_id, neighbors):
        """
        Consensus algorithm
        """
        new_chain = None
        # We're only looking for chains longer than ours
        max_length = len(self.chain)
        # Grab and verify the chains from all the nodes in our network
        for node in neighbors:
            response = requests.get(f'http://{node}/get/chain/{chain_id}')

            if response.status_code == 200:
                chain = response.json()['chain']
                signature = bytes.fromhex(response.json()['signature'])
                public_key = serialization.load_der_public_key(bytes.fromhex(response.json()['public_key']))

                try:
                    hash_check = bytes.fromhex(self.chain_hash(chain))
                    public_key.verify(signature, hash_check, ec.ECDSA(hashes.SHA256()))
                except:
                    return False

                # Check if the length is longer and the chain is valid
                # if valid it replaces and checks for length
                if len(chain) > max_length and self.valid_chain(chain):
                    max_length = len(chain)
                    new_chain = chain
        if new_chain:
            self.chain = new_chain
            return True
        return False


    """
    Simple Proof of Work Algorithm:
        - Find a number p' such that hash(pp') contains leading 4 zeroes
        - Where p is the previous proof, and p' is the new proof

    :param last_block: <dict> last Block
    :return: <int>
    """

    def proof_of_work(self, last_block):
        last_proof = last_block['proof']
        last_hash = self.hash(last_block)

        proof = 0
        while self.valid_proof(last_proof, proof, last_hash) is False:
            proof += 1

        return proof


    def valid_chain(self, chain):
        """
        Determines if a chain is valid

            chain: Chain -> the given chain
            return: bool -> validity of the chain
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
        """
        Create a hash of the entire blockchain

        chain: [] -> the raw chain as an array of dicts
        return: hex -> the hashed value of the entire blockchain
        """
        chain_hash = hashes.Hash(hashes.SHA256())

        for block in chain:
            block_string = json.dumps(block, sort_keys=True).encode()
            chain_hash.update(block_string)

        return chain_hash.finalize().hex()

"""
The Node class that represents the identity of the server
running this code. It is equipped with a keypair for signing
transactions and functions for creating and verifying blocks.
"""

class Node:
    def __init__(self):
        self.neighbors = set()

        # Keep this safe!
        self._wallet_seed = int.from_bytes(urandom(16), byteorder='big')
        self._private_key = ec.derive_private_key(self._wallet_seed, ec.SECP384R1())


    def register_node(self, address):
        """
        Register another node on the network to be aware of

            address: string -> address of the node on the network
        """
        parsed_url = urlparse(address)
        if parsed_url.netloc:
            self.neighbors.add(parsed_url.netloc)
        elif parsed_url.path:
            # Accepts an URL without scheme like '192.168.0.5:5000'.
            self.neighbors.add(parsed_url.path)
        else:
            raise ValueError('Invalid URL')


    def get_neighbors(self):
        """
        Return the array of neighbors in the network

        return: [] -> array of IP addresses
        """
        return list(self.neighbors)

    def generate_signature(self, data):
        """
        Sign a cryptographic message on given data

            data: string -> the data to be signed
            return: hex -> the signature
        """
        hash = bytes.fromhex(data)

        signature = self._private_key.sign(
            hash,
            ec.ECDSA(hashes.SHA256())
        )
        return signature.hex()

    """
    Generate this node's transaction address and corresponding public key

        return: Tuple -> (address: hex, pubkey: hex)
    """
    def generate_transaction_addr(self):
        public_key = self._private_key.public_key()
        serialized_public_key = public_key.public_bytes(
            encoding=serialization.Encoding.DER,
            format=serialization.PublicFormat.SubjectPublicKeyInfo
        )
        # Transaction addresses are made of hashing the public key once
        encoded_key = serialized_public_key.hex().encode('utf-8')
        address = hashlib.sha256(encoded_key).hexdigest()

        # Return tuple of tx address and public key to verify
        return (address, encoded_key)


    def verify_addr(self, addr, pubkey):
        """
        Verify that a given address actually belongs to the user

            addr: hex -> the given address
            pubkey: hex -> the pubkey corresponding to the addr
            return: bool -> whether or not the key was verified
        """
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
        """
        Verify that a block is valid and eligble to be put into the chain

            block: dict -> the block to be judged
            return: bool -> if the block was verified
        """
        txsig = bytes.fromhex(block.get('txsig'))
        pubkey = serialization.load_der_public_key(bytes.fromhex(block.get('pubkey')))
        try:
            pubkey.verify(txsig, b'I have authorized this transaction.', ec.ECDSA(hashes.SHA256()))
            return True
        except:
            return False

    def get_public_key(self):
        return self._private_key.public_key()
