import zmq
import json


def client(data: dict):

    # set up zmq
    context = zmq.Context()

    #  Socket to talk to server
    socket = context.socket(zmq.REQ)
    socket.connect("tcp://localhost:5556")

    # request is in the form a dictionary.
    # you'll need to make different requests to search or to buy.g
    # this is if you want to search
    #data = {'instruct': 'search', 'opera': 'abcd', 'date': '04/01/2025', 'time': '12:30', 'section': "Orchestra", 'tickets':8}
    # this is if you want to buy the tickets.
    #data = {'instruct': 'buy', 'opera': 'abcd', 'date': '03/01/2025', 'time': '12:30', 'seats': [("Orchestra", 1, 1), ("Orchestra", 1, 2), ("Orchestra", 1, 4)]}
    processed_data = json.dumps(data)
    socket.send_string(processed_data)
    #  Get the reply.
    message = socket.recv()

    return message
