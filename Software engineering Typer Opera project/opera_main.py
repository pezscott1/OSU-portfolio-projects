
import json
from json import JSONDecodeError

import typer

import microserviceD_client
import microserviceA_client
import microserviceB_client
import microserviceC_client

app = typer.Typer(invoke_without_command=True)


@app.callback()
def greeting():
    """
    Welcome to the help screen for the Metropolitan Opera Tickets Portal!!
    You may use any of the commands below as arguments with "python opera_main.py."
    """
    print()
    print("Welcome to the Metropolitan Opera ticket portal!! \n \n"
          "If you've come here to search for tickets for opera productions, this is the right place! \n"
          "This app is growing in functionality and already encompasses the commands below. "
          "In the future, we plan to add even more amazing features. \n \n" 
          "Here is a list of all available commands:\n \n"
          "operas - get a list of all available operas \n"
          "get dates - get a list of dates for an opera once you know what you want to see \n"
          "get tickets - find out prices for the various tiers of tickets \n" 
          "get synopsis - get the synopsis for an opera \n" 
          "create user - create a new user **We will never spam you or sell your email address** \n" 
          "login - login to a preexisting account \n"
          "get discount code - once registered, ask for a code to receive 10% off!!"
          "delete user - delete a user \n \n"
          "browse - to see information about all the operas. \n \n"
          "You may also type \"home\" to return to this screen. \n"
          "At any time, type \"exit\" to exit the program or re-initialize with \"python opera_main.py --help\" to find other information and ways to progress. \n")
    print()
    commands()


@app.command()
def operas():
    with open("operas.py", "r") as f:
        data = json.load(f)
        for opera in data:
            print(opera['name'])
    typer.echo("These operas are now available. To see the dates for an opera, type the name of one of the operas above, or type \"home\" to see a list of all commands. \n")
    opera = typer.prompt("Which opera would you like to see the dates for?")
    if opera == "exit":
        raise typer.Exit()
    get_dates(opera)
    commands()


@app.command()
def browse():
    typer.echo("Here's some info about the available operas: \n")
    with open("operas.py", "r") as f:
        data = json.load(f)
        for opera in data:
            print("Opera: ", opera['name'])
            print("Length: ", opera['length'])
            print("Language: ", opera['language'])
            print("First performance: ", opera['first performance'])
            print("Synopsis: ", opera['synopsis'])
            print("_______________________________")
    print()
    typer.echo("If you're feeling stuck, here are all the possible commands again: ")
    greeting()


@app.command()
def admin_login():
    admin = typer.prompt("Enter admin email ")
    password = typer.prompt("Enter admin password ")
    result = microserviceB_client.client({"type": "admin login", "email": admin, "password": password})
    typer.echo(result.decode())
    if result.decode() == "Login successful":
        admin_commands()


@app.command()
def login():
    email = typer.prompt("What is your email?")
    password = typer.prompt("What is your password?")
    data = {"type": "login", "email": email, "password": password}
    message = microserviceB_client.client(data)
    typer.echo(message.decode())
    final = message.decode()
    if final.strip() == "Incorrect Password":
        print(f"If you want to know your password, please follow the steps below.")
        security = typer.prompt("What is your security word? ")
        security_check = microserviceB_client.client({"type": "security check", "email": email, "security": security})
        if security_check:
            typer.echo(security_check.decode())
    commands()


@app.command()
def get_discount_code():
    typer.echo("To receive a discount code, please enter your email and password: \n")
    email = typer.prompt("Email ")
    password = typer.prompt("Password ")
    data = {"type": "login", "email": email, "password": password}
    message = microserviceB_client.client(data)
    if message.decode() == "Login successful":
        microserviceC_client.client("Discount code required")
    commands()


@app.command()
def get_dates(opera: str):
    with open("operaDates.json", "r") as f:
        data = json.load(f)
        for operas in data:
            count = 0
            if operas['opera'] == opera:
                while count < len(operas["dates"]):
                    print(operas["dates"][count], operas["times"][count])
                    count += 1
        date = typer.prompt("What date would you like to see the tickets for?")
        time = typer.prompt("What time is the performance?")
        if date:
            get_tickets(opera, date, time)
    commands()


@app.command()
def get_tickets(opera: str, date: str, time: str):
    with open("TicketTiers.py", "r") as f:
        data = json.load(f)
        for tier in data:
            for key, value in tier.items():
                print(key, value)
        section = typer.prompt("What section would you like to sit in?")
        number = typer.prompt("How many tickets would you like?")
        search = {'instruct': 'search', 'opera': opera, 'date': date, 'time': time, 'section': section, 'tickets': int(number)}
        message = microserviceA_client.client(search)
        try:
            json_data = json.loads(message)
            counter = 0
            seats = json_data['seats']
            possible_seats = []
            while counter < int(number):
                print(seats[counter][0], "row: ", seats[counter][1], "seat: ", seats[counter][2])
                possible_seat = (seats[counter][0], seats[counter][1], seats[counter][2])
                possible_seats.append(possible_seat)
                counter += 1
            discount_ask = typer.confirm("Do you have a discount code? ")
            if discount_ask:
                code = typer.prompt("Enter your discount code ")
                confirm_discount = microserviceC_client.client(f"{code}")
                if confirm_discount:
                    typer.echo("Discount code successfully entered, you'll receive 10% off.")
                    confirm = typer.confirm("Would you like to buy these tickets?")
                    if confirm:
                        buy = {"discount": True, "possible_seats": possible_seats}
                        microserviceD_client.client(buy)

                else:
                        typer.echo("Discount code failed to enter 10% off.")
                        confirm = typer.confirm("Would you still like to buy these tickets?")
                        if confirm:
                            buy = {"discount": False, "possible_seats": possible_seats}
                            microserviceD_client.client(buy)
            else:
                buy = {"discount": False, "possible_seats": possible_seats}
                microserviceD_client.client(buy)
            buy_tix = typer.confirm("To continue with the purchase, please confirm: ")
            if buy_tix:
                buy = {'instruct': 'buy', 'opera': opera, 'date': date, 'time': time, 'seats': possible_seats}
                sold = microserviceA_client.client(buy)
                if sold:
                    print(sold.decode())
        except JSONDecodeError:
            pass
    commands()


