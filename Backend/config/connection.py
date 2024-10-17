from urllib.parse import quote_plus
from pymongo import MongoClient
from dotenv import load_dotenv
import os


load_dotenv()


password = os.getenv('pass')
user = os.getenv('mail')

user = quote_plus(user)

connection = MongoClient(f"mongodb+srv://nickstark91:iErEx3vY5Fcq3i8e@ecrprojects.oingc.mongodb.net/")
db = connection["PsycoAdmin"]

user_collection = db["User"]
home_collection = db["Home"]
annotations_collection = db["Annotations"]

def get_collection(collection: str, myDB = db):
    response = myDB[f"{collection}"]
    return response

