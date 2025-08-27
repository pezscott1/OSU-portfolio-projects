import json
import typer


def delete_user(name, password):
    with open("user_database.json", "r") as f:
        try:
            users = json.load(f)
            if not users:
                return "User does not exist"
            count = 0
            for data in users:
                print(data)
                if data['email'] == name:
                    print(data['email'])
                    if data['password'] == password:
                        print(f"Deleting user {name}")
                        del users[count]
                        with open("user_database.json", "w") as f:
                            json.dump(users, f)
                            return "User deleted"
                count += 1
            return "User not found!"
        except json.decoder.JSONDecodeError:
            return "No users found!"
