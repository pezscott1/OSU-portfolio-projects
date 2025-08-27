import zmq
import json


def client(data: dict):

    # set up zmq
    context = zmq.Context()

    #  Socket to talk to server
    socket = context.socket(zmq.REQ)
    socket.connect("tcp://localhost:5557")

    processed_data = json.dumps(data)
    socket.send_string(processed_data)
    #  Get the reply.
    message = socket.recv()

    return message

