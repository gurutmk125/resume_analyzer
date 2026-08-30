const API_BASE_URL = "http://localhost:8000";

export async function pingGemini() {
  const response = await fetch(`${API_BASE_URL}/api/ping-gemini`);

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.detail || `Request failed with status ${response.status}`);
  }

  return response.json();
}
