from fastapi import FastAPI
from routes.therapist import therapist
from routes.homeinfo import homeinfo
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPAuthorizationCredentials
from fastapi import Depends, HTTPException
from bson import ObjectId

app = FastAPI()

app.title = "PsycoAdmin API"
app.include_router(therapist)
app.include_router(homeinfo)

origin = {
    'http://localhost:5173',
}

app.add_middleware(
    CORSMiddleware,
    allow_origins=origin,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
