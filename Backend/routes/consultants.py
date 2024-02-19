from bson import ObjectId
from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from pymongo import ReturnDocument
from config.jwt_functions import JWTBearer
from models.annotations_model import Annotations
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


@consultant.post("/consultants/new-consultant", tags=["Therapist"], dependencies=[Depends(JWTBearer())])
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
    
    
@consultant.post("/consultant/update-consultant/{id}", tags=["Therapist"])
async def update_consultant(id: str, info: dict):
    update_fields: dict = {field: info["newValues"][i] for i, field in enumerate(info["fields"])}
    current_consultant = get_collection("Consultants").find_one_and_update(
        {"_id": ObjectId(id)}, 
        {"$set": update_fields}, 
        return_document=ReturnDocument.AFTER
    )
    current_consultant
    pass

