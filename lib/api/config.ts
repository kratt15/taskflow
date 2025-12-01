import axios from "axios";

/**
 * Configuration de l'API avec Axios
 */

// URL de base de l'API
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3500/api/v1";

// Timeout pour les requêtes (en millisecondes)
export const API_TIMEOUT = 10000; // 10 secondes

// Création de l'instance Axios configurée
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Intercepteur de requête pour injecter le token
api.interceptors.request.use(
  (config) => {
    // On évite l'import circulaire en lisant directement le localStorage ou via une fonction helper simple
    // Note: getToken() de @/lib/auth/token est sûr ici car il n'importe pas api config
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("taskflow_auth_token")
        : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur de réponse pour simplifier la gestion des erreurs
api.interceptors.response.use(
  (response) => {
    // On retourne directement la réponse
    return response;
  },
  (error) => {
    // Gestion centralisée des erreurs
    // On peut extraire le message d'erreur de l'API si disponible
    const message =
      error.response?.data?.message ||
      error.message ||
      "Une erreur inconnue est survenue";
    console.error("API Error:", message);

    // On propage une erreur avec un message clair
    return Promise.reject(new Error(message));
  }
);
