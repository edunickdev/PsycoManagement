import bcrypt
from fastapi.responses import JSONResponse
from .jwt_functions import generate_token
from models.therapist_model import Therapist
from .connection import user_collection


def verify_therapist_credentials(email: str, password: str):
    user = user_collection.find_one({"email": email})
    if user and bcrypt.checkpw(password.encode("utf-8"), user["password"].encode("utf-8")):
        token = generate_token(email=email)
        id_user = str(user['_id'])
        return JSONResponse(
            content={
                "message": "Inicio de sesión correcto",
                "status": "inicio exitoso",
                "token": token,
                "id": id_user
            },
            status_code=200
        )
    else:
        return JSONResponse(
            content={
                    "message": "Credenciales incorrectos",
                    "status": "información incorrecta",
                    "token": "",
                    "id": ""
                },
            status_code=403
        )
        
