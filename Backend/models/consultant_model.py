from pydantic import BaseModel, Field
from datetime import datetime


class Consultant(BaseModel):
    id_therapist: str = Field(default="prueba")
    creation_date: str = Field(default=datetime.now().strftime("%Y/%m/%d %H:%M"))
    names: str = Field(max_length=40, min_length=4)
    last_names: str = Field(max_length=40, min_length=4)
    type_document: str = Field(min_length=2)
    document_number: int = Field(default=0, min_length=8, max_length=15)
    phone: int = Field(default=0)
    email: str = Field(max_length=50, min_length=10)
    country: str = Field(min_length=3, max_length=40)
    city: str = Field(min_length=3, max_length=40)
    address: str = Field(min_length=5, max_length=100)
    regimen: str = Field(min_length=5)
    eps: str = Field(min_length=5)
    birth_date: str = Field(min_length=6)
    num_contact_emergency: int = Field(default=0)
    isChild: bool
    email_responsible: str = Field(max_length=50, min_length=10 )
    phone_responsible: int = Field(default=0)
    names_responsible: str = Field(max_length=50, min_length=4)
    status: str = Field(default="Activo")
    last_update: str = Field(default="Sin modificaciones")
    annotations: int = Field(default=0)

