/**
 * Authentication utilities - signin, signup, signout, and JWT token handling.
 * Integrates with Better Auth backend API.
 */

import { apiPost, setToken, removeToken, getToken } from './api';
import type { SignupRequest, SigninRequest, TokenResponse } from '../types/auth';

/**
 * User interface decoded from JWT token
 */
export interface User {
  user_id: string;
  email: string;
}

/**
 * Decode JWT token payload without validation
 * Note: This is for client-side use only. Server validates tokens.
 */
export function decodeToken(token: string): User | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = JSON.parse(atob(parts[1]));

    return {
      user_id: payload.sub || payload.user_id,
      email: payload.email,
    };
  } catch {
    return null;
  }
}

/**
 * Check if a JWT token is expired
 */
export function isTokenExpired(token: string): boolean {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return true;

    const payload = JSON.parse(atob(parts[1]));
    const exp = payload.exp;

    if (!exp) return false; // No expiration = not expired

    // exp is in seconds, Date.now() is in milliseconds
    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
}

/**
 * Get time until token expiration in milliseconds
 */
export function getTokenExpirationTime(token: string): number | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = JSON.parse(atob(parts[1]));
    const exp = payload.exp;

    if (!exp) return null;

    return exp * 1000 - Date.now();
  } catch {
    return null;
  }
}

/**
 * Sign up a new user
 */
export async function signup(credentials: SignupRequest): Promise<TokenResponse> {
  const response = await apiPost<TokenResponse>('/api/auth/sign-up', credentials);

  // Store token on successful signup
  if (response.token) {
    setToken(response.token);
  }

  return response;
}

/**
 * Sign in an existing user
 */
export async function signin(credentials: SigninRequest): Promise<TokenResponse> {
  const response = await apiPost<TokenResponse>('/api/auth/sign-in', credentials);

  // Store token on successful signin
  if (response.token) {
    setToken(response.token);
  }

  return response;
}

/**
 * Sign out the current user
 */
export async function signout(): Promise<void> {
  const token = getToken();

  // Try to call logout endpoint if token exists
  if (token) {
    try {
      await apiPost('/api/auth/logout');
    } catch {
      // Ignore errors - we'll clear the token anyway
    }
  }

  // Always clear the token locally
  removeToken();
}

/**
 * Get current user from stored token
 */
export function getCurrentUser(): User | null {
  const token = getToken();
  if (!token) return null;

  if (isTokenExpired(token)) {
    removeToken();
    return null;
  }

  return decodeToken(token);
}
