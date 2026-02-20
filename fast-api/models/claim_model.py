from sqlalchemy import Column, BigInteger, Integer, Numeric
from db.base import Base

class Claim(Base):
    __tablename__ = "CLAIM"

    id = Column("CLAIM_ID", BigInteger, primary_key=True)
    patient_id = Column("PATIENT_ID", BigInteger)
    clinic_id = Column("CLINIC_ID", BigInteger)
    billed = Column("BILLED", Numeric(10, 2))
    patient_paid = Column("PATIENT_PAID", Numeric(10, 2))
    hiden = Column("HIDEN", Integer, default=0)
