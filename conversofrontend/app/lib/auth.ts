import { apiClient } from "@/app/lib/api";
import { SignupRequest, LoginRequest, AuthResponse } from "./types";

export async function signup(data: SignupRequest): Promise<AuthResponse> {
  return apiClient("/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function login(data: LoginRequest): Promise<AuthResponse> {
  return apiClient("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}