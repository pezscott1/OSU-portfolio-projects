import json
import zmq


def client(message):
    context = zmq.Context()
    print("Connecting to microservice D server…")
    socket = context.socket(zmq.REQ)
    socket.connect("tcp://localhost:5558")

    json_message = json.dumps(message)
    socket.send_string(json_message)

    messages = socket.recv()
    print(messages.decode("utf-8"))
