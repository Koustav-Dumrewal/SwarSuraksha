import numpy as np

from fastapi import APIRouter, WebSocket
from fastapi import WebSocketDisconnect

from ..ai.detector import detect_voice
from ..services.risk_engine import calculate_risk


router = APIRouter(
    tags=["Detection"]
)


@router.websocket(
    "/ws/detection"
)
async def detection_socket(
    websocket: WebSocket
):

    await websocket.accept()

    try:

        while True:

            data = await websocket.receive_bytes()

            audio = np.frombuffer(
                data,
                dtype=np.float32
            )

            if len(audio) == 0:
                continue

            detection = detect_voice(
                audio
            )

            risk = calculate_risk(
                detection[
                    "model_probability"
                ],
                detection[
                    "features"
                ]
            )

            await websocket.send_json(
                {
                    "type":
                        "risk_update",

                    "score":
                        risk["score"],

                    "level":
                        risk["level"],

                    "model_probability":
                        detection[
                            "model_probability"
                        ],

                    "features":
                        detection[
                            "features"
                        ]
                }
            )

    except WebSocketDisconnect:

        print(
            "Detection client disconnected"
        )
