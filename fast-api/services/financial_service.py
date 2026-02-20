from sqlalchemy.orm import Session
from repository.financial_repository import get_financial_summary
from schemas.financial_risk_response import FinancialRiskResponse


def get_financial_risk(db: Session, clinic_id: int) -> FinancialRiskResponse:

    # 🔹 Step 1 — Get financial data from repository
    data = get_financial_summary(db, clinic_id)

    total_billed = data["total_billed"]
    total_paid = data["total_paid"]
    total_balance = data["total_balance"]

    # 🔹 Step 2 — Calculate KPIs (safe division)
    if total_billed > 0:
        collection_rate = (total_paid / total_billed) * 100
        pending_percentage = (total_balance / total_billed) * 100
    else:
        collection_rate = 0
        pending_percentage = 0

    # 🔹 Step 3 — Risk scoring
    risk_score = 0
    reasons = []

    # Collection rate rules
    if collection_rate < 50:
        risk_score += 40
        reasons.append("Very low collection rate")
    elif collection_rate < 70:
        risk_score += 25
        reasons.append("Low collection rate")
    elif collection_rate < 85:
        risk_score += 10
        reasons.append("Moderate collection rate")

    # Pending percentage rules
    if pending_percentage > 40:
        risk_score += 40
        reasons.append("High outstanding balance")
    elif pending_percentage > 25:
        risk_score += 20
        reasons.append("Moderate outstanding balance")

    # 🔹 Step 4 — Risk level
    if risk_score >= 70:
        risk_level = "CRITICAL"
    elif risk_score >= 40:
        risk_level = "HIGH"
    elif risk_score >= 20:
        risk_level = "MEDIUM"
    else:
        risk_level = "LOW"

    # 🔹 Step 5 — Return response schema
    return FinancialRiskResponse(
        risk_score=risk_score,
        risk_level=risk_level,
        collection_rate=round(collection_rate, 2),
        pending_percentage=round(pending_percentage, 2),
        reasons=reasons,
    )
