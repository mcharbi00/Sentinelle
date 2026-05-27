from fastapi import FastAPI

from app.routes.metrics import router as metrics_router

from app.models.metric import Base
from app.db.database import engine

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(metrics_router)


@app.get("/")
def root():
    return {"message": "Sentinelle backend running"}


@app.get("/health")
def health():
    return {"status": "ok"}