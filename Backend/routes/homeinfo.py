from fastapi import APIRouter
from models.home_info_model import HomeInfo
from config.connection import home_collection
from schemas.home_info_schema import homeInfoEntityList


homeinfo = APIRouter()


@homeinfo.get("/home", tags=["Home"])
def find_all_home_info():
    cursor = home_collection.find()
    return homeInfoEntityList(cursor)


@homeinfo.post("/home", tags=["Home"])
def create_home_info(homeInfo: HomeInfo):
    data = dict(homeInfo)
    new_id = home_collection.insert_one(data).inserted_id
    return f"Registro realizado, nuevo usuario con id: {new_id}"
