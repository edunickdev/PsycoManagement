def therapistEntity(therapist) -> dict:
    return {
        "id_therapist": str(therapist["_id"]),
        "register_date": therapist["register_date"],
        "names": therapist["names"],
        "genre": therapist["genre"],
        "birth_date": therapist["birth_date"],
        "age": therapist["age"],
        "email": therapist["email"],
        "phone": therapist["phone"],
        "address": therapist["address"],
        "type_document": therapist["type_document"],
        "document_number": therapist["document_number"],
        "status": therapist["status"]
    }
    
    
def therapistEntityList(therapists) -> list[dict]:
    return [therapistEntity(therapist) for therapist in therapists]
    