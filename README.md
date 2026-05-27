# Sentinelle

Plateforme de supervision réseau et système développée avec FastAPI et PostgreSQL.

## Stack

- FastAPI
- PostgreSQL
- SQLAlchemy
- Docker
- Pydantic

---

## Fonctionnalités actuelles

- API REST
- Validation des données
- Stockage PostgreSQL
- Architecture modulaire
- Filtrage des métriques par hostname
- Timestamps automatiques

---

## Lancement

### Démarrer PostgreSQL

```bash
docker compose up -d
### Lancer le Backend

```bash
uvicorn app.main:app
