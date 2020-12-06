import socket
import json

HOST = '127.0.0.1'  # The server's hostname or IP address
PORT = 5050         # The port used by the server

class sendJ: 

    

    def json_message(self ,direction):
        local_ip = socket.gethostbyname(socket.gethostname())
        data = {
            self.direction
        }

        json_data = json.dumps(data, sort_keys=False, indent=2)
        print("data %s" % json_data)

        send_message(json_data + ";")

        return json_data


    def send_message(data):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.connect((HOST, PORT))
            s.sendall(data.encode())
            data = s.recv(1024)

        print('Received', repr(data))