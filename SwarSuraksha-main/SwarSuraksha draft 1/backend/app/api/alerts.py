from fastapi import APIRouter

from ..services.blockchain import (
    audit_blockchain
)


router = APIRouter(
    prefix="/alerts",
    tags=["Alerts"]
)


@router.get("/audit")
async def audit():

    return {
        "verified":
            audit_blockchain.verify(),

        "events":
            audit_blockchain.chain
    }
