from typing import Collection
from urllib.parse import quote_plus
from pymongo import MongoClient
from dotenv import load_dotenv
from os import getenv

load_dotenv()

password = quote_plus(getenv('pass'))
user = quote_plus(getenv('mail'))

connection = MongoClient(f"mongodb+srv://{user}:{password}@psycoadmin-cluster.rjpmk7x.mongodb.net/?retryWrites=true&w=majority")
db = connection["PsycoAdmin"]

user_collection = db["User"]
home_collection = db["Home"]
annotations_collection = db["Annotations"]

def get_collection(collection: str, myDB = db):
    response = myDB[f"{collection}"]
    return response



