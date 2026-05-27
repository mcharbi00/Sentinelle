from fastapi import APIRouter
from app.schemas.metric import Metric
from app.models.metric import MetricModel
from app.db.database import SessionLocal
from sqlalchemy import func
from datetime import datetime, timezone

router = APIRouter()
@router.get("/metrics")
def get_metrics():

    db = SessionLocal()

    metrics = (
        db.query(MetricModel)
        .order_by(MetricModel.timestamp.desc())
        .limit(100)
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
        .order_by(MetricModel.timestamp.asc())
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
@router.get("/latest-metrics")
def get_latest_metrics():

    db = SessionLocal()


    subquery = (

        db.query(

            MetricModel.hostname,

            func.max(MetricModel.timestamp).label("latest_timestamp")

        )

        .group_by(MetricModel.hostname)

        .subquery()

    )


    metrics = (

        db.query(MetricModel)

        .join(

            subquery,

            (MetricModel.hostname == subquery.c.hostname)

            &

            (MetricModel.timestamp == subquery.c.latest_timestamp)

        )

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
            "timestamp": metric.timestamp,
            "status": (
            "online"
            if (datetime.utcnow() - metric.timestamp).seconds < 15
            else "offline"
            )
    
        }

        for metric in metrics

    ]