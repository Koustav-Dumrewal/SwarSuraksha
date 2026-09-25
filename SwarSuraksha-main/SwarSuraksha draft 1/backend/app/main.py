from fastapi import FastAPI

from .config import (
    APP_NAME
)

from .api.calls import router as calls_router
from .api.detection import router as detection_router
from .api.alerts import router as alerts_router
from .api.verification import router as verification_router


app = FastAPI(
    title=APP_NAME,
    version="1.0.0"
)


app.include_router(
    calls_router
)

app.include_router(
    detection_router
)

app.include_router(
    alerts_router
)

app.include_router(
    verification_router
)


@app.get("/health")
async def health():

    return {
        "status": "ok",
        "service": APP_NAME,
        "version": "1.0.0"
    }


@app.get("/")
async def root():

    return {
        "message":
            "SwarSuraksha API is running"
    }
