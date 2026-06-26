/**
 * API — Simple fetch wrapper for talking to the backend.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });

    const body = await res.json();

    if (!res.ok) {
      return { error: body.detail || "Something went wrong" };
    }

    return { data: body as T };
  } catch {
    return { error: "Network error — is the server running?" };
  }
}

// --- Auth endpoints ---

export interface UserRole {
  role: string;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  is_active: boolean;
  is_verified: boolean;
  roles: UserRole[];
  created_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export async function login(email: string, password: string): Promise<ApiResponse<AuthResponse>> {
  return request<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function register(email: string, password: string): Promise<ApiResponse<AuthResponse>> {
  return request<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function setRole(role: string): Promise<ApiResponse<User>> {
  return request<User>("/auth/set-role", {
    method: "POST",
    body: JSON.stringify({ role }),
  });
}

export async function getMe(): Promise<ApiResponse<User>> {
  return request<User>("/auth/me");
}
