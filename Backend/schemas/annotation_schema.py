def annotationEntity(Annotation) -> dict:
    return {
        "id": str(Annotation["_id"]),
        "id_consultant": Annotation["id_consultant"],
        "id_therapist": Annotation["id_therapist"],
        "creation_date": Annotation["creation_date"],
        "fields": Annotation["fields"],
        "old_values": Annotation["old_fields"],
        "new_values": Annotation["new_fields"],
        "justification": Annotation["justification"],
    }


def annotationsEntityList(annotations) -> list[dict]:
    return [annotationEntity(annotation) for annotation in annotations]
