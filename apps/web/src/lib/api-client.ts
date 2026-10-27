/**
 * LankaDirect Production API Client
 * Connects frontend forms to the NestJS + Neon PostgreSQL backend.
 */
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  UserContract,
} from '@lankadirect/contracts';

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export const AUTH_TOKEN_KEY = 'lankadirect_token';
export const AUTH_USER_KEY = 'lankadirect_user';

export class ApiError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;
  const token = typeof window !== 'undefined' ? localStorage.getItem(AUTH_TOKEN_KEY) : null;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...((options.headers as Record<string, string>) || {}),
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMsg =
      (data && (data.message || data.error)) ||
      `Request failed with status ${response.status}`;
    const message = Array.isArray(errorMsg) ? errorMsg.join(', ') : errorMsg;
    throw new ApiError(response.status, message, data);
  }

  return data as T;
}

export async function authRegister(dto: RegisterRequest): Promise<AuthResponse> {
  const result = await request<AuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(dto),
  });
  saveAuthSession(result);
  return result;
}

export async function authLogin(dto: LoginRequest): Promise<AuthResponse> {
  const result = await request<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(dto),
  });
  saveAuthSession(result);
  return result;
}

export async function authMe(tokenOverride?: string): Promise<UserContract> {
  const headers: Record<string, string> = {};
  if (tokenOverride) {
    headers['Authorization'] = `Bearer ${tokenOverride}`;
  }
  return request<UserContract>('/auth/me', {
    method: 'GET',
    headers,
  });
}

export async function authForgotPassword(
  email: string
): Promise<{ success: boolean; message: string }> {
  return request<{ success: boolean; message: string }>('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

export function saveAuthSession(session: AuthResponse): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(AUTH_TOKEN_KEY, session.accessToken);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(session.user));
  } catch (e) {
    console.error('Failed to save auth session to localStorage', e);
  }
}

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function getStoredUser(): UserContract | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearAuthSession(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
  } catch (e) {
    console.error('Failed to clear auth session', e);
  }
}
