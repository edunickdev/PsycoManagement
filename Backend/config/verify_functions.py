import bcrypt
from fastapi.responses import JSONResponse
from models.responseLogin import ResponseLogin

from schemas.response_login_schema import responseEntity
from .jwt_functions import generate_token
from .connection import get_collection


def verify_therapist_credentials(email: str, password: str):
    user = get_collection("User").find_one({"email": email})
    if user and bcrypt.checkpw(password.encode("utf-8"), user["password"].encode("utf-8")):
        token = generate_token(email=email)
        id_user = str(user['_id'])
        result = ResponseLogin(
            message="Inicio de sesión correcto",
            status="inicio exitoso",
            token=token,
            id=id_user,
            names=user["names"]
        ).toDict()

        resp = responseEntity(
            message="Inicio de sesión correcto",
            status="inicio exitoso",
            token=token,
            id=id_user,
            names=user["names"]
        )
        return JSONResponse(
            content=result,
            status_code=200
        )
    else:
        resp = responseEntity(
            message="Credenciales incorrectos",
            status="información incorrecta"
        )
        return JSONResponse(
            content=resp,
            status_code=200,
        )

