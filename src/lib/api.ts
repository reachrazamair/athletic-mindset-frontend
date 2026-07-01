/**
 * API — Simple fetch wrapper for talking to the backend.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const TOKEN_KEY = "token";
const USER_KEY = "user";

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

interface RequestExtras {
  /** Skip the redirect-to-login on a 401 (used for silent/background checks). */
  suppressAuthRedirect?: boolean;
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  extras: RequestExtras = {},
): Promise<ApiResponse<T>> {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;

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
      // A 401 on a request we authenticated means our token was rejected or
      // expired — end the session. (A 401 with no token is just a normal auth
      // failure, e.g. wrong password on login, so we leave it alone.)
      if (res.status === 401 && token && typeof window !== "undefined") {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        // Let the app (navbar, etc.) react immediately.
        window.dispatchEvent(new Event("auth:expired"));
        // Bounce to login unless this was a background check or we're already there.
        if (!extras.suppressAuthRedirect && !window.location.pathname.startsWith("/login")) {
          window.location.assign("/login?expired=1");
        }
        return { error: "Your session has expired. Please sign in again." };
      }
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

export interface AthleteProfile {
  birth_date: string | null;
  sex: string | null;
  ethnicity: string | null;
  primary_sport: string | null;
  competition_level: string | null;
  position: string | null;
}

export interface User {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  is_active: boolean;
  is_verified: boolean;
  roles: UserRole[];
  athlete_profile: AthleteProfile | null;
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

export async function register(
  email: string,
  password: string,
  firstName?: string,
  lastName?: string,
): Promise<ApiResponse<AuthResponse>> {
  return request<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      first_name: firstName || null,
      last_name: lastName || null,
    }),
  });
}

export async function setRole(role: string): Promise<ApiResponse<User>> {
  return request<User>("/auth/set-role", {
    method: "POST",
    body: JSON.stringify({ role }),
  });
}

export async function getMe(): Promise<ApiResponse<User>> {
  // Used for silent session restore + background polling — never force a redirect.
  return request<User>("/auth/me", {}, { suppressAuthRedirect: true });
}

export interface MessageResponse {
  message: string;
}

export async function forgotPassword(email: string): Promise<ApiResponse<MessageResponse>> {
  return request<MessageResponse>("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function resetPassword(
  token: string,
  newPassword: string,
): Promise<ApiResponse<MessageResponse>> {
  return request<MessageResponse>("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({ token, new_password: newPassword }),
  });
}

export async function verifyEmail(token: string): Promise<ApiResponse<AuthResponse>> {
  return request<AuthResponse>("/auth/verify-email", {
    method: "POST",
    body: JSON.stringify({ token }),
  });
}

export async function resendVerification(): Promise<ApiResponse<MessageResponse>> {
  return request<MessageResponse>("/auth/resend-verification", {
    method: "POST",
  });
}

export async function updateProfile(
  firstName: string,
  lastName: string,
): Promise<ApiResponse<User>> {
  return request<User>("/auth/me", {
    method: "PATCH",
    body: JSON.stringify({ first_name: firstName, last_name: lastName }),
  });
}

export async function changePassword(
  currentPassword: string,
  newPassword: string,
): Promise<ApiResponse<MessageResponse>> {
  return request<MessageResponse>("/auth/change-password", {
    method: "POST",
    body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
  });
}

export async function getProfile(): Promise<ApiResponse<AthleteProfile>> {
  return request<AthleteProfile>("/profile");
}

export async function updateAthleteProfile(
  profile: Partial<AthleteProfile>,
): Promise<ApiResponse<AthleteProfile>> {
  return request<AthleteProfile>("/profile", {
    method: "PUT",
    body: JSON.stringify(profile),
  });
}
