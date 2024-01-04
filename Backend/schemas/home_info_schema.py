

def homeInfoEntity(HomeInfo) -> dict:
    return {
        'id': str(HomeInfo["_id"]),
        'title': HomeInfo["title"],
        'subtitle': HomeInfo["subtitle"],
        'description': HomeInfo["description"],
        'image': HomeInfo["image"],
        'status': HomeInfo["status"],
        'created_at': HomeInfo["created_at"]
    }
    
def homeInfoEntityList(homeInfos) -> list[dict]:
    return [homeInfoEntity(homeInfo) for homeInfo in homeInfos]
