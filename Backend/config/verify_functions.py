import bcrypt
from fastapi.responses import JSONResponse
from .jwt_functions import generate_token
from .connection import get_collection


def verify_therapist_credentials(email: str, password: str):
    user = get_collection("User").find_one({"email": email})
    if user and bcrypt.checkpw(password.encode("utf-8"), user["password"].encode("utf-8")):
        token = generate_token(email=email)
        id_user = str(user['_id'])
        return JSONResponse(
            content={
                "message": "Inicio de sesión correcto",
                "status": "inicio exitoso",
                "token": token,
                "id": id_user,
                "names": user["names"]
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
        
