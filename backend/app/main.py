from fastapi import FastAPI
from app.schemas.metric import Metric
from app.models.metric import Base
from app.db.database import engine
app = FastAPI()
Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {"message": "Sentinel backend running"}

@app.get("/health")
def health():
    return {"status": "ok"}
@app.get("/test")
def test():
    return {
        "message": "hello",
        "value": 42,
        "online": True
    }
@app.post("/metrics")
def receive_metrics(metric: Metric):
    return {
        "message": "metrics received",
        "data": metric
    }