from pydantic_settings import BaseSettings
from urllib.parse import quote_plus

class Settings(BaseSettings):
    DB_HOST: str = "localhost"
    DB_PORT: int = 5432
    DB_NAME: str
    DB_USER: str
    DB_PASSWORD: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    MIN_PASSWORD_LENGTH: int = 8

    @property
    def DATABASE_URL(self) -> str:
        password = quote_plus(self.DB_PASSWORD) 
        return (
            f"postgresql://{self.DB_USER}:{password}"
            f"@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
        )

    class Config:
        env_file = ".env"

settings = Settings()