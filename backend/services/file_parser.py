import io
import os

from pypdf import PdfReader

ALLOWED_EXTENSIONS = {".pdf", ".md"}
MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024


class InvalidResumeFileError(ValueError):
    pass


def extract_resume_text(filename: str | None, content: bytes) -> str:
    extension = os.path.splitext(filename or "")[1].lower()
    if extension not in ALLOWED_EXTENSIONS:
        raise InvalidResumeFileError(f"Unsupported file type '{extension}'. Only .pdf and .md are supported.")

    if len(content) > MAX_FILE_SIZE_BYTES:
        raise InvalidResumeFileError("Resume file exceeds the 5MB size limit.")

    if extension == ".md":
        text = content.decode("utf-8", errors="ignore")
    else:
        reader = PdfReader(io.BytesIO(content))
        text = "\n".join(page.extract_text() or "" for page in reader.pages)

    if not text.strip():
        raise InvalidResumeFileError("Could not extract any text from the uploaded resume.")

    return text
