
import json
from datetime import datetime, date


class Performance:
    '''Represents a performance at the Opera by its name, the data and time it will be performed.'''

    def __init__(self, opera, date, time):
        '''Initializes the name opera, date, time, a seating chart with all seats unsold.
            opera  is a string, date is a string, time is a string, seating_chart is a list of dictionaries'''
        self.opera = opera
        self.date = date
        self.time = time
        self.seating = [
            {'section': "Orchestra", 'row': 1, 'seat': 1, 'price': 150, 'base_price': 150, 'sold': False},
            {'section': "Orchestra", 'row': 1, 'seat': 2, 'price': 150, 'base_price': 150, 'sold': False},
            {'section': "Orchestra", 'row': 1, 'seat': 3, 'price': 150, 'base_price': 150, 'sold': False},
            {'section': "Orchestra", 'row': 1, 'seat': 4, 'price': 150, 'base_price': 150, 'sold': False},
            {'section': "Orchestra", 'row': 1, 'seat': 5, 'price': 150, 'base_price': 150, 'sold': False},
            {'section': "Orchestra", 'row': 1, 'seat': 6, 'price': 150, 'base_price': 150, 'sold': False},
            {'section': "Orchestra", 'row': 2, 'seat': 1, 'price': 150, 'base_price': 150, 'sold': False},
            {'section': "Orchestra", 'row': 2, 'seat': 2, 'price': 150, 'base_price': 150, 'sold': False},
            {'section': "Orchestra", 'row': 2, 'seat': 3, 'price': 150, 'base_price': 150, 'sold': False},
            {'section': "Orchestra", 'row': 2, 'seat': 4, 'price': 150, 'base_price': 150, 'sold': False},
            {'section': "Orchestra", 'row': 2, 'seat': 5, 'price': 150, 'base_price': 150, 'sold': False},
            {'section': "Orchestra", 'row': 2, 'seat': 6, 'price': 150, 'base_price': 150, 'sold': False},
            {'section': "Orchestra", 'row': 3, 'seat': 1, 'price': 150, 'base_price': 150, 'sold': False},
            {'section': "Orchestra", 'row': 3, 'seat': 2, 'price': 150, 'base_price': 150, 'sold': False},
            {'section': "Orchestra", 'row': 3, 'seat': 3, 'price': 150, 'base_price': 150, 'sold': False},
            {'section': "Orchestra", 'row': 3, 'seat': 4, 'price': 150, 'base_price': 150, 'sold': False},
            {'section': "Orchestra", 'row': 3, 'seat': 5, 'price': 150, 'base_price': 150, 'sold': False},
            {'section': "Orchestra", 'row': 3, 'seat': 6, 'price': 150, 'base_price': 150, 'sold': False},
            {'section': "Orchestra", 'row': 4, 'seat': 1, 'price': 150, 'base_price': 150, 'sold': False},
            {'section': "Orchestra", 'row': 4, 'seat': 2, 'price': 150, 'base_price': 150, 'sold': False},
            {'section': "Orchestra", 'row': 4, 'seat': 3, 'price': 150, 'base_price': 150, 'sold': False},
            {'section': "Orchestra", 'row': 4, 'seat': 4, 'price': 150, 'base_price': 150, 'sold': False},
            {'section': "Orchestra", 'row': 4, 'seat': 5, 'price': 150, 'base_price': 150, 'sold': False},
            {'section': "Orchestra", 'row': 4, 'seat': 6, 'price': 150, 'base_price': 150, 'sold': False},
            {'section': "Mezzanine", 'row': 1, 'seat': 1, 'price': 200, 'base_price': 200, 'sold': False},
            {'section': "Mezzanine", 'row': 1, 'seat': 2, 'price': 200, 'base_price': 200, 'sold': False},
            {'section': "Mezzanine", 'row': 1, 'seat': 3, 'price': 200, 'base_price': 200, 'sold': False},
            {'section': "Mezzanine", 'row': 1, 'seat': 4, 'price': 200, 'base_price': 200, 'sold': False},
            {'section': "Mezzanine", 'row': 1, 'seat': 5, 'price': 200, 'base_price': 200, 'sold': False},
            {'section': "Mezzanine", 'row': 1, 'seat': 6, 'price': 200, 'base_price': 200, 'sold': False},
            {'section': "Mezzanine", 'row': 2, 'seat': 1, 'price': 200, 'base_price': 200, 'sold': False},
            {'section': "Mezzanine", 'row': 2, 'seat': 2, 'price': 200, 'base_price': 200, 'sold': False},
            {'section': "Mezzanine", 'row': 2, 'seat': 3, 'price': 200, 'base_price': 200, 'sold': False},
            {'section': "Mezzanine", 'row': 2, 'seat': 4, 'price': 200, 'base_price': 200, 'sold': False},
            {'section': "Mezzanine", 'row': 2, 'seat': 5, 'price': 200, 'base_price': 200, 'sold': False},
            {'section': "Mezzanine", 'row': 2, 'seat': 6, 'price': 200, 'base_price': 200, 'sold': False},
            {'section': "Mezzanine", 'row': 3, 'seat': 1, 'price': 200, 'base_price': 200, 'sold': False},
            {'section': "Mezzanine", 'row': 3, 'seat': 2, 'price': 200, 'base_price': 200, 'sold': False},
            {'section': "Mezzanine", 'row': 3, 'seat': 3, 'price': 200, 'base_price': 200, 'sold': False},
            {'section': "Mezzanine", 'row': 3, 'seat': 4, 'price': 200, 'base_price': 200, 'sold': False},
            {'section': "Mezzanine", 'row': 3, 'seat': 5, 'price': 200, 'base_price': 200, 'sold': False},
            {'section': "Mezzanine", 'row': 3, 'seat': 6, 'price': 200, 'base_price': 200, 'sold': False},
            {'section': "Mezzanine", 'row': 4, 'seat': 1, 'price': 200, 'base_price': 200, 'sold': False},
            {'section': "Mezzanine", 'row': 4, 'seat': 2, 'price': 200, 'base_price': 200, 'sold': False},
            {'section': "Mezzanine", 'row': 4, 'seat': 3, 'price': 200, 'base_price': 200, 'sold': False},
            {'section': "Mezzanine", 'row': 4, 'seat': 4, 'price': 200, 'base_price': 200, 'sold': False},
            {'section': "Mezzanine", 'row': 4, 'seat': 5, 'price': 200, 'base_price': 200, 'sold': False},
            {'section': "Mezzanine", 'row': 4, 'seat': 6, 'price': 200, 'base_price': 200, 'sold': False},
            {'section': "Balcony", 'row': 1, 'seat': 1, 'price': 100, 'base_price': 100, 'sold': False},
            {'section': "Balcony", 'row': 1, 'seat': 2, 'price': 100, 'base_price': 100, 'sold': False},
            {'section': "Balcony", 'row': 1, 'seat': 3, 'price': 100, 'base_price': 100, 'sold': False},
            {'section': "Balcony", 'row': 1, 'seat': 4, 'price': 100, 'base_price': 100, 'sold': False},
            {'section': "Balcony", 'row': 1, 'seat': 5, 'price': 100, 'base_price': 100, 'sold': False},
            {'section': "Balcony", 'row': 1, 'seat': 6, 'price': 100, 'base_price': 100, 'sold': False},
            {'section': "Balcony", 'row': 2, 'seat': 1, 'price': 100, 'base_price': 100, 'sold': False},
            {'section': "Balcony", 'row': 2, 'seat': 2, 'price': 100, 'base_price': 100, 'sold': False},
            {'section': "Balcony", 'row': 2, 'seat': 3, 'price': 100, 'base_price': 100, 'sold': False},
            {'section': "Balcony", 'row': 2, 'seat': 4, 'price': 100, 'base_price': 100, 'sold': False},
            {'section': "Balcony", 'row': 2, 'seat': 5, 'price': 100, 'base_price': 100, 'sold': False},
            {'section': "Balcony", 'row': 2, 'seat': 6, 'price': 100, 'base_price': 100, 'sold': False},
            {'section': "Balcony", 'row': 3, 'seat': 1, 'price': 100, 'base_price': 100, 'sold': False},
            {'section': "Balcony", 'row': 3, 'seat': 2, 'price': 100, 'base_price': 100, 'sold': False},
            {'section': "Balcony", 'row': 3, 'seat': 3, 'price': 100, 'base_price': 100, 'sold': False},
            {'section': "Balcony", 'row': 3, 'seat': 4, 'price': 100, 'base_price': 100, 'sold': False},
            {'section': "Balcony", 'row': 3, 'seat': 5, 'price': 100, 'base_price': 100, 'sold': False},
            {'section': "Balcony", 'row': 3, 'seat': 6, 'price': 100, 'base_price': 100, 'sold': False},
            {'section': "Balcony", 'row': 4, 'seat': 1, 'price': 100, 'base_price': 100, 'sold': False},
            {'section': "Balcony", 'row': 4, 'seat': 2, 'price': 100, 'base_price': 100, 'sold': False},
            {'section': "Balcony", 'row': 4, 'seat': 3, 'price': 100, 'base_price': 100, 'sold': False},
            {'section': "Balcony", 'row': 4, 'seat': 4, 'price': 100, 'base_price': 100, 'sold': False},
            {'section': "Balcony", 'row': 4, 'seat': 5, 'price': 100, 'base_price': 100, 'sold': False},
            {'section': "Balcony", 'row': 4, 'seat': 6, 'price': 100, 'base_price': 100, 'sold': False},
            {'section': "Box seats", 'row': 1, 'seat': 1, 'price': 300, 'base_price': 300, 'sold': False},
            {'section': "Box seats", 'row': 1, 'seat': 2, 'price': 300, 'base_price': 300, 'sold': False},
            {'section': "Box seats", 'row': 1, 'seat': 3, 'price': 300, 'base_price': 300, 'sold': False},
            {'section': "Box seats", 'row': 1, 'seat': 4, 'price': 300, 'base_price': 300, 'sold': False},
            {'section': "Box seats", 'row': 1, 'seat': 5, 'price': 300, 'base_price': 300, 'sold': False},
            {'section': "Box seats", 'row': 1, 'seat': 6, 'price': 300, 'base_price': 300, 'sold': False},
            {'section': "Box seats", 'row': 2, 'seat': 1, 'price': 300, 'base_price': 300, 'sold': False},
            {'section': "Box seats", 'row': 2, 'seat': 2, 'price': 300, 'base_price': 300, 'sold': False},
            {'section': "Box seats", 'row': 2, 'seat': 3, 'price': 300, 'base_price': 300, 'sold': False},
            {'section': "Box seats", 'row': 2, 'seat': 4, 'price': 300, 'base_price': 300, 'sold': False},
            {'section': "Box seats", 'row': 2, 'seat': 5, 'price': 300, 'base_price': 300, 'sold': False},
            {'section': "Box seats", 'row': 2, 'seat': 6, 'price': 300, 'base_price': 300, 'sold': False},
            {'section': "Box seats", 'row': 3, 'seat': 1, 'price': 300, 'base_price': 300, 'sold': False},
            {'section': "Box seats", 'row': 3, 'seat': 2, 'price': 300, 'base_price': 300, 'sold': False},
            {'section': "Box seats", 'row': 3, 'seat': 3, 'price': 300, 'base_price': 300, 'sold': False},
            {'section': "Box seats", 'row': 3, 'seat': 4, 'price': 300, 'base_price': 300, 'sold': False},
            {'section': "Box seats", 'row': 3, 'seat': 5, 'price': 300, 'base_price': 300, 'sold': False},
            {'section': "Box seats", 'row': 3, 'seat': 6, 'price': 300, 'base_price': 300, 'sold': False},
            {'section': "Box seats", 'row': 4, 'seat': 1, 'price': 300, 'base_price': 300, 'sold': False},
            {'section': "Box seats", 'row': 4, 'seat': 2, 'price': 300, 'base_price': 300, 'sold': False},
            {'section': "Box seats", 'row': 4, 'seat': 3, 'price': 300, 'base_price': 300, 'sold': False},
            {'section': "Box seats", 'row': 4, 'seat': 4, 'price': 300, 'base_price': 300, 'sold': False},
            {'section': "Box seats", 'row': 4, 'seat': 5, 'price': 300, 'base_price': 300, 'sold': False},
            {'section': "Box seats", 'row': 4, 'seat': 6, 'price': 300, 'base_price': 300, 'sold': False}]

    def get_opera(self):
        '''Returns a string of the operas name'''
        return self.opera

    def get_date(self):
        '''Returns a string of the date of the operas performance'''
        return self.date

    def get_time(self):
        '''Returns a string of the time of the performance'''
        return self.time

    def get_seating(self):
        '''Returns a list of dictionaries of the seating information'''
        return self.seating

    def set_seating(self, new_seating):
        '''Assigns an updated seating_chart'''
        self.seating = new_seating


