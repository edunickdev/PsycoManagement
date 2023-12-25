from fastapi import FastAPI
from schemas.therapist_schema import therapistEntityList, therapistEntity
from routes.therapist import therapist
from routes.homeinfo import homeinfo
from fastapi.middleware.cors import CORSMiddleware

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
