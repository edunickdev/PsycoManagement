from fastapi import APIRouter
from jwt import encode as jwt_encode
from config.connection import secret_key
from passlib.context import CryptContext


from models.therapist_model import Therapist
from config.connection import user_collection
from schemas.therapist_schema import therapistEntityList

therapist = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def generate_token(email: str) -> str:
    payload = {"email": email}
    token = jwt_encode(payload, secret_key, algorithm="HS256")
    return token

@therapist.post("/auth/sign-up", tags=["Authentication"])
def register_therapist(therapist: Therapist):
    print(f"lo que viene del front: {therapist.password}")
    therapist.password = pwd_context.hash(therapist.password)
    print(f"lo que queda en el backend al final: {therapist.password}")
    is_exist = user_collection.find_one({"email": therapist.email})
    if is_exist:
        return {
            "message":f"El correo {therapist.email} ya se encuentra registrado",
            "registered": "usuario ya existe"
            }
    new_therapist = dict(therapist)
    new_id = user_collection.insert_one(new_therapist).inserted_id
    new_therapist["_id"] = str(new_id)
    new_therapist["token"] = generate_token(therapist.email)
    return {
            "id": new_therapist["_id"], 
            "token": new_therapist["token"],
            "message": "Usuario creado correctamente",
            "registered": "usuario creado"
        }


@therapist.get("/auth/login", tags=["Authentication"])
def login_therapist():
    cursor = user_collection.find()
    return therapistEntityList(cursor)

