from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class MetricModel(Base):
    __tablename__ = "metrics"

    id = Column(Integer, primary_key=True, index=True)
    hostname = Column(String)
    cpu = Column(Float)
    ram = Column(Float)
    connections = Column(Integer)