/**
 * Configuration de l'API
 *
 * Ce fichier centralise toutes les configurations liées à l'API backend.
 */

// URL de base de l'API
// En développement, utilisez votre URL locale (ex: http://localhost:8000)
// En production, utilisez l'URL de votre API déployée
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3500/api/v1";

// Timeout pour les requêtes (en millisecondes)
export const API_TIMEOUT = 10000; // 10 secondes

// Configuration des headers par défaut
export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

/**
 * Construit l'URL complète pour un endpoint
 * @param endpoint - L'endpoint de l'API (ex: "/tasks" ou "tasks")
 * @returns L'URL complète
 */
export function getApiUrl(endpoint: string): string {
  // Enlève le slash initial s'il existe pour éviter les doubles slashes
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
  return `${API_BASE_URL}/${cleanEndpoint}`;
}

/**
 * Configuration pour les requêtes fetch
 */
export const fetchConfig = {
  headers: DEFAULT_HEADERS,
  // Vous pouvez ajouter d'autres options ici (credentials, mode, etc.)
};
