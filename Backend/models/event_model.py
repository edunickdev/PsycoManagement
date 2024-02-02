from typing import Optional
from pydantic import BaseModel

class Event(BaseModel):
    id_consultant: str
    id_therapist: str
    start_date: str
    end_date: str
    description: str
    title: str
    placement: str
    isPayed: bool
    isAllDay: bool
    
    