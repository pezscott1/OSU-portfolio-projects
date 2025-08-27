import json


def login_user(email: str, password: str):
    """Login existing user"""
    with open("user_database.json", "r") as f:
        # if nothing is in the user database, there aren't any users
        try:
            data = json.load(f)
        except json.decoder.JSONDecodeError:
            return "No users in database"
        for person in data:
            # if email and password match return True
            if email == person["email"]:
                if password == person["password"]:
                    return "Login successful"
                else:
                    return "Incorrect Password"
        return "User not found!"

def login_admin(email: str, password: str):
    """Login admin"""
    with open("admin.json", "r") as f:
        # if nothing is in the user database, there aren't any users
        try:
            data = json.load(f)
        except json.decoder.JSONDecodeError:
            return "No users in database"
        for person in data:
            print(person)
            # if password match returns True
            if email.strip() == person["email"].strip():
                if password.strip() == person["password"].strip():
                    return "Login successful"
                else:
                    return "Incorrect Password"
        return "User not found!"