from fastapi import APIRouter, HTTPException

from models import PingGeminiResponse
from services.gemini_client import ping_gemini

router = APIRouter()

PING_PROMPT = "Reply with a short, friendly confirmation that you received this test message."


@router.get("/api/ping-gemini", response_model=PingGeminiResponse)
def ping_gemini_endpoint():
    try:
        response_text = ping_gemini(PING_PROMPT)
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Gemini API call failed: {exc}") from exc

    return PingGeminiResponse(prompt=PING_PROMPT, response=response_text)
