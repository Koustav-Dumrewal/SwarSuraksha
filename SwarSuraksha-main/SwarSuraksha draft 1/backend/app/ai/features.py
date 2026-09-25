import numpy as np


def rms_energy(audio: np.ndarray) -> float:
    if len(audio) == 0:
        return 0.0

    return float(
        np.sqrt(
            np.mean(
                np.square(audio)
            )
        )
    )


def zero_crossing_rate(
    audio: np.ndarray
) -> float:

    if len(audio) < 2:
        return 0.0

    crossings = np.sum(
        np.abs(
            np.diff(
                np.sign(audio)
            )
        ) > 0
    )

    return float(
        crossings / len(audio)
    )


def spectral_centroid(
    audio: np.ndarray,
    sample_rate: int
) -> float:

    if len(audio) == 0:
        return 0.0

    spectrum = np.abs(
        np.fft.rfft(audio)
    )

    frequencies = np.fft.rfftfreq(
        len(audio),
        1 / sample_rate
    )

    total = np.sum(spectrum)

    if total == 0:
        return 0.0

    return float(
        np.sum(
            frequencies * spectrum
        ) / total
    )


def extract_features(
    audio: np.ndarray,
    sample_rate: int
):

    energy = rms_energy(audio)

    zcr = zero_crossing_rate(audio)

    centroid = spectral_centroid(
        audio,
        sample_rate
    )

    return {
        "rms_energy": energy,
        "zero_crossing_rate": zcr,
        "spectral_centroid": centroid
    }
