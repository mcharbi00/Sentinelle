from fastapi import APIRouter
from app.schemas.metric import Metric
from app.models.metric import MetricModel
from app.db.database import SessionLocal

router = APIRouter()
@router.get("/metrics")
def get_metrics():

    db = SessionLocal()

    metrics = db.query(MetricModel).all()

    db.close()

    return [
        {
            "id": metric.id,
            "hostname": metric.hostname,
            "cpu": metric.cpu,
            "ram": metric.ram,
            "connections": metric.connections,
            "timestamp": metric.timestamp

        }
        for metric in metrics
    ]
@router.post("/metrics")
def receive_metrics(metric: Metric):

    db = SessionLocal()

    metric_db = MetricModel(
        hostname=metric.hostname,
        cpu=metric.cpu,
        ram=metric.ram,
        connections=metric.connections
    )

    db.add(metric_db)

    db.commit()

    db.refresh(metric_db)

    db.close()

    return {
        "message": "metrics stored in database"
    }
    
@router.get("/metrics/{hostname}")
def get_metrics_by_hostname(hostname: str):

    db = SessionLocal()

    metrics = (
        db.query(MetricModel)
        .filter(MetricModel.hostname == hostname)
        .all()
    )

    db.close()

    return [
        {
            "id": metric.id,
            "hostname": metric.hostname,
            "cpu": metric.cpu,
            "ram": metric.ram,
            "connections": metric.connections,
            "timestamp": metric.timestamp
        }
        for metric in metrics
    ]