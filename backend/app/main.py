from fastapi import FastAPI

from app.routes.metrics import router as metrics_router

from app.models.metric import Base
from app.db.database import engine
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
Base.metadata.create_all(bind=engine)

app.include_router(metrics_router)


@app.get("/")
def root():
    return {"message": "Sentinelle backend running"}


@app.get("/health")
def health():
    return {"status": "ok"}