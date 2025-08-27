import random


def get_discount():

    discounts = ["2025discounttickets", "myDiscount", "cheaptix", "10OFF", "iLoveOpera"]
    rando = random.randint(0,4)
    return discounts[rando]


def check_discount(discount):

    discounts = ["2025discounttickets", "myDiscount", "cheaptix", "10OFF", "iLoveOpera"]
    if discount not in discounts:
        return False
    return True
