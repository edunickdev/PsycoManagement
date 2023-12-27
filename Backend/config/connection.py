from fastapi.security import HTTPBearer
from pymongo import MongoClient

secret_key = "pruebaspsicoadmin"
security = HTTPBearer()

connection = MongoClient("mongodb://localhost:27017/")
db = connection["PsycoAdmin"]

user_collection = db["User"]
home_collection = db["Home"]



