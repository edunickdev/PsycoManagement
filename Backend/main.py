from fastapi import FastAPI
from routes.therapist import therapist
from routes.homeinfo import homeinfo
from routes.consultants import consultant
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.title = "PsycoAdmin API"
app.include_router(therapist)
app.include_router(homeinfo)
app.include_router(consultant)

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
