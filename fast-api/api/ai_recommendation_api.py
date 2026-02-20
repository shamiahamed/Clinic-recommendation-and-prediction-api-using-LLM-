from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.session import get_db
from schemas.ai_response_schema import AIResponseSchema
from services.ai_dashboard_service import get_ai_recommendation_cards

router = APIRouter()

@router.get("/ai-recommendation/{clinic_id}", response_model=list[AIResponseSchema])
async def get_ai_recommendation_api(clinic_id: int, db: Session = Depends(get_db)):
    return await get_ai_recommendation_cards(clinic_id, db)