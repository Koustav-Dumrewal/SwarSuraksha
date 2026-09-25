import uuid
import time

from fastapi import APIRouter


router = APIRouter(
    prefix="/calls",
    tags=["Calls"]
)


active_calls = {}


@router.post("/start")
async def start_call():

    call_id = str(
        uuid.uuid4()
    )

    active_calls[call_id] = {
        "started_at":
            time.time(),

        "status":
            "active"
    }

    return {
        "call_id":
            call_id,

        "status":
            "active"
    }


@router.post("/{call_id}/stop")
async def stop_call(
    call_id: str
):

    if call_id in active_calls:

        active_calls[
            call_id
        ]["status"] = "completed"

    return {
        "call_id":
            call_id,

        "status":
            "completed"
    }
