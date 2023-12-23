from fastapi import APIRouter

from models.therapist_model import Therapist
from config.connection import user_collection
from schemas.therapist_schema import therapistEntityList

therapist = APIRouter()

@therapist.post("/auth/sign-up", tags=["Authentication"])
def register_therapist(therapist: Therapist):
    data = dict(therapist)
    new_id = user_collection.insert_one(data).inserted_id
    return f"Registro realizado, nuevo usuario con id: {new_id}"


@therapist.get("/auth/login", tags=["Authentication"])
def login_therapist():
    cursor = user_collection.find()
    return therapistEntityList(cursor)

