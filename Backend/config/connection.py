from pymongo import MongoClient

connection = MongoClient("mongodb://localhost:27017/")
db = connection["PsycoAdmin"]

user_collection = db["User"]
home_collection = db["Home"]

