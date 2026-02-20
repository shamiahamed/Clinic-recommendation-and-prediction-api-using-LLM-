from services.financial_service import get_financial_risk
from services.llm_service import generate_recommendation_cards

async def get_ai_recommendation_cards(clinic_id: int, db):
    # get_financial_risk is sync and takes (db, clinic_id)
    financial_data = get_financial_risk(db, clinic_id)

    # Convert Pydantic object to dictionary explicitly using model_dump()
    # to avoid "'FinancialRiskResponse' object is not subscriptable" errors in llm_service
    data_dict = financial_data.model_dump()
    
    cards = await generate_recommendation_cards(data_dict)
    
    priority_order = {
        "HIGH": 1,
        "MEDIUM": 2,
        "LOW": 3
    }
    
    # Sort cards by priority if the response is a list
    if isinstance(cards, list):
        try:
            cards.sort(key=lambda x: priority_order.get(x.get("priority", "LOW").upper(), 3))
        except (AttributeError, KeyError):
            pass

    return cards
