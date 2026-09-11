import os

class Settings:
    PROJECT_NAME: str = "Equicare API"
    API_V1_STR: str = "/api/v1"
    
    # Security Configurations
    SECRET_KEY: str = os.getenv("SECRET_KEY", "super-secret-key-for-dev-change-in-prod-d8j32d80d2380d2389d")
    ALGORITHM: str = "HS256"
    JWT_ISSUER: str = os.getenv("JWT_ISSUER", "urn:equicare:issuer")
    JWT_AUDIENCE: str = os.getenv("JWT_AUDIENCE", "urn:equicare:audience")
    
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "15"))
    REFRESH_TOKEN_EXPIRE_DAYS: int = int(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS", "7"))
    
    # Rate Limiting & Lockout
    MAX_LOGIN_ATTEMPTS: int = int(os.getenv("MAX_LOGIN_ATTEMPTS", "5"))
    LOCKOUT_DURATION_MINUTES: int = int(os.getenv("LOCKOUT_DURATION_MINUTES", "15"))

    # Supabase Connection
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_SERVICE_ROLE_KEY: str = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")

settings = Settings()
