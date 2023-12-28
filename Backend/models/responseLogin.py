from pydantic import BaseModel, Field


class ResponseLogin(BaseModel):
    token: str = Field(min_length=1)
    