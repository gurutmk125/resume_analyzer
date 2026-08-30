import os

from google import genai

GEMINI_MODEL = "gemini-3.6-flash"


def ping_gemini(prompt: str) -> str:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise RuntimeError("GEMINI_API_KEY is not set")

    client = genai.Client(api_key=api_key)
    result = client.models.generate_content(model=GEMINI_MODEL, contents=prompt)
    return result.text
