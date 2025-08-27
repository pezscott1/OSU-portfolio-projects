
import zmq
import discounts


context = zmq.Context()
socket = context.socket(zmq.REP)
socket.bind("tcp://*:5555")

while True:
    message = socket.recv_string()
    if message == "Discount code required":
        print(f"Received request: {message}")
        returnMessage = discounts.get_discount()
        socket.send_string(returnMessage)
    else:
        print(f"Checking discount code: {message}")
        returnMessage = discounts.check_discount(message)
        if returnMessage:
            socket.send_string("Discount check successful")
        else:
            socket.send_string("Discount check failed")
