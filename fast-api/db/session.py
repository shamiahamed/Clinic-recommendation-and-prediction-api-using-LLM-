from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from urllib.parse import quote_plus
from core.config import settings

# Create the database URL after quoting the password to handle special characters
DATABASE_URL = (
    f"mysql+pymysql://{settings.MYSQL_USERNAME}:{quote_plus(settings.MYSQL_PASSWORD or '')}"
    f"@{settings.MYSQL_HOST}:{settings.MYSQL_PORT}/{settings.MYSQL_DATABASE}"
)

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping= True,
    pool_size= 10,
    max_overflow = 20,
)

session_local = sessionmaker(autocommit = False, autoflush = False, bind = engine)

def get_db():
    db = session_local()
    try:
        yield db
    finally:
        db.close()  