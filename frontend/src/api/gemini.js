import { apiFetch } from "./client";

export async function pingGemini() {
  return apiFetch("/api/ping-gemini");
}
