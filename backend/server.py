import socket
import threading
import json
from app import archive 
#The Globals needed to run server
#Bport refers to the Broadcasting port
#this needed a seperate port as to not conflict with the message sending on the main port
HEADER = 1024
PORT = 12345
BPORT = 50505
SERVER = socket.gethostbyname(socket.getfqdn(socket.gethostname()))
BROADCAST = socket.gethostbyname(socket.getfqdn(socket.gethostname()))
ADDR = (SERVER, PORT)
BADDR = (BROADCAST, BPORT)
FORMAT = 'utf-8'
DISCONNECT_MESSAGE = "DISCONNECTED"
ACKNOWLEDGE_MESSAGE = "ACKNOWLEDGED"
CLIENT_LIST = []
THREAD_OFFSET = 0

#initializing the broadcasting and the main socket
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind(ADDR)
broadcast_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
broadcast_socket.bind(BADDR)


#broadcasting function that sends the message passed by a client to all other clients
#it also echos the message to the original client
def broadcast(msg):
    for client in CLIENT_LIST:
        message = msg.encode(FORMAT)
        msg_length = len(message)
        send_length = str(msg_length).encode(FORMAT)
        send_length += b' ' * (HEADER - len(send_length))
        client[1].send(send_length)
        client[1].send(message)


#list check is used to find the client connection that must be removed when a client disconnects
def list_check(current_client):
    for client in CLIENT_LIST:
        if client[2] == current_client:
            global THREAD_OFFSET
            THREAD_OFFSET = THREAD_OFFSET + 1
            CLIENT_LIST.remove(client)



#checks the client to see if they are available and valid for connection
def available(conn):
    check_length  = conn.recv(HEADER).decode(FORMAT)
    if check_length:
        check_length = int(check_length)
        client_header = conn.recv(check_length).decode(FORMAT)
        if client_header == DISCONNECT_MESSAGE:
            return False

        check_header = json.loads(client_header)
        if check_length > HEADER:
            check_header['sizeflag'] = False
        else:
            check_header['sizeflag'] = True

        print("syncing with client...")

        if check_header['syncflag'] == True:
            print("synced with client")
            print("sending acknowledgement to client...")
            check_header['ackflag'] = True
            check_header['acknum'] += 1
            check_header = json.dumps(check_header)
            header_length = len(check_header)
            check_header = check_header.encode(FORMAT)
            send_length = str(header_length).encode(FORMAT)
            send_length += b' ' * (HEADER - len(send_length))
            conn.send(send_length)
            conn.send(check_header)

            ack_length = conn.recv(HEADER).decode(FORMAT)
            if ack_length:
                ack_length = int(ack_length)
                ack_message = conn.recv(ack_length).decode(FORMAT)
                if ACKNOWLEDGE_MESSAGE == ack_message:
                    print(ACKNOWLEDGE_MESSAGE)
                    return True
        else:
            print("ERROR: sync flag was not successfully provided")
            return False

#handles the connection between the clients individually
def handle_client(Bconn, Baddr, conn, addr, new_client):
    print(f"[NEW CONNECTION] {addr} connected.")

    connected = True
    while connected:
        if new_client == True or available(conn) == True:
            msg_length = conn.recv(HEADER).decode(FORMAT)
            if msg_length:
                msg_length = int(msg_length)
                msg = conn.recv(msg_length).decode(FORMAT)
            broadcast_msg = json.dumps(msg)
            broadcast(broadcast_msg)
            print(f"[{addr}] {msg}")
            print(CLIENT_LIST)
            new_client = False

        else:
                list_check(Baddr)
                print(f"[{addr}]{(DISCONNECT_MESSAGE)}")
                Bconn.close()
                print(Bconn)
                conn.close()
                print(conn)
                print(CLIENT_LIST)
                return

#starts the server and threads
def start():
    server.listen(),
    broadcast_socket.listen(),
    print(f"[LISTENING] server is listening on {SERVER}")
    while True:
        conn, addr = server.accept()
        Bconn, Baddr = broadcast_socket.accept()
        if available(conn) == True:
            new_client = True
            thread = threading.Thread(target = handle_client, args = (Bconn, Baddr,conn, addr, new_client))
            thread.start()
            clientID = (f"Client {threading.activeCount() - 1 + THREAD_OFFSET}", Bconn, Baddr)
            CLIENT_LIST.append(clientID)
            print(f"[ACTIVE CONNECTIONS] {threading.activeCount() - 1}")
        else:
            print ("Immediate Disconnect by client")
            conn.close()
            Bconn.close()



print("[STARTING] server is starting...")
start()