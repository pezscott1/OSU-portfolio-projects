
import zmq
import cart
import json

context = zmq.Context()
socket = context.socket(zmq.REP)
socket.bind("tcp://*:5558")

while True:
    message = socket.recv_string()
    print(f"Received request: {message}")
    message = json.loads(message)
    if not message.get("discount") == True:
        print("not true")
        print(f"Discount: {message.get('discount')}")
        returnMessage = cart.regular_cart(message)
    else:
        print("true")
        print(f"Discount: {message.get('discount')}")
        returnMessage = cart.discount_cart(message)
    socket.send_string(returnMessage)
