import json


def regular_cart(tickets):

    ticketChoice = []
    price = 0
    for ticket in tickets['possible_seats']:
        ticketChoice.append(f"Section: {ticket[0]}, Row:  {ticket[1]}, Seat: {ticket[2]}")
        with open("TicketTiers.py", "r") as f:
            data = json.load(f)
            for item in data:
                for j, k in item.items():
                    if ticket[0] == j:
                        price += k

    return (f"Your cart contains:  {[item for item in ticketChoice]} \n"
            f" and the total price is: ${price}.")


def discount_cart(tickets):
    ticketChoice = []
    price = 0
    for ticket in tickets['possible_seats']:
        ticketChoice.append(f"Section: {ticket[0]}, Row:  {ticket[1]}, Seat: {ticket[2]}")
        with open("TicketTiers.py", "r") as f:
            data = json.load(f)
            for item in data:
                for j, k in item.items():
                    if ticket[0] == j:
                        price += k
        price = round(price * .9, 2)

    return (f"Your cart contains:  {[item for item in ticketChoice]} \n"
            f" and the total price is: ${price}, including your discount of 10%.")