def add_to_data_base(performance):
    '''Checks that the performance is not in the text_file(opera_data).  If it is not it adds to the file.'''
    # make the performance a dictionary.
    showing = {"opera": performance.get_opera(), "date": performance.get_date(), "time": performance.get_time(),
               "seating": performance.get_seating()}
    opera_list = []  # will hold the operas found in the file.
    list_from_file(opera_list)
    # search list for matching opera if found return.
    for event in opera_list:
        if (performance.get_opera() == event.get('opera') and
                performance.get_date() == event.get('date') and
                performance.get_time() == event.get('time')):
            return
    # opera wasn't found so append it to the file.
    with open('opera_data.txt', 'a') as data_base:
        data_base.write(json.dumps(showing) + '\n')


def search(opera, date, time, section):
    '''Searches for the performance in the text file and returns a list of available seats.'''
    opera_list = []  # will hold the operas in the file
    list_from_file(opera_list)
    # search for matching opera in the list.
    for event in opera_list:
        if (opera == event.get('opera') and
                date == event.get('date') and
                time == event.get('time')):
            # set dynamic pricing and check if all tickets are sold.
            if find_pricing(event) == 'sold_out':
                return 'sold-out'
            else:
                found = event.get('seating')  # the performance was found
    available = []  # will hold the unsold seats
    # check if seats are unsold in the performances seating chart. If unsold add to the list of unsold seats.
    for seat in found:
        if seat.get('section') == section and seat.get('sold') == False:
            available.append(seat)
    return available


