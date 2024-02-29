from bson import ObjectId
from fastapi import APIRouter, Depends, WebSocket
from fastapi.responses import JSONResponse
from pymongo import ReturnDocument
from config.jwt_functions import JWTBearer
from models.annotations_model import Annotations
from models.consultant_model import Consultant
from config.connection import get_collection
from schemas.consultant_schema import consultantEntityList


consultant = APIRouter()


@consultant.websocket("/ws")
async def websocket_consultant(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Hola desde websocket {data}")



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
    myAnnotation = Annotations(**info.get("annotation", {}))
    sizeFields = len(info["fields"])
    sizeNewValues = len(info["newValues"])
    try:
        if sizeFields != 0 and sizeNewValues != 0 and sizeFields == sizeNewValues and myAnnotation:
            update_fields: dict = {field: info["newValues"][i] for i, field in enumerate(info["fields"])}
            current_consultant = get_collection("Consultants").find_one_and_update(
                {"_id": ObjectId(id)},
                {"$set": update_fields},
                return_document=ReturnDocument.AFTER
            )
            new_annotation = dict(info["annotation"])
            annotation = get_collection("Annotations").insert_one(new_annotation).inserted_id
            new_annotation["_id"] = str(annotation)
            if annotation and current_consultant:
                return JSONResponse(
                    content={
                        "result": "Actualización exitosa",
                        "status": "actualización exitosa",
                    },
                    status_code=200
                )
            else:
                return JSONResponse(
                    status_code=403,
                    content={
                        "result": "Oh no, algo fallo guardando los datos",
                        "status": "falla catastrofica"
                    }
                )
        else:
            return JSONResponse(
                status_code=403,
                content={
                    "result": "Mala petición uno o mas campos necesarios no han sido recibidos",
                    "status": "datos incompletos"
                }
            )
    except:
        return JSONResponse(
            status_code=403,
            content={
                "result": "No se tienen datos para actualizar",
                "status": "Petición incompleta"
            }
        )

