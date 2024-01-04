from jwt import encode, decode, exceptions
from datetime import datetime, timedelta
from os import getenv
from dotenv import load_dotenv
from fastapi.responses import JSONResponse

load_dotenv()


def expire(minutes: int) -> int:
    expire_data = datetime.now() + timedelta(minutes=minutes)
    return expire_data


def generate_token(email: str) -> str:
    data = {"email": email}
    token = encode(payload={**data, "exp": expire(15)}, key=getenv("SECRET_KEY"), algorithm="HS256")
    return token


def verify_token(token: str, output: bool = False):
    try:
        if output:
            return decode(token, key=getenv("SECRET_KEY"), algorithms=["HS256"])
        decode(token, key=getenv("SECRET_KEY"), algorithms=["HS256"])
    except exceptions.ExpiredSignatureError:
        return JSONResponse(
                content={"message": "Token expirado"},
                status_code=401
            )
    except exceptions.DecodeError:
        return JSONResponse(
                content={"message": "Invalid Token"}, 
                status_code=401
            )
