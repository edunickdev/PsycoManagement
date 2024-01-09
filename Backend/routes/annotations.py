from fastapi import APIRouter
from fastapi.responses import JSONResponse
from models.annotations_model import Annotations
from config.connection import get_collection

annotations = APIRouter()



