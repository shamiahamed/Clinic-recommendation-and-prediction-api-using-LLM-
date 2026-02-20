from sqlalchemy import Column, BigInteger, Integer, Numeric
from db.base import Base

class Payment(Base):
    __tablename__ = "PAYMENT"

    id = Column("PAYMENT_ID", BigInteger, primary_key=True)
    payer_id = Column("PAYER_ID", BigInteger)
    clinic_id = Column("CLINIC_ID", BigInteger)
    unapplied_amt = Column("UNAPPLIED_AMT", Numeric(10, 2))
    payer_type = Column("PAYER_TYPE", Integer)
    mark_as_delete = Column("MARK_AS_DELETE", Integer, default=0)
