import json
import zmq


def client(message: str):

    context = zmq.Context()

    print("Connecting to microservice C server…")
    socket = context.socket(zmq.REQ)
    socket.connect("tcp://localhost:5555")

    print(f"Sending request for discounts…")

    socket.send_string(message)

    messages = socket.recv()
    if messages.decode() == "Discount check successful":
        print(messages.decode())
        return True
    elif messages.decode() == "Discount check failed":
        print(messages.decode())
        return False
    else:
        print(f"Your discount code is: {messages.decode()}")

