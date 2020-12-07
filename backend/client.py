import socket
import sys
import threading
import json

#B refers to elements for the broadcasting socket which is used to receive
#messages that are echoed from other clients
class Client:
    client_header = 0
    PORT = 0
    BPORT = 0
    SERVER = 0
    BROADCAST = 0
    ADDR = 0
    BADDR = 0
    HEADER = 0
    FORMAT = 0
    DISCONNECT_MESSAGE = 0
    ACKNOWLEDGE_MESSAGE = 0
    CONNECTED = 0
    block_chain = 0
    client_socket = 0
    broadcast_socket = 0


    def __init__(self):
        self.client_header = ''' 
        {
            "ackflag": false,
            "syncflag": false,
            "sizeflag": false,
            "acknum": 0,
            "seqnum": 0,
            "packetsize": 0,
            "clientID": ""
        }    
        '''
        self.PORT = 12345
        self.BPORT = 50505
        self.SERVER = socket.gethostbyname(socket.getfqdn(socket.gethostname()))
        self.BROADCAST = socket.gethostbyname(socket.getfqdn(socket.gethostname()))
        self.ADDR = (self.SERVER, self.PORT)
        self.BADDR = (self.BROADCAST, self.BPORT)
        self.HEADER = 1024
        self.FORMAT = 'utf-8'
        self.DISCONNECT_MESSAGE = "DISCONNECTED"
        self.ACKNOWLEDGE_MESSAGE = "ACKNOWLEDGED"
        self.CONNECTED = True
        self.client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.broadcast_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    def set_data(self,data):
        self.block_chain = data

#Sends messages from the client to the server. It also begins the check to see if the server is available
    def send(self, msg):
        # if check_server(msg,client):
        if self.CONNECTED == True:


            if self.check_server(msg):
                if msg != self.DISCONNECT_MESSAGE:
                    user_input = msg.encode(self.FORMAT)
                    input_length = len(user_input)
                    send_length = str(input_length).encode(self.FORMAT)
                    send_length += b' ' * (self.HEADER - len(send_length))
                    self.client_socket.send(send_length)
                    self.client_socket.send(user_input)
                else:
                    print(True)
                    message = msg.encode(self.FORMAT)
                    msg_length = len(message)
                    send_length = str(msg_length).encode(self.FORMAT)
                    send_length += b' ' * (self.HEADER - len(send_length))
                    self.client_socket.send(send_length)
                    self.client_socket.send(message)
                    return

        else:
            print("ERROR: unable to connect to the server")


#handles the connection between the server and the client
#this is meant to change depending on implementation
    def handle_connection(self):
        user_input = "n"
        while user_input == "n" and self.block_chain != self.DISCONNECT_MESSAGE:
            self.send(self.block_chain)
            user_input = input()
            if user_input == "q":
                self.send(self.DISCONNECT_MESSAGE)
        self.send(self.DISCONNECT_MESSAGE)
        threading.main_thread().join()

#listens for a broadcasted message while continuously being able to send messages to the server
    def activate(self):
        self.client_socket.connect(self.ADDR)
        self.broadcast_socket.connect(self.BADDR)
        flag_check = json.loads(self.block_chain)


        if flag_check[0]["send"]:
            thread = threading.Thread(target=self.handle_connection, args=())
            thread.start()
            while True:
                data_length = self.broadcast_socket.recv(self.HEADER).decode(self.FORMAT)
                if data_length:
                    data_length = int(data_length)
                    server_data = self.broadcast_socket.recv(data_length).decode(self.FORMAT)
                    print (f"Broadcasted data: {server_data}")
                    self.set_data(server_data)

        elif flag_check[0]["Disconnect"]: 
            self.set_data(self.DISCONNECT_MESSAGE)
            self.handle_connection()

        else: 
            while True:
                data_length = self.broadcast_socket.recv(self.HEADER).decode(self.FORMAT)
                if data_length:
                    data_length = int(data_length)
                    server_data = self.broadcast_socket.recv(data_length).decode(self.FORMAT)
                    print (f"Broadcasted data: {server_data}")
                    self.set_data(server_data)



#checks the server for availability
    def check_server(self,msg):
        if msg == self.DISCONNECT_MESSAGE:
            return True
        print("syncing with server...")
        send_header = json.loads(self.client_header)
        send_header['syncflag'] = True
        send_header['seqnum'] += 1
        send_header = json.dumps(send_header)
        self.client_header = send_header
        #change the sync flag ot true in order to show the server that the client
        #wants to connect

        header = self.client_header.encode(self.FORMAT)
        header_length = len(header)
        send_length = str(header_length).encode(self.FORMAT)
        send_length += b' ' * (self.HEADER - len(send_length))
        self.client_socket.send(send_length)
        self.client_socket.send(header)

        check_length = self.client_socket.recv(self.HEADER).decode(self.FORMAT)
        if check_length:
            check_length = int(check_length)
            sync_ack = self.client_socket.recv(check_length).decode(self.FORMAT)
            sync_ack = json.loads(sync_ack)
            if sync_ack['syncflag'] == True and sync_ack['ackflag'] == True:
                print("sync-ack received")
                print("Connection Established")
                sync_ack = json.dumps(sync_ack)
                self.client_header = sync_ack
                sync_ack = json.loads(sync_ack)
                sync_ack = self.ACKNOWLEDGE_MESSAGE
                ack_send = sync_ack.encode(self.FORMAT)
                ack_length = len(ack_send)
                send_length = str(ack_length).encode(self.FORMAT)
                send_length += b' ' * (self.HEADER - len(send_length))
                self.client_socket.send(send_length)
                self.client_socket.send(ack_send)
                return True

            else:

                return False





