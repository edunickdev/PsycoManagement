from fastapi import APIRouter, Depends
from config.jwt_functions import JWTBearer
from models.home_info_model import HomeInfo
from config.connection import get_collection
from schemas.home_info_schema import homeInfoEntityList


homeinfo = APIRouter()


@homeinfo.get("/", tags=["Home"])
def find_all_home_info():
    cursor = get_collection("Home").find()
    return homeInfoEntityList(cursor)


@homeinfo.post("/", tags=["Home"])
def create_home_info(homeInfo: HomeInfo):
    data = dict(homeInfo)
    new_id = get_collection("Home").insert_one(data).inserted_id
    return f"Registro realizado, nuevo usuario con id: {new_id}"
