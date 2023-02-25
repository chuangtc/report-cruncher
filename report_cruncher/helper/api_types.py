def create_error_return(code: str, msg: str = "") -> dict:
    error_return = dict(code=code, message=msg)
    return dict(error=error_return)


def create_no_error() -> dict:
    return dict(error=None)
