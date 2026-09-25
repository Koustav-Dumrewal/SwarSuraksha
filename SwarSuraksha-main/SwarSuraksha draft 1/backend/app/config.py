import os


APP_NAME = "SwarSuraksha"

HOST = os.getenv(
    "HOST",
    "0.0.0.0"
)

PORT = int(
    os.getenv(
        "PORT",
        "8000"
    )
)

RISK_HIGH_THRESHOLD = 60

RISK_CRITICAL_THRESHOLD = 80
