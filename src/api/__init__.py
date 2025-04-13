def __init__(self, email=None, password=None):
    if email is not None:
        self.email = email
    if password is not None:
        self.password = generate_password_hash(password)
    self.is_active = True