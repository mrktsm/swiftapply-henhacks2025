def get_env_variable(var_name, default=None):
    import os
    return os.getenv(var_name, default)

def load_json_file(file_path):
    import json
    with open(file_path, 'r') as file:
        return json.load(file)

def save_json_file(file_path, data):
    import json
    with open(file_path, 'w') as file:
        json.dump(data, file, indent=4)

def validate_email(email):
    import re
    email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    return re.match(email_regex, email) is not None

def format_phone_number(phone_number):
    import re
    cleaned = re.sub(r'\D', '', phone_number)
    if len(cleaned) == 10:
        return f"({cleaned[:3]}) {cleaned[3:6]}-{cleaned[6:]}"
    return phone_number