def find_pricing(performance):
    '''Set dynamic pricing for each seat.'''
    tickets_sold = 0  # counts tickets that have been sold
    seat_count = 0  # counts number of seats in seating chart.
    updated_list = []  # will hold list of seats with new prices in it.
    # search each seat and count the seats and sold tickets.
    for seat in performance.get('seating'):
        seat_count += 1
        if seat.get('sold') == True:
            tickets_sold += 1
    if tickets_sold == seat_count:
        return 'sold_out'
    # increase price of each seats base price by 5% if between 80% and 85% of tickets are sold, 10% if betwwen 85% and 90% are sold,
    # 15% if between 90% and 95% are sold, by 20% if more than 95% are sold.
    # Does calculation for each seat then assigns new value to dictionary then adds it to updated list
    for seat in performance.get('seating'):
        if (seat_count * .80) <= tickets_sold < (seat_count * .85) and seat.get('price') < round(
                seat.get('base_price') * 1.05, 2):
            seat['price'] = round(seat.get('base_price') * 1.05, 2)
        if (seat_count * .85) <= tickets_sold < (seat_count * .90) and seat.get('price') < round(
                seat.get('base_price') * 1.10, 2):
            seat['price'] = round(seat.get('base_price') * 1.10, 2)
        if (seat_count * .90) <= tickets_sold < (seat_count * .95) and seat.get('price') < round(
                seat.get('base_price') * 1.15, 2):
            seat['price'] = round(seat.get('base_price') * 1.15, 2)
        if (seat_count * .95) <= tickets_sold and seat.get('price') < round(seat.get('base_price') * 1.20, 2):
            seat['price'] = round(seat.get('base_price') * 1.20, 2)
        if seat_count == tickets_sold:
            return 'sold_out'
        updated_list.append(seat)
    # create a new object and add the updated seating chart to it, then make it into a dictionary.
    updated = Performance(performance.get('opera'), performance.get('date'), performance.get('time'))
    updated.set_seating(updated_list)
    opera_dict = {'opera': updated.get_opera(), 'date': updated.get_date(), 'time': updated.get_time(),
                  'seating': updated.get_seating()}
    opera_list = []  # will hold list of all operas in from the file.
    list_from_file(opera_list)
    # write the file to be empty
    with open('opera_data.txt', 'w') as data_base:
        pass
    # check that each event in the list are different performance.  if different write it to the file.
    with open('opera_data.txt', 'a') as data_base:
        for event in opera_list:
            if opera_dict.get('opera') != event.get('opera'):
                data_base.write(json.dumps(event) + '\n')
            if opera_dict.get('opera') == event.get('opera') and opera_dict.get('date') != event.get('date'):
                data_base.write(json.dumps(event) + '\n')
            if opera_dict.get('opera') == event.get('opera') and opera_dict.get('date') == event.get(
                    'date') and opera_dict.get('time') != event.get('time'):
                data_base.write(json.dumps(event) + '\n')
        # write the updated opera to the file.
        data_base.write(json.dumps(opera_dict) + '\n')


