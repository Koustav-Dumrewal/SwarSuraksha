# SwarSuraksha MVP

A local-first prototype for SIH 2026 Problem Statement 26104:
AI-powered real-time detection of synthetic/AI-generated speech.

## What this MVP does

1. Browser records a short microphone window.
2. Browser uploads the window to FastAPI.
3. Backend converts audio to mono 16 kHz WAV.
4. AASIST-L is downloaded from Hugging Face on first run and used for anti-spoofing inference.
5. A rolling risk score is produced.
6. Every detection is written to a tamper-evident hash chain in SQLite.
7. Browser shows a live-style risk dashboard.

This is a prototype, not a production fraud detector. The AASIST-L checkpoint is trained on ASVspoof 2019 LA, so do not claim Indian-language robustness or production-grade accuracy until you train/evaluate on representative Indian and telephony data.

## Prerequisites

- Windows 10/11, macOS, or Linux
- Python 3.10+
- Git
- FFmpeg installed and available on PATH
- Optional NVIDIA GPU + compatible PyTorch install

## Run

### 1. Create environment

Windows PowerShell:

    py -3.10 -m venv .venv
    .\.venv\Scripts\Activate.ps1

macOS/Linux:

    python3.10 -m venv .venv
    source .venv/bin/activate

### 2. Install packages

    python -m pip install --upgrade pip
    pip install -r backend/requirements.txt

### 3. Start server

    uvicorn backend.main:app --reload

Open:

    http://127.0.0.1:8000

The first inference downloads the AASIST-L files from Hugging Face.

## Test with an audio file

    curl -X POST "http://127.0.0.1:8000/api/detect-file" -F "file=@sample.wav"

## Important prototype limitation

The UI is "live-style": it records repeated short windows and scores each window. It is not yet a carrier-grade SIP/RTP integration. For the SIH demo, this is intentional because it makes the complete detection loop demonstrable on a laptop.

## Suggested demo

1. Start the server.
2. Open the dashboard.
3. Record normal human speech for 4–6 seconds.
4. Stop and observe the risk score.
5. Play a permitted synthetic/deepfake test clip through the microphone or upload one.
6. Observe the score and audit hash.
7. Show the architecture slide and explain that the next stage replaces browser capture with a telephony/VoIP PCM stream.

## Production roadmap

- Train/fine-tune on ASVspoof 2021 DF/LA plus representative Indian-language data.
- Add telephony codecs/noise/reverberation augmentation.
- Calibrate thresholds on a held-out validation set.
- Export the final model to ONNX only after validating numerical parity.
- Replace SQLite with PostgreSQL/MongoDB and Redis for multi-call state.
- Add WebSocket/gRPC streaming.
- Add MFA/callback escalation rather than treating the model score as identity proof.
- Add privacy controls, retention policy, access control and monitoring.
