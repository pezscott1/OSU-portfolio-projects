Communication Contract:
A)  How to send request.
You can send two types of requests one to search and one to buy ticktes. Both need to be json dictionaries.

Search should be formed {'instruct': 'search', 'opera': 'the name of the opera', 'date': 'mm/dd/yyyy' (the date of the performance), 'time': 'time of the performance(format won't matter)', 'section: "the ticket type", 'tickets': the number of tickets the users wants to find} 
all are strings expect of tickets which is and int.
make sure date is in mm/dd/yyyy format.

example call:
data = {'instruct': 'search', 'opera': 'bcd', 'date': '04/12/2025', 'time': '2:15', 'section': "Orchestra", 'tickets':6}
processed_data = json.dumps(data)
socket.send_string(processed_data)

buy {'instruct': 'search', 'opera': 'the name of the opera', 'date': 'mm/dd/yyyy' (the date of the performance), 'time': 'time of the performance(format won't matter)', 'seats': [list of seats to buy in form of tuple (section, row, seat)]} 

example call:
data = {'instruct': 'buy', 'opera': 'bcd', 'date': '04/02/2025', 'time': '7:30', 'seats': [("Orchestra", 1, 2), ("Orchestra", 1, 1), ("Orchestra", 2, 1), ("Orchestra", 2, 2)]}
processed_data = json.dumps(data)
socket.send_string(processed_data)

get seating chart {'instruct': 'check_seating, 'opera': 'name of the opera', 'date': 'mm/dd/yyyy', 'time': time of the performance'}

example call:
data = {'instruct': 'check_seating', 'opera': 'bcd', 'date': '04/02/2025', 'time': '7:30'}
processed_data = json.dumps(data)
socket.send_string(processed_data)


B) Hot to recieve request.
if the search is succes, 'seats': [("Orchestra", 1, 2), ("Orchestra", 1, 1), ("Orchestra", 2, 1), ("Orchestra", 2, 2)]}sfull
You will recieve a json dictonary in return.  It will be sturctured as follows:
{'seats': [list of seats in a tuple ('section', row, seat)], 'discounts': [list of discounts]
if the opera is sold out:
"Opera sold out."
if the section is sold out:
"No tickets in this section."
if the section doesn't have enough tickets for the request:
"Not enough tickets in this section."
if the buy is successful:
'Tickets Purchased'
if tickets already sold:
'Error: Ticket Sold'

example call:
response = socket.recv_string()
processed_response = json.loads(response)

![Screenshot 2025-02-15 111524](https://github.com/user-attachments/assets/02f823c5-63d3-4a11-b659-c5fa696455d6)
               
