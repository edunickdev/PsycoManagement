from typing import Optional
from pydantic import BaseModel

class HomeInfo(BaseModel):
    id: Optional[str]
    title: str
    subtitle: str
    description: str
    image: str
    status: str
    created_at: str