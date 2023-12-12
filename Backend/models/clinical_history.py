from typing import Optional
from pydantic import BaseModel, Field

class ClinicalHistory(BaseModel):
    id_clinical_history: Optional[str]
    id_consultant: str
    id_therapist: str
    diagnostic: str
    creation_date: str
    last_update: str
    is_active: bool
    close_date: str
    amount_annotation: int
    anottations: list[dict[str, str]]
    status: str
    