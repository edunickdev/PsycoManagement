from typing import Optional
from pydantic import BaseModel, Field
from datetime import datetime

class Therapist(BaseModel):
    register_date: str = Field(default=datetime.now().strftime("%Y/%m/%d %H:%M"))
    names: str = Field(max_length=40, min_length=5)
    genre: str = Field(default="Sin especificar", max_length=15, min_length=8)
    birth_date: str = Field(default="Sin especificar", max_length=15, min_length=8) 
    age: int = Field(default=datetime.now().year)
    email: str = Field(max_length=100, min_length=10)
    phone: str = Field(default=0, max_length=10, min_length=1)
    address: str = Field(default="Sin especificar", max_length=100, min_length=5)
    type_document: str = Field(default="Cédula de ciudadanía", max_length=25, min_length=8)
    document_number: int = Field(default=0)
    status: str = Field(default="Activo", max_length=15, min_length=5)
    