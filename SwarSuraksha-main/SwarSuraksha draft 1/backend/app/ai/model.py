class VoiceModel:

    def __init__(self):
        self.loaded = False

    def predict(
        self,
        features
    ) -> float:

        energy = features[
            "rms_energy"
        ]

        zcr = features[
            "zero_crossing_rate"
        ]

        centroid = features[
            "spectral_centroid"
        ]

        energy_score = min(
            abs(energy - 0.06) * 10,
            1.0
        )

        zcr_score = min(
            zcr * 4,
            1.0
        )

        centroid_score = min(
            centroid / 5000,
            1.0
        )

        score = (
            energy_score * 0.35 +
            zcr_score * 0.25 +
            centroid_score * 0.40
        )

        return float(
            max(
                0.0,
                min(
                    1.0,
                    score
                )
            )
        )


voice_model = VoiceModel()
