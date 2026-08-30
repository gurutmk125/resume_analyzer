import os

from google import genai
from google.genai import types

from models import GeminiAnalysisResult

GEMINI_MODEL = "gemini-3.6-flash"

ANALYSIS_PROMPT_TEMPLATE = """You are a resume screening assistant. Compare the resume below against the job \
description and produce a fitment analysis.

Score the resume from 0 to 100 based on how well it matches the job description's requirements.

Provide recommendations in four categories:
- missing_keywords: important terms/skills from the job description absent from the resume
- skill_gaps: skills or experience the job description requires that the resume doesn't demonstrate
- phrasing_suggestions: ways to rephrase existing resume content for stronger impact
- formatting_notes: formatting or structure issues that could hurt readability or ATS parsing

Each category should be a list of short, actionable strings. Use an empty list if there is nothing to report \
for a category.

Resume:
{resume_text}

Job Description:
{jd_text}
"""


def _get_client() -> genai.Client:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise RuntimeError("GEMINI_API_KEY is not set")
    return genai.Client(api_key=api_key)


def ping_gemini(prompt: str) -> str:
    client = _get_client()
    result = client.models.generate_content(model=GEMINI_MODEL, contents=prompt)
    return result.text


def analyze_resume(resume_text: str, jd_text: str) -> GeminiAnalysisResult:
    client = _get_client()
    prompt = ANALYSIS_PROMPT_TEMPLATE.format(resume_text=resume_text, jd_text=jd_text)

    result = client.models.generate_content(
        model=GEMINI_MODEL,
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=GeminiAnalysisResult,
        ),
    )

    if result.parsed is None:
        raise ValueError(f"Gemini response did not match the expected schema: {result.text}")

    return result.parsed


def score_to_tier(score: int) -> str:
    if score >= 80:
        return "Strong Fit"
    if score >= 50:
        return "Moderate Fit"
    return "Weak Fit"
