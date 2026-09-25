import hashlib
import json
import time


class AuditBlockchain:

    def __init__(self):

        self.chain = []

        self.create_genesis_block()

    def create_genesis_block(self):

        self.add_event(
            {
                "action": "GENESIS",
                "timestamp": time.time()
            }
        )

    def add_event(
        self,
        event
    ):

        previous_hash = (
            self.chain[-1]["hash"]
            if self.chain
            else "0"
        )

        payload = {
            "event": event,
            "previous_hash":
                previous_hash,
            "timestamp":
                time.time()
        }

        raw = json.dumps(
            payload,
            sort_keys=True
        ).encode()

        block_hash = hashlib.sha256(
            raw
        ).hexdigest()

        block = {
            **payload,
            "hash": block_hash
        }

        self.chain.append(block)

        return block

    def verify(self):

        for index in range(
            1,
            len(self.chain)
        ):

            current = self.chain[index]

            previous = self.chain[
                index - 1
            ]

            if (
                current["previous_hash"]
                != previous["hash"]
            ):
                return False

        return True


audit_blockchain = AuditBlockchain()
