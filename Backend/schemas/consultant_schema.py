def consultantEntity(Consultant) -> dict:
    return {
        "id_consultant": str(Consultant["_id"]),
        "id_therapist": Consultant["id_therapist"],
        "creation_date": Consultant["creation_date"],
        "names": Consultant["names"],
        "last_names": Consultant["last_names"],
        "type_document": Consultant["type_document"], 
        "document_number": Consultant["document_number"], 
        "phone": Consultant["phone"], 
        "email": Consultant["email"], 
        "country": Consultant["country"], 
        "city": Consultant["city"], 
        "address": Consultant["address"], 
        "regimen": Consultant["regimen"], 
        "eps": Consultant["eps"], 
        "birth_date": Consultant["birth_date"], 
        "num_contact_emergency": Consultant["num_contact_emergency"], 
        "isChild": Consultant["isChild"], 
        "email_responsible": Consultant["email_responsible"],
        "phone_responsible": Consultant["phone_responsible"], 
        "names_responsible": Consultant["names_responsible"], 
        "status": Consultant["status"],
        "last_update": Consultant["last_update"],
        "annotations": Consultant["annotations"]
    }
    

def consultantEntityList(consultants) -> list[dict]:
    return [consultantEntity(consultant) for consultant in consultants]
