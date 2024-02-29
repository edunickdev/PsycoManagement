from models.responseLogin import ResponseLogin


def toResponseLoginEntity(
        message: str,
        status: str,
        token: str = "",
        id: str = "",
        names: str = ""
) -> ResponseLogin:
    return ResponseLogin(
        message=message,
        status=status,
        token=token,
        id=id,
        names=names
    )


def responseEntity(
        message: str,
        status: str,
        token: str = "",
        id: str = "",
        names: str = ""):
    return {
        "message": message,
        "status": status,
        "token": token,
        "id": id,
        "names": names
    }