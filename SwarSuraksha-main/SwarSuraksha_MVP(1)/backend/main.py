from pathlib import Path
from tempfile import NamedTemporaryFile

from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from .audit import recent_events, record_event
from .model_service import score_audio


ROOT = Path(__file__).resolve().parent.parent
FRONTEND = ROOT / "frontend"

app = FastAPI(
    title="SwarSuraksha",
    description="Prototype AI voice anti-spoofing service",
    version="0.1.0",
)

app.mount("/static", StaticFiles(directory=FRONTEND), name="static")


@app.get("/")
def index():
    return FileResponse(FRONTEND / "index.html")


@app.get("/api/health")
def health():
    return {
        "status": "ok",
        "service": "SwarSuraksha",
        "model": "AASIST-L",
    }


@app.get("/api/audit")
def audit():
    return {"events": recent_events()}


@app.post("/api/detect-file")
async def detect_file(file: UploadFile = File(...)):
    suffix = Path(file.filename or ".wav").suffix or ".wav"

    data = await file.read()

    with NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
        tmp.write(data)
        tmp_path = tmp.name

    try:
        model_score, risk, label = score_audio(tmp_path)
        event = record_event(label, risk, model_score)

        return {
            "label": label,
            "risk": risk,
            "model_score": model_score,
            "audit": event,
        }
    finally:
        Path(tmp_path).unlink(missing_ok=True)
