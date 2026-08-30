from pydantic import BaseModel


class PingGeminiResponse(BaseModel):
    prompt: str
    response: str
