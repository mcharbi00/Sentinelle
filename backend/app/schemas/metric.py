from pydantic import BaseModel


class Metric(BaseModel):
    hostname: str
    cpu: float
    ram: float
    connections: int

