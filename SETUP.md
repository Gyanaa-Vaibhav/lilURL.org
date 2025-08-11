# lilUrl – Setup Guide

This guide walks you through setting up the lilUrl API locally or in production using Docker Compose.

---

## Requirements

- Docker & Docker Compose (v2+)
- `.env` files (samples provided)

---

## Environment Setup

### 1. Root `.env` (used by Docker Compose)

Create a `.env` file in the root directory based on `.env.sample`:

```env
FRONTEND_PORT=XXXX# Should be same as PORT in ./Frontend
BACKEND_PORT=XXXX
FRONTEND_ENV=/path/to/frontend/env
BACKEND_ENV=/path/to/backend/env
```
These values are used to:
- Bind ports from containers

---

2. Backend .env
   Inside Backend/:

```env
DB_HOSTNAME=ANY
DB_USER=ANY
DB_NAME=ANY
DB_PASSWORD=ANY
DB_PORT=ANY


GOOGLE_CLIENT_ID=ID
GOOGLE_CLIENT_SECRET=ID
GOOGLE_CLIENT_CALLBACK=ID

ACCESS_TOKEN=ANY
REFRESH_TOKEN=ANY
```

---

3. Frontend .env

Inside Frontend/ (renamed from Frontend):
```env
PORT=XXXX # Should be same as the FRONTEND_PORT
VITE_SERVER=http://localhost:XXXX(Backend Port) if in development
```

---

## Local Development

Use the included docker-compose.yml for development. It mounts local code for hot reloading.

1. Setup .env files (as above)

2. Place Geo DB Files
    - Download MaxMind GeoLite2 .mmdb and/or IP2Location LITE .bin files
    - Place them anywhere and update BACKEND_FILE_LOCATION path in root .env
    - Example: ./Backend/mainFiles

3. Run Containers
  ```bash
  docker compose --env-file .env up --build
  ```
- This starts:
  - backend — IPWho API (with TypeScript + --watch)
  - frontend — React/Vite + Astro frontend
  - redis — caching layer

4. Hot Reload :
    - Frontend: Vite/React auto reload
    - Backend: Uses node --watch (nodemon not needed)

5. Logs: All logs go to the folder specified in BACKEND_LOGS_LOCATION.

---

## Production Deployment

Use docker-compose-prod.yml for a production-optimized build:
```bash
docker compose -f docker-compose-prod.yml --env-file=./.env up --build -d
```

Key differences :
- Frontend is prebuilt and served statically
- No volume mounts — containers are standalone
- PSQL password + port configurable from .env

Optional: Add NGINX or HTTPS termination as needed (not included).

---

### Volumes & Data :
- PSQL data is persisted to Docker volume: pgData-lilURL
- Redis data is persisted to Docker volume: lilURL-redis-data
- Logs and DB paths are bind-mounted from host based on .env paths
- You can delete all containers & volumes via:

```bash
docker compose down -v
```

---

### Debugging Tips :
- Backend or frontend container fails? Check .env paths first
- PSQL connection errors?  Check port/password match between .env and services  
- Redis connection errors? Check port/password match between .env and services

---

## Cleanup

Stop and remove containers + volumes
```bash
docker compose down -v
```

Remove dangling images
```bash
docker image prune -f
```