import os
from dotenv import load_dotenv

# Get APP_ENV to determine which .env file to load
app_env = os.getenv("APP_ENV")
env_file = f".env.{app_env}" if app_env else ".env"

# Load the environment file from the current working directory
load_dotenv(env_file)

class Settings:
    # Use defaults to prevent 'NoneType' errors if variables are missing
    MYSQL_HOST = os.getenv("MYSQL_HOST", "localhost")
    MYSQL_PORT = int(os.getenv("MYSQL_PORT", 3306))
    MYSQL_USERNAME = os.getenv("MYSQL_USERNAME", "root")
    MYSQL_PASSWORD = os.getenv("MYSQL_PASSWORD", "")
    MYSQL_DATABASE = os.getenv("MYSQL_DATABASE", "finance_db")
    OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "")

settings = Settings()