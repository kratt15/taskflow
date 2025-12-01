const TOKEN_KEY = "taskflow_auth_token";

/**
 * Stocke le token d'authentification
 */
export function setToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

/**
 * Récupère le token d'authentification
 */
export function getToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
}

/**
 * Supprime le token d'authentification
 */
export function removeToken(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
  }
}

/**
 * Vérifie si un token est présent (vérification basique)
 * Note: Une vraie vérification devrait décoder le JWT pour vérifier l'expiration
 */
export function hasToken(): boolean {
  return !!getToken();
}
