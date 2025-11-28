PHONE_IN_USE = False

def phone_in_use():
    return {"in_use": PHONE_IN_USE}

def set_phone_in_use(status: bool):
    global PHONE_IN_USE
    PHONE_IN_USE = status
    