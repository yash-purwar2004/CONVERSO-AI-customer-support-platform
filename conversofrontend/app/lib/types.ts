export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  companyName: string;
  domain: string;
  tone: "CASUAL" | "FORMAL" | "FRIENDLY" | "PROFESSIONAL";
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  email: string;
  role: string;
  tenantId: string;
}