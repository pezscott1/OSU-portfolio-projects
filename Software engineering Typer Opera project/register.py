import json
import re

def preprocess_email(email):
    """Uses a regex to check for valid email."""
    valid = re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', email)
    if valid:
        return True
    return "Invalid email address"


def create_user(email: str, password: str, security: str):
    """Creates a new user."""
    # calls preprocess to validate email
    correct_email = preprocess_email(email)
    if correct_email:
        with open("user_database.json", "r") as f:
            try:
                data = json.load(f)
            # if the database is empty, initialize with array
            except json.decoder.JSONDecodeError:
                data = []
            # check for duplicate email
            for person in data:
                if email == person["email"]:
                    return "Email already registered"
            new_user = {"email": email, "password": password, "security": security}
            # add new user to the existing array
            data.append(new_user)
            with open("user_database.json", "w") as file:
                json.dump(data, file, indent=4)
            return "User created successfully"
    # if it falls through to here, something went wrong with email validation
    else:
        return "Email address is invalid"
