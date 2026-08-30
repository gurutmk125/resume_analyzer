import json
import os
import sqlite3
from contextlib import contextmanager
from datetime import datetime, timezone

DB_PATH = os.path.join(os.path.dirname(__file__), "..", "resume_analyzer.db")


@contextmanager
def get_connection():
    conn = sqlite3.connect(DB_PATH)
    try:
        yield conn
    finally:
        conn.close()


def init_db():
    with get_connection() as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS analyses (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                created_at TEXT NOT NULL,
                resume_text TEXT NOT NULL,
                jd_text TEXT NOT NULL,
                score INTEGER NOT NULL,
                tier TEXT NOT NULL,
                recommendations TEXT NOT NULL
            )
            """
        )
        conn.commit()


def save_analysis(resume_text: str, jd_text: str, score: int, tier: str, recommendations: dict) -> tuple[int, str]:
    created_at = datetime.now(timezone.utc).isoformat()
    with get_connection() as conn:
        cursor = conn.execute(
            """
            INSERT INTO analyses (created_at, resume_text, jd_text, score, tier, recommendations)
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (created_at, resume_text, jd_text, score, tier, json.dumps(recommendations)),
        )
        conn.commit()
        return cursor.lastrowid, created_at
