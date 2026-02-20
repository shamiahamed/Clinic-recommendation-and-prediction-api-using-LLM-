from sqlalchemy.orm import Session
from models.claim_model import Claim
from models.payment_model import Payment    
from models.patient_model import Patient
from sqlalchemy import select, and_, func

def get_financial_summary(db: Session, clinic_id: int):
    claim_subq = (
        select(
            Claim.patient_id.label("patient_id"),
            Claim.clinic_id.label("clinic_id"),
            func.sum(Claim.billed).label("billed_total"),
            func.sum(Claim.patient_paid).label("applied_total"),
        )
        .where(Claim.hiden == 0)
        .group_by(Claim.patient_id, Claim.clinic_id)
        .subquery()
    )

    payment_subq = (
        select(
            Payment.payer_id.label("patient_id"),
            Payment.clinic_id.label("clinic_id"),
            func.sum(Payment.unapplied_amt).label("unapplied_total"),
        )
        .where(
            and_(
                Payment.payer_type == 2,
                Payment.mark_as_delete == 0,
            )
        )
        .group_by(Payment.payer_id, Payment.clinic_id)
        .subquery()
    )

    result_query = (
        select(
            func.coalesce(func.sum(claim_subq.c.billed_total), 0).label("total_billed"),
            func.coalesce(
                func.sum(
                    func.coalesce(claim_subq.c.applied_total, 0)
                    + func.coalesce(payment_subq.c.unapplied_total, 0)
                ),
                0,
            ).label("total_paid"),
            func.coalesce(func.sum(Patient.net_balance), 0).label("total_balance"),
        )
        .select_from(Patient)
        .outerjoin(
            claim_subq,
            and_(
                claim_subq.c.patient_id == Patient.patient_id,
                claim_subq.c.clinic_id == Patient.clinic_id,
            ),
        )
        .outerjoin(
            payment_subq,
            and_(
                payment_subq.c.patient_id == Patient.patient_id,
                payment_subq.c.clinic_id == Patient.clinic_id,
            ),
        )
        .where(
            and_(
                Patient.clinic_id == clinic_id,
                Patient.active == 1,
                Patient.mark_as_delete == 0,
                Patient.bill_patient == 1,
                Patient.billing_method == 1,
                func.coalesce(Patient.primary_payer_id, 0) == 0,
            )
        )
    )

    result = db.execute(result_query).first()
    
    return {
        "total_billed": float(result.total_billed) if result else 0,
        "total_paid": float(result.total_paid) if result else 0,
        "total_balance": float(result.total_balance) if result else 0,
    }
