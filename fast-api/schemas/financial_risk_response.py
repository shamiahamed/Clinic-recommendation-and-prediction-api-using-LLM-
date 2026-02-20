from pydantic import BaseModel
from typing import List

class FinancialRiskResponse(BaseModel):
    risk_score: int
    risk_level: str
    collection_rate: float
    pending_percentage: float
    reasons: List[str]
