def profileEntity(Therapist) -> dict:
    return {
        'register_date': Therapist["register_date"],
        'names': Therapist["names"],
        'genre': Therapist["genre"],
        'birth_date': Therapist["birth_date"],
        'age': Therapist["age"],
        'email': Therapist["email"],
        'phone': Therapist["phone"],
        'address': Therapist["address"],
        'type_document': Therapist["type_document"],
        'document_number': Therapist["document_number"],
        'status': Therapist["status"]
    }