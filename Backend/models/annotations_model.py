from pydantic import BaseModel, Field
from datetime import datetime


class Annotations(BaseModel):
    id_consultant: str
    id_therapist: str
    creation_date: str = Field(default=datetime.now().strftime("%Y/%m/%d %H:%M"))
    fields: list[str]
    old_values: list[str | int | bool | float]
    new_values: list[str | int | bool | float]
    justification: str = Field(min_length=10)
    
