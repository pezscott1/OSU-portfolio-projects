import json

import zmq

import login
import register
import password_change
import delete_user

context = zmq.Context()
socket = context.socket(zmq.REP)
socket.bind("tcp://*:5557")

while True:
    message = socket.recv_string()
    print(f"Received request: {message}")
    message = json.loads(message)
    # unpack email and password
    email = message.get("email")
    password = message.get("password")
    security = message.get("security")
    # call create_user if register
    if message.get("type") == "register":
        message = register.create_user(email, password, security)
        socket.send_string(message)
    elif message.get("type") == "delete user":
        message = delete_user.delete_user(email, password)
        socket.send_string(message)
    elif message.get("type") == "admin login":
        message = login.login_admin(email, password)
        socket.send_string(message)
    # call login_user if login
    elif message.get("type") == "login":
        message = login.login_user(email, password)
        socket.send_string(message)
    # call update_password if password change
    elif message.get("type") == "password change":
        new_password = message.get("new_password")
        message = password_change.update_password(email, password, new_password)
        socket.send_string(message)
    elif message.get("type") == "security check":
        message = password_change.check_security(email, security)
        socket.send_string(message)
    else:
        socket.send_string("Type not recognized")

context.destroy()
