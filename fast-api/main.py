from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware 
from contextlib import asynccontextmanager
from core.logger import logger
from db.session import engine, get_db
from api.financial_risk_api import router as financial_risk_router
from api.ai_recommendation_api import router as ai_recommendation_router
from core.error_handling import register_exception_handlers
from sqlalchemy.orm import Session

logger.info("Application started")


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Test database connection on startup
    try:
        with engine.connect() as connection:
            pass
        logger.info("MySQL Database connection successful")
    except Exception as e:
        logger.error(f"MySQL Database connection failed: {e}")
    
    yield
    logger.info("Shutting down Application")

app = FastAPI(
    title="Finance API",
    description="API for financial analysis",
    version="0.0.1",
    lifespan=lifespan
)

register_exception_handlers(app)

async def add_header(request, call_next):
    response = await call_next(request)
    response.headers["X-Custom-Header"] = "my-app"
    return response

app.middleware("http")(add_header)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(financial_risk_router)
app.include_router(ai_recommendation_router)

@app.get("/", summary="Default")
def read_root():
    return {"message": "api is running"}
