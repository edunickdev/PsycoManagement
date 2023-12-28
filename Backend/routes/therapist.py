import bcrypt
from fastapi import APIRouter, Depends, Form, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jwt import encode as jwt_encode
from config.connection import secret_key
from passlib.context import CryptContext
from models.therapist_model import Therapist
from config.connection import user_collection

therapist = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def generate_token(email: str) -> str:
    payload = {"email": email}
    token = jwt_encode(payload, secret_key, algorithm="HS256")
    return token

@therapist.post("/auth/sign-up", tags=["Authentication"])
def register_therapist(therapist: Therapist):
    is_exist = user_collection.find_one({"email": therapist.email})
    if is_exist:
        return {
            "message":f"El correo {therapist.email} ya se encuentra registrado",
            "status": "usuario ya existe"
            }
    new_therapist = dict(therapist)
    new_id = user_collection.insert_one(new_therapist).inserted_id
    new_therapist["_id"] = str(new_id)
    new_therapist["token"] = generate_token(therapist.email)
    return {
            "id": new_therapist["_id"], 
            "token": new_therapist["token"],
            "message": "Usuario creado correctamente",
            "status": "usuario creado"
        }


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def verify_user(email: str, password: str):
    user = user_collection.find_one({"email": email})
    if user and bcrypt.checkpw(password.encode("utf-8"), user["password"].encode("utf-8")):
        return user
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Credenciales incorrectos",
        headers={"WWW-Authenticate": "Bearer"},
    )

@therapist.post("/auth/login", tags=["Authentication"])
async def login_therapist( therapist: Therapist ):
    user = verify_user(therapist.email, therapist.password)
    if user is None:
        return {"message": "Credenciales incorrectos"}
    new_token = generate_token(user["email"])
    user["token"] = new_token
    return {
        "token": new_token,
        "message": "Inicio de sesión exitoso",
        "status": "inicio exitoso"
        }
    