@app.command()
def create_user():
    email = typer.prompt("What is your preferred email address?")
    password = typer.prompt("Please enter a password ")
    security = typer.prompt("What was your first school? ")
    data = {"type": "register", "email": email, "password": password, "security": security}
    message = microserviceB_client.client(data)
    typer.echo(message.decode())
    commands()


@app.command()
def change_password():
    email = typer.prompt("What is your email address?")
    password = typer.prompt("What is your current password?")
    new_password = typer.prompt("What is your new password?")
    message = microserviceB_client.client({"type": "password change", "email": email, "password": password, "new_password": new_password})
    final = message.decode()
    typer.echo(final)
    if final.strip() == "Incorrect password":
        print(f"If you want to know your password, please follow the steps below.")
        security = typer.prompt("What is your security word? ")
        security_check = microserviceB_client.client({"type": "security check", "email": email, "security": security})
        if security_check:
            typer.echo(security_check.decode())
    commands()


@app.command()
def delete_user():
    username = typer.prompt("What is the username?")
    password = typer.prompt("What is the password?")
    confirm = typer.confirm("Are you sure you want to delete this user?")
    if confirm:
        message = microserviceB_client.client({"type": "delete user", "email": username, "password": password})
        typer.echo(message.decode())
    commands()


@app.command()
def get_synopsis(opera: str):
    with open("operas.py", "r") as f:
        data = json.load(f)
        for item in data:
            if opera == item['name']:
                print(item['synopsis'])
    commands()


def show_users():
    with open("user_database.json", "r") as f:
        try:
            data = json.load(f)
            if data == []:
                typer.echo("No users found!")
            for item in data:
                for key, value in item.items():
                    print(key, value)
        except json.decoder.JSONDecodeError:
            typer.echo("No users found!")
    admin_commands()


def load_operas():
    with open("operaDates.json", "r") as f:
        data = json.load(f)
        for operas in data:
            count = 0
            while count < len(operas["dates"]):
                search = {"instruct": "search", "opera": operas["opera"], "date": operas["dates"][count], "time": operas["times"][count], "section": "Orchestra", "tickets": 1}
                message = microserviceA_client.client(search)
                typer.echo(message.decode())
                count += 1
    admin_commands()

def capacity():
    opera = typer.prompt("Which opera is this for?")
    date = typer.prompt("What is day would you like to see capacity for?")
    time = typer.prompt("What time is the performance?")
    capacity = {"instruct": "check_seating", "opera": opera, "date": date, "time": time}
    message = microserviceA_client.client(capacity)
    message = json.loads(message.decode())
    full_count = 0
    total_count = 0
    for data in message:
        total_count += 1
        if data["sold"] is True:
            full_count += 1
    amount_full = round((full_count/total_count * 100), 2)
    typer.echo(f"The percentage of seats taken for this performance is: {amount_full}%")
    admin_commands()


def admin_commands():
    admin_command = typer.prompt("What would you like to do?")
    if admin_command == "exit":
        typer.echo("Thank you!")
        raise typer.Exit()
    elif admin_command == "load operas":
        load_operas()
    elif admin_command == "log out":
        typer.echo("Logged out successfully")
        commands()
    elif admin_command == "show users":
        show_users()
    elif admin_command == "capacity":
        capacity()
    else:
        typer.echo("Invalid command!")
        admin_commands()


def commands():
    command = typer.prompt("Please enter a command")
    if command == "exit":
        raise typer.Exit()
    elif command == "browse":
        browse()
    elif command == "get discount code":
        get_discount_code()
    elif command == "login":
        login()
    elif command == "admin login":
        admin_login()
    elif command == "change password":
        change_password()
    elif command == "operas":
        operas()
    elif command == "get dates":
        command = typer.prompt("What opera would you like to know the dates for? If you don't know the operas, type \"operas\" ")
        if command == "operas":
            operas()
        else:
            get_dates(command)
    elif command == "get tickets":
        opera = ""
        opera_try = typer.prompt("What opera would you like tickets for?")
        with open("operas.py", "r") as f:
            data = json.load(f)
        for names in data:
            if opera_try == names['name']:
                date = typer.prompt("What date would you like tickets for?")
                time = typer.prompt("What time is the performance?")
                get_tickets(opera, date, time)
        typer.echo("Opera not found! Please try again.")
        operas()

    elif command == "get synopsis":
        command = typer.prompt("What would you like to know the synopsis for? If you don't know the operas, type \"operas\" ")
        if command == "operas":
            operas()
        else:
            get_synopsis(command)
    elif command == "create user":
        create_user()
    elif command == "delete user":
        delete_user()
    elif command == "home":
        greeting()
    else:
        typer.echo("Message wasn't understood, please try again")
        commands()


if __name__ == "__main__":
    app()


