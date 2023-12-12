from fastapi import FastAPI
from schemas.therapist_schema import therapistEntityList, therapistEntity
from routes.therapist import therapist


app = FastAPI()
app.title = "PsycoAdmin API"
app.include_router(therapist)


# @app.get("/test", tags=["Root"])
# def find_all_therapist():
#     cursor = user_collection.find()
#     return therapistEntityList(cursor)


# @app.post("/auth", tags=["Authentication"])
# def register_therapist(therapist: Therapist):
#     data = dict(therapist)
#     new_id = user_collection.insert_one(data).inserted_id
#     return f"Registro realizado, nuevo usuario con id: {new_id}"


