from fastapi import APIRouter
from fastapi.responses import JSONResponse
from config.jwt_functions import verify_token
from config.verify_functions import verify_therapist_credentials
from models.auth_user_request import AuthUserRequest
from models.therapist_model import Therapist
from config.connection import get_collection
from schemas.response_login_schema import responseEntity


therapist = APIRouter()


@therapist.post("/sign-up", tags=["Authentication"])
def register_therapist(therapist: Therapist):
    is_exist = get_collection("User").find_one({"email": therapist.email})
    if is_exist:
        return JSONResponse(
            content={
                "message": f"El correo {therapist.email} ya se encuentra registrado",
                "status": "usuario ya existe"
            },
            status_code=409
        )
    new_therapist = dict(therapist)
    new_id = get_collection("User").insert_one(new_therapist).inserted_id
    new_therapist["_id"] = str(new_id)
    return JSONResponse(
        content={
            "message": "Usuario creado correctamente",
            "status": "usuario creado"
        },
        status_code=201
    )


@therapist.post("/login", tags=["Authentication"])
async def login_therapist( data: AuthUserRequest):
    try:
        user = verify_therapist_credentials(data.email, data.password)
        return user
    except:
        return JSONResponse(
            content=responseEntity(
                message="Oh no algo fallo en la petición",
                status="Mala petición"
            ),
            status_code=400
        )


@therapist.post("/verify", tags=["Authentication"])
def verify_token_expire(token: str):
    result = token.split(" ")[1]
    return verify_token(result, output=True)


