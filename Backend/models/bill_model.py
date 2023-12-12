from typing import Optional
from pydantic import BaseModel, Field


class Bill(BaseModel):
    id_bill: Optional[str]
    id_theapist: str
    id_consultant: str
    consultant_date: str
    methods_payment: str
    amount: float
    status: str