from urllib.parse import quote_plus
from pymongo import MongoClient
from dotenv import load_dotenv

import os


load_dotenv()


password = quote_plus((os.getenv("pass")))
user = quote_plus(os.getenv("mail"))
string_connection = f"mongodb+srv://{user}:{password}@ecrprojects.oingc.mongodb.net"

user = quote_plus(user)

connection = MongoClient(string_connection)
db = connection["PsycoAdmin"]

user_collection = db["User"]
home_collection = db["Home"]
annotations_collection = db["Annotations"]


def get_collection(collection: str, myDB=db):
    response = myDB[f"{collection}"]
    return response
