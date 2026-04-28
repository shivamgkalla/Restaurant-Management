from pydantic import BaseModel, Field

class LoginRequest(BaseModel):
    username: str = Field(max_length=50)
    password: str = Field(min_length=1, max_length=128)

class RefreshTokenRequest(BaseModel):
    refresh_token: str

class ChangePasswordRequest(BaseModel):
    current_password: str = Field(min_length=1, max_length=128)
    new_password: str = Field(min_length=6, max_length=128)

class ResetPasswordRequest(BaseModel):
    staff_id: int
    new_password: str = Field(min_length=6, max_length=128)