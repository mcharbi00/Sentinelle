from fastapi import APIRouter
from app.schemas.metric import Metric

router = APIRouter() 
metrics_storage = []

@router.post("/metrics")
def receive_metrics(metric: Metric):
    metrics_storage.append(metric.dict())

    return {
        "message": "metrics received",
        "data": metric
    }
@router.get("/metrics")
def get_metrics():
    return {
        "metrics": metrics_storage
    }