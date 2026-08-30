from fastapi import APIRouter, File, Form, HTTPException, UploadFile

import database
from models import AnalysisResponse
from services.file_parser import InvalidResumeFileError, extract_resume_text
from services.gemini_client import analyze_resume, score_to_tier

router = APIRouter()


@router.post("/api/analyze", response_model=AnalysisResponse)
async def analyze_endpoint(
    resume: UploadFile = File(...),
    job_description: str = Form(""),
):
    jd_text = job_description.strip()
    if not jd_text:
        raise HTTPException(status_code=400, detail="Job description must not be empty.")

    content = await resume.read()
    try:
        resume_text = extract_resume_text(resume.filename, content)
    except InvalidResumeFileError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    try:
        result = analyze_resume(resume_text, jd_text)
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Gemini API call failed: {exc}") from exc

    tier = score_to_tier(result.score)
    analysis_id, created_at = database.save_analysis(
        resume_text=resume_text,
        jd_text=jd_text,
        score=result.score,
        tier=tier,
        recommendations=result.recommendations.model_dump(),
    )

    return AnalysisResponse(
        id=analysis_id,
        created_at=created_at,
        score=result.score,
        tier=tier,
        recommendations=result.recommendations,
    )