def find_discounts(day, ticket_number):
    '''Find the discounts for the user'''
    discount_list = []
    performance_date = datetime.strptime(day, "%m/%d/%Y")
    today = date.today()
    days_to = performance_date.date() - today
    if int(days_to.days) >= 31:
        discount_list.append(('early_bird', 10))
    if ticket_number >= 5:
        discount_list.append(('multiple_tickets', 5 * ticket_number))
    return discount_list


def buy(opera, date, time, seats):
    opera_list = []  # will hold list of all operas in from the file.
    list_from_file(opera_list)
    for performance in opera_list:
        if performance.get('opera') == opera and performance.get('date') == date and performance.get('time') == time:
            for seat in seats:
                for ticket in performance.get('seating'):
                    if seat[0] == ticket.get('section') and seat[1] == ticket.get('row') and seat[2] == ticket.get(
                            'seat'):
                        if ticket['sold'] == True:
                            return 'Error: Ticket Sold'
                        ticket['sold'] = True
    with open('opera_data.txt', 'w') as data_base:
        pass
    with open('opera_data.txt', 'a') as data_base:
        for event in opera_list:
            data_base.write(json.dumps(event) + '\n')
    return 'Tickets Purchased'


def list_from_file(list):
    '''Reads a file and writes a list'''
    try:
        # read the file and add each opera to the list
        with open('opera_data.txt', 'r') as data_base:
            for opera in data_base:
                event = json.loads(opera)
                list.append(event)
        return list
    except FileNotFoundError:
        pass


def check_seating(opera, date, time):
    """finds and returns the seating chart for an opera."""
    opera_list = []
    list_from_file(opera_list)
    for performance in opera_list:
        if performance['opera'] == opera:
            if performance['date'] == date:
                if performance['time'] == time:
                    return performance['seating']
    return 'performance not found'



