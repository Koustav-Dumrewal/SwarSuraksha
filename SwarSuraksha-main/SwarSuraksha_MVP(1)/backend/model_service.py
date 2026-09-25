import sys
from pathlib import Path
from typing import Tuple

import numpy as np
import torch
import torchaudio
from huggingface_hub import snapshot_download


MODEL_DIR = Path(__file__).resolve().parent.parent / "models" / "aasist_l"
HF_REPO = "SpeechAntiSpoofingBenchmarks/AASIST-L"
TARGET_SAMPLES = 64600
SAMPLE_RATE = 16000

_model = None
_device = torch.device("cuda" if torch.cuda.is_available() else "cpu")


def _ensure_model_files() -> Path:
    MODEL_DIR.mkdir(parents=True, exist_ok=True)
    snapshot_download(
        repo_id=HF_REPO,
        local_dir=str(MODEL_DIR),
        allow_patterns=["*.py", "*.pth", "*.yaml", "*.md", "*.json"],
    )
    return MODEL_DIR


def _load_model():
    global _model

    if _model is not None:
        return _model

    model_dir = _ensure_model_files()
    sys.path.insert(0, str(model_dir))

    from aasist_l import AASIST_L

    model = AASIST_L()
    model.load()
    model.eval()
    model.to(_device)
    _model = model
    return _model


def load_audio(path: str) -> torch.Tensor:
    waveform, sr = torchaudio.load(path)

    if waveform.ndim == 2:
        waveform = waveform.mean(dim=0)

    waveform = waveform.float()

    if sr != SAMPLE_RATE:
        waveform = torchaudio.functional.resample(
            waveform.unsqueeze(0), sr, SAMPLE_RATE
        ).squeeze(0)

    return waveform


def prepare_window(waveform: torch.Tensor) -> torch.Tensor:
    waveform = waveform.flatten()

    if waveform.numel() == 0:
        raise ValueError("Audio contains no samples.")

    # AASIST-L evaluation uses a fixed 64600-sample window.
    if waveform.numel() >= TARGET_SAMPLES:
        waveform = waveform[:TARGET_SAMPLES]
    else:
        repeats = TARGET_SAMPLES // waveform.numel() + 1
        waveform = waveform.repeat(repeats)[:TARGET_SAMPLES]

    return waveform


def sigmoid(x: float) -> float:
    return 1.0 / (1.0 + np.exp(-x))


def score_audio(path: str) -> Tuple[float, float, str]:
    model = _load_model()
    waveform = load_audio(path)
    window = prepare_window(waveform)

    # The AASIST-L wrapper returns a bona-fide score; higher means more bona fide.
    with torch.inference_mode():
        scores = model.score_batch([window.cpu().numpy()], [SAMPLE_RATE])

    bona_fide_score = float(scores[0])

    # Do NOT present this as a calibrated probability.
    # This is a demo risk mapping for UI purposes only.
    spoof_risk = float(1.0 - sigmoid(bona_fide_score))

    if spoof_risk >= 0.70:
        label = "HIGH_RISK"
    elif spoof_risk >= 0.40:
        label = "REVIEW"
    else:
        label = "LOW_RISK"

    return bona_fide_score, spoof_risk, label
