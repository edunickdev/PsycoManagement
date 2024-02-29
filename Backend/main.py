from fastapi import FastAPI
from routes.therapist import therapist
from routes.homeinfo import homeinfo
from routes.consultants import consultant
from routes.events import event
from routes.annotations import annotations
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.title = "PsycoAdmin API"
app.include_router(therapist)
app.include_router(homeinfo)
app.include_router(consultant)
app.include_router(event)
app.include_router(annotations)

origin = {
    'http://localhost:5173',
    'https://psycoadmin.netlify.app',
    'http://127.0.0.1:8080/',
    'ws://127.0.0.1:62325/myFrpjr5FMU=/ws'
}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
