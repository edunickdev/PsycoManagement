from fastapi import APIRouter, Depends
from fastapi.params import Query, Path
from fastapi.responses import JSONResponse
from config.jwt_functions import JWTBearer
from config.connection import get_collection
from models.annotations_model import Annotations
from schemas.annotation_schema import annotationsEntityList


annotations = APIRouter()


@annotations.get("/{consultant_id}", tags=["Annotations"], dependencies=[Depends(JWTBearer())])
def get_annotations(consultant_id: str = Path(..., description="ID del consultante")):
    cursor = get_collection("Annotations").find({"id_consultatn": consultant_id})
    events = annotationsEntityList(cursor)
    return JSONResponse(
        content={
            "message": "Lista de eventos obtenida",
            "status": "anotaciones obtenidas",
            "events": events
        },
        status_code=200
    )
    
    
@annotations.post("/new-annotation", tags=["Annotations"], dependencies=[Depends(JWTBearer())])
def create_annotation(annotation: Annotations):
    new_annotation = dict(annotation)
    get_collection("Annotations").insert_one(new_annotation)
    return JSONResponse(
        content={
            "message": "Evento creado correctamente",
            "status": "Evento creado"
        },
        status_code=200
    )
