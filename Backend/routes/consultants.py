from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from config.jwt_functions import JWTBearer
from models.consultant_model import Consultant
from config.connection import get_collection
from schemas.consultant_schema import consultantEntityList


consultant = APIRouter()


@consultant.get("/consultants/{id_therapist}", tags=["Therapist"], dependencies=[Depends(JWTBearer())])
def get_therapist_consultants( id_therapist: str ):
    cursor = get_collection("Consultants").find( {"id_therapist": str(id_therapist)} )
    consultants = consultantEntityList(cursor)
    return JSONResponse(
        content={
            "message": "Consulta exitosa",
            "status": "consulta exitosa",
            "consultants": consultants
        },
        status_code=200
    )


@consultant.post("/consultants/new-consultant", tags=["Therapist"])
def create_new_consultant( consultant: Consultant ):
    new_consultant = dict(consultant)
    first_condition = get_collection("Consultants").find_one({"email": consultant.email})
    second_condition = get_collection("Consultants").find_one({"document_number": consultant.document_number})
    if first_condition or second_condition:
        return JSONResponse(
            content={
                "message": "El usuario ya se encuentra registrado en la base de datos",
                "status": "usuario existente"
            },
            status_code=401            
        )
    new_id = get_collection("Consultants").insert_one(new_consultant).inserted_id
    new_consultant["_id"] = str(new_id)
    return JSONResponse(
        content={
            "message": "Consultante creado correctamente",
            "status": "consultante creado",
        },
        status_code=200
    )
    
    
@consultant.patch("/consultant/update-consultant", tags=["Therapist"])
async def update_consultant(id_consultant: str):
     consultant_update = ""

