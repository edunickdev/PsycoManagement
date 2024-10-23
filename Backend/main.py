from fastapi import FastAPI
from routes.therapist import therapist
from routes.homeinfo import homeinfo
from routes.consultants import consultant
from routes.events import event
from routes.annotations import annotations
from routes.profile import profile
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.title = "PsycoAdmin API"
app.include_router(therapist, prefix="/auth")
app.include_router(homeinfo, prefix="/home")
app.include_router(consultant, prefix="/consultants")
app.include_router(event, prefix="/events")
app.include_router(annotations, prefix="/annotations")
app.include_router(profile, prefix="/profile")

origin = {
    "http://localhost:5173",
    "http://localhost:5174",
    "https://psycoadmin.netlify.app",
    "http://127.0.0.1:8080/",
}

app.add_middleware(
    CORSMiddleware,
    allow_origins=origin,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
