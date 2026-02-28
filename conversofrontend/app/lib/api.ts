import { getToken } from "@/app/utils/authStorage";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function apiClient(
  path: string,
  options: RequestInit = {}
) {
  const token = getToken();

  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const errorJson = await res.json();
      throw new Error(errorJson.message || JSON.stringify(errorJson) || "Request failed");
    } else {
      const msg = await res.text();
      throw new Error(msg || "Request failed");
    }
  }

  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  } else {
    return res.text();
  }
}