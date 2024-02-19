from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from config.connection import get_collection
from config.jwt_functions import JWTBearer
from models.event_model import Event
from schemas.event_schema import eventEntityList


event = APIRouter()


@event.get("/events/{therapist}", tags=["Events"], dependencies=[Depends(JWTBearer())])
def get_all_events_by_therapist(therapist: str):
    cursor = get_collection("Events").find( {"id_therapist": str(therapist)} )
    events = eventEntityList(cursor)
    
    return JSONResponse(
        content={
            "message": "Consulta exitosa",
            "status": "consulta exitosa",
            "events": events
        },
        status_code=200
    )


@event.post("/events/new-event", tags=["Events"], dependencies=[Depends(JWTBearer())])
def create_event(event: Event):
    new_event = dict(event)
    event_id = get_collection("Events").insert_one(new_event).inserted_id
    new_event["_id"] = str(event_id)
    return JSONResponse(
         content={
            "message": "Evento creado correctamente",
            "status": "Evento creado",
        },
        status_code=200
    )
    