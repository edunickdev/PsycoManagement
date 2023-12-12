from typing import Optional
from pydantic import BaseModel, Field

class Consultant(BaseModel):
    id_consultant: Optional[str]
    id_therapist: str
    creation_date: str
    names: str
    last_names: str
    type_document: int
    document_number: int
    phone: int
    email: str
    country: str
    city: str
    address: str
    regimen: str
    eps: str
    birth_date: str
    num_contact_emergency: int
    isChild: bool
    email_responsible: str
    phone_responsible: int
    names_responsible: str
    status: str

    