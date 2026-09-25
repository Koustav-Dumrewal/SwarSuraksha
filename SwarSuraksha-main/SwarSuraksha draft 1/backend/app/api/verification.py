from fastapi import APIRouter
from pydantic import BaseModel

from ..services.blockchain import (
    audit_blockchain
)


router = APIRouter(
    prefix="/verification",
    tags=["Verification"]
)


class VerificationRequest(
    BaseModel
):

    call_id: str


def execute_action(
    call_id,
    action
):

    block = audit_blockchain.add_event(
        {
            "action": action,
            "call_id": call_id
        }
    )

    return {
        "message":
            f"{action.upper()} verification triggered",

        "audit_hash":
            block["hash"]
    }


@router.post("/mfa")
async def mfa(
    request: VerificationRequest
):

    return execute_action(
        request.call_id,
        "MFA"
    )


@router.post("/callback")
async def callback(
    request: VerificationRequest
):

    return execute_action(
        request.call_id,
        "CALLBACK"
    )


@router.post("/supervisor")
async def supervisor(
    request: VerificationRequest
):

    return execute_action(
        request.call_id,
        "SUPERVISOR_ESCALATION"
    )
