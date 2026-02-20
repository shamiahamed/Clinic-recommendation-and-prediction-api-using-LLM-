from sqlalchemy import Column, BigInteger, Integer, Numeric
from db.base import Base

class Patient(Base):
    __tablename__ = "PATIENT"

    id = Column("ID", BigInteger, primary_key=True)
    patient_id = Column("PATIENT_ID", BigInteger)
    clinic_id = Column("CLINIC_ID", BigInteger)
    net_balance = Column("NET_BALANCE", Numeric(10, 2))
    active = Column("ACTIVE", Integer, default=1)
    mark_as_delete = Column("MARK_AS_DELETE", Integer, default=0)
    bill_patient = Column("BILL_PATIENT", Integer, default=1)
    billing_method = Column("BILLING_METHOD", Integer, default=1)
    primary_payer_id = Column("PRIMARY_PAYER_ID", BigInteger)
