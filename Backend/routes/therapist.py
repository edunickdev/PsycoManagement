from fastapi import APIRouter
from fastapi.responses import JSONResponse
from config.jwt_functions import verify_token
from config.verify_functions import verify_therapist_credentials
from models.therapist_model import Therapist
from config.connection import user_collection


therapist = APIRouter()


@therapist.post("/auth/sign-up", tags=["Authentication"])
def register_therapist(therapist: Therapist):
    is_exist = user_collection.find_one({"email": therapist.email})
    if is_exist:
        return JSONResponse(
            content={
                "message": f"El correo {therapist.email} ya se encuentra registrado",
                "status": "usuario ya existe"
            },
            status_code=500
        )
    new_therapist = dict(therapist)
    new_id = user_collection.insert_one(new_therapist).inserted_id
    new_therapist["_id"] = str(new_id)
    return JSONResponse(
        content={
            "message": "Usuario creado correctamente",
            "status": "usuario creado"
        },
        status_code=200
    )
    

@therapist.post("/auth/login", tags=["Authentication"])
async def login_therapist( therapist: Therapist ):
    user = verify_therapist_credentials(therapist.email, therapist.password)
    return user
    
    
@therapist.post("/auth/verify", tags=["Authentication"])
def verify_token_expire(token: str):
    result = token.split(" ")[1]
    return verify_token(result, output=True)


