from pydantic import BaseModel, Field


class PingGeminiResponse(BaseModel):
    prompt: str
    response: str


class Recommendations(BaseModel):
    missing_keywords: list[str]
    skill_gaps: list[str]
    phrasing_suggestions: list[str]
    formatting_notes: list[str]


class GeminiAnalysisResult(BaseModel):
    score: int = Field(ge=0, le=100)
    recommendations: Recommendations


class AnalysisResponse(BaseModel):
    id: int
    created_at: str
    score: int
    tier: str
    recommendations: Recommendations
