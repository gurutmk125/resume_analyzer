import { apiFetch } from "./client";

export async function analyzeResume(resumeFile, jobDescription) {
  const formData = new FormData();
  formData.append("resume", resumeFile);
  formData.append("job_description", jobDescription);

  return apiFetch("/api/analyze", {
    method: "POST",
    body: formData,
  });
}

export async function listAnalyses() {
  return apiFetch("/api/analyses");
}

export async function getAnalysis(id) {
  return apiFetch(`/api/analyses/${id}`);
}
