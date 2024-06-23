from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse

from config.connection import get_collection
from config.jwt_functions import JWTBearer
from bson import ObjectId
import bcrypt

from schemas.therapist_schema import fromDictToTherapistModel, therapistEntity


profile = APIRouter()


@profile.get(
        "/{id_therapist}", 
        tags=["Therapist"],
        # dependencies=[Depends(JWTBearer())],
      )
def get_therapist_info( id_therapist: str ):
    print(id_therapist)
    user = get_collection("User").find_one({"_id": ObjectId(id_therapist)})
    user = therapistEntity(user)

    return JSONResponse(
        content={
            "message": "Se obtuvieron los datos correctamente",
            "status": "Datos obtenidos",
            "data": user
        },
        status_code=200
    )
