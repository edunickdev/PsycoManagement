def eventEntity(Event) -> dict:
    return {
        "id": str(Event["_id"]),
        "id_consultant": Event["id_consultant"],
        "id_therapist": Event["id_therapist"],
        "start_date": Event["start_date"],
        "end_date": Event["end_date"],
        "description": Event["description"],
        "title": Event["title"],
        "placement": Event["placement"],
        "isPayed": Event["isPayed"],
        "isAllDay": Event["isAllDay"],
    }
    
    
def eventEntityList(events) -> list[dict]:
    return [eventEntity(event) for event in events]
