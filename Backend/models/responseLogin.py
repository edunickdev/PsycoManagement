from pydantic import BaseModel, Field


class ResponseLogin(BaseModel):
    message: str
    status: str
    token: str = ""
    id: str = ""
    names: str = ""

    def toDict(self):
        return {
            "message": self.message,
            "status": self.status,
            "token": self.token,
            "id": self.id,
            "names": self.names
        }

