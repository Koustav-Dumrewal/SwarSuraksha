import hashlib
import json
import sqlite3
from datetime import datetime, timezone
from pathlib import Path

DB_PATH = Path(__file__).resolve().parent / "swar_suraksha.db"


def _connect():
    conn = sqlite3.connect(DB_PATH)
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS audit_events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            created_at TEXT NOT NULL,
            label TEXT NOT NULL,
            risk REAL NOT NULL,
            model_score REAL NOT NULL,
            previous_hash TEXT NOT NULL,
            event_hash TEXT NOT NULL
        )
        """
    )
    conn.commit()
    return conn


def record_event(label: str, risk: float, model_score: float) -> dict:
    conn = _connect()

    row = conn.execute(
        "SELECT event_hash FROM audit_events ORDER BY id DESC LIMIT 1"
    ).fetchone()

    previous_hash = row[0] if row else "GENESIS"

    created_at = datetime.now(timezone.utc).isoformat()

    payload = {
        "created_at": created_at,
        "label": label,
        "risk": round(risk, 8),
        "model_score": round(model_score, 8),
        "previous_hash": previous_hash,
    }

    canonical = json.dumps(payload, sort_keys=True, separators=(",", ":"))
    event_hash = hashlib.sha256(canonical.encode("utf-8")).hexdigest()

    conn.execute(
        """
        INSERT INTO audit_events
        (created_at, label, risk, model_score, previous_hash, event_hash)
        VALUES (?, ?, ?, ?, ?, ?)
        """,
        (
            created_at,
            label,
            risk,
            model_score,
            previous_hash,
            event_hash,
        ),
    )
    conn.commit()
    event_id = conn.execute("SELECT last_insert_rowid()").fetchone()[0]
    conn.close()

    return {
        "id": event_id,
        "created_at": created_at,
        "label": label,
        "risk": risk,
        "model_score": model_score,
        "previous_hash": previous_hash,
        "event_hash": event_hash,
    }


def recent_events(limit: int = 50):
    conn = _connect()
    rows = conn.execute(
        """
        SELECT id, created_at, label, risk, model_score,
               previous_hash, event_hash
        FROM audit_events
        ORDER BY id DESC
        LIMIT ?
        """,
        (limit,),
    ).fetchall()
    conn.close()

    keys = [
        "id",
        "created_at",
        "label",
        "risk",
        "model_score",
        "previous_hash",
        "event_hash",
    ]

    return [dict(zip(keys, row)) for row in rows]
