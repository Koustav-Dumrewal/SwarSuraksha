def calculate_risk(
    model_probability: float,
    features: dict
):

    spectral_component = min(
        features["spectral_centroid"]
        / 5000
        * 100,
        100
    )

    prosody_component = min(
        features["zero_crossing_rate"]
        * 400,
        100
    )

    risk = (
        model_probability * 0.50
        + spectral_component * 0.30
        + prosody_component * 0.20
    )

    risk = max(
        0,
        min(
            100,
            risk
        )
    )

    if risk >= 80:
        level = "CRITICAL"

    elif risk >= 60:
        level = "HIGH"

    elif risk >= 30:
        level = "MEDIUM"

    else:
        level = "LOW"

    return {
        "score": round(
            risk,
            2
        ),
        "level": level
    }
