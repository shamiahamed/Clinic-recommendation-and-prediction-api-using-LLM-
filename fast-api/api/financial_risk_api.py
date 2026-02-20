from services.financial_service import get_financial_risk as calculate_risk
from db.session import get_db
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from services.llm_service import test_llm

router = APIRouter()

@router.get("/financial-risk/{clinic_id}")
def get_financial_risk_api(clinic_id: int, db: Session = Depends(get_db)):
    return calculate_risk(db, clinic_id)

@router.get("/test-llm")
async def get_test_llm():
    return await test_llm()