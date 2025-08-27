import json



def check_security(email, security_try):
    """checks the security word and returns current password if true"""
    with open("user_database.json", "r") as f:
        try:
            data = json.load(f)
        except json.decoder.JSONDecodeError:
            return "No users in database"
        for person in data:
            if person["email"] == email:
                security = person["security"]
                if security.strip() == security_try.strip():
                    return str(f"Your password is :  {person["password"]}")
                return "Incorrect security word"
        return "User not found!"

def update_password(email, password, new_password=""):
    """Updates the password for the given email.
    Default for new_password is empty string in case it's left blank."""
    with open("user_database.json", "r") as f:
        try:
            data = json.load(f)
        except json.decoder.JSONDecodeError:
            return "No users in database"
        for person in data:
            # if email and current password match and the new password isn't empty, change it
            if person["email"] == email and person["password"] == password:
                if new_password != "":
                    person["password"] = new_password
                    with open("user_database.json", "w") as f:
                        json.dump(data, f)
                        return "Password updated successfully"
                else:
                    # the new password is empty string
                    return "Invalid new password"
            # if not, it returns incorrect
            return "Incorrect password"
        # if here, user not in database
        return "User not found!"
