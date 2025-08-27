
from search_opera import *
import json

import time
import zmq

context = zmq.Context()
socket = context.socket(zmq.REP)
socket.bind("tcp://*:5556")

while True:
    #  Wait for next request from client
    message = socket.recv()
    print("Received request: %s" % message + '\n')
    # turn the request back to a dictionary
    data = json.loads(message)
    # if the request is a search
    if data.get('instruct') == 'search':
        # make an object
        opera = Performance(data.get('opera'), data.get('date'), data.get('time'))
        # find discounts
        discounts = find_discounts(data.get('date'), data.get('tickets'))
        # check to see if the performance is in the data_base. add it if it's not.
        add_to_data_base(opera)
        # if the opera is sold out send that response
        if search(data.get('opera'), data.get('date'), data.get('time'), data.get('section')) == "sold-out":
            processed_response = 'Opera sold out.'
        else:
            # complete the search
            seats = search(data.get('opera'), data.get('date'), data.get('time'), data.get('section'))
            seat_list = []
            for seat in seats:
                if seat.get('section') == data.get('section'):
                    chair = ((seat.get('section'), seat.get('row'), seat.get('seat'), seat.get('price')))
                    seat_list.append(chair)
            # if no seats are found for that section send that response
            if len(seat_list) == 0:
                processed_response = "No tickets in this section."
            # if there are fewer seats then needed tickets, send that response.
            elif len(seat_list) < data.get('tickets'):
                processed_response = "Not enough tickets in this section."
            # if enough tickets make a list of the seats that are available. and the discounts that they are eligble for.
            else:
                return_data = {'seats': seat_list, 'discounts': discounts}
                processed_response = json.dumps(return_data)
    # if request is to buy the tickets.  It updates the seating chart for the seat from false to true for sold.
    elif data.get('instruct') == 'buy':
        processed_response = buy(data.get('opera'), data.get('date'), data.get('time'), data.get('seats'))
    elif data.get('instruct') == 'check_seating':
        return_data = check_seating(data.get('opera'), data.get('date'), data.get('time'))
        processed_response = json.dumps(return_data)
        print(processed_response)
    time.sleep(1)

    #  Send reply back to client
    print('Sending Response \n')
    socket.send_string(processed_response)
