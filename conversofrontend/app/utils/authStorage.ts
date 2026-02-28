export function saveAuth(auth: {
  token: string;
  tenantId: string;
  role: string;
}) {
  localStorage.setItem("token", auth.token);
  localStorage.setItem("tenantId", auth.tenantId);
  localStorage.setItem("role", auth.role);
}

export function clearAuth() {
  localStorage.clear();
}

export function getToken() {
  return localStorage.getItem("token");
}

export function getAuth() {
  const token = localStorage.getItem("token");
  const tenantId = localStorage.getItem("tenantId");
  const role = localStorage.getItem("role");
  if (token && tenantId && role) {
    return { token, tenantId, role };
  } else {
    return null;
  }}