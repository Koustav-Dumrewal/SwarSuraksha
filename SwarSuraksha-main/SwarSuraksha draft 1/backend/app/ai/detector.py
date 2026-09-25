import numpy as np

from .features import extract_features
from .model import voice_model


SAMPLE_RATE = 16000


def detect_voice(
    audio: np.ndarray
):

    features = extract_features(
        audio,
        SAMPLE_RATE
    )

    probability = (
        voice_model.predict(
            features
        )
        * 100
    )

    return {
        "model_probability": probability,
        "features": features
    }
