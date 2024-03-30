import bcrypt
from fastapi.responses import JSONResponse
from models.responseLogin import ResponseLogin

from schemas.response_login_schema import responseEntity
from .jwt_functions import generate_token
from .connection import get_collection


def verify_therapist_credentials(email: str, password: str):
    user = get_collection("User").find_one({"email": email})
    registerPass: str = user["password"]
    if user and bcrypt.checkpw(password.encode("utf-8"), registerPass.encode("utf-8")):
        token = generate_token(email=email)
        id_user = str(user['_id'])
        result = ResponseLogin(
            message="Inicio de sesión correcto",
            status="inicio exitoso",
            token=token,
            id=id_user,
            names=user["names"]
        ).toDict()

        return JSONResponse(
            content=result,
            status_code=200
        )
    else:
        resp = ResponseLogin(
            message="Credenciales incorrectas",
            status="credenciales incorrectas",
        ).toDict()
        return JSONResponse(
            content=resp,
            status_code=401,
        )

