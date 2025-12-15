import { AxiosError } from "axios";

/**
 * Interface pour les erreurs de validation de l'API
 */
interface ValidationError {
  field: string;
  message: string;
  rule?: string;
}

interface ApiErrorResponse {
  message?: string;
  errors?: ValidationError[];
  status?: number;
}

/**
 * Messages d'erreur par code HTTP
 */
const HTTP_ERROR_MESSAGES: Record<number, string> = {
  400: "Les données fournies sont invalides. Veuillez vérifier votre saisie.",
  401: "Vous devez vous connecter pour effectuer cette action.",
  403: "Vous n'avez pas les permissions nécessaires pour effectuer cette action.",
  404: "La ressource demandée est introuvable.",
  409: "Cette ressource existe déjà ou un conflit a été détecté.",
  422: "Les données fournies ne sont pas valides.",
  429: "Trop de requêtes. Veuillez patienter quelques instants.",
  500: "Une erreur serveur est survenue. Veuillez réessayer dans quelques instants.",
  502: "Le serveur est temporairement indisponible. Veuillez réessayer.",
  503: "Le service est temporairement indisponible. Veuillez réessayer plus tard.",
};

/**
 * Messages d'erreur de validation personnalisés
 */
const VALIDATION_RULE_MESSAGES: Record<string, string> = {
  required: "Ce champ est obligatoire",
  email: "L'adresse email n'est pas valide",
  minLength: "La valeur est trop courte",
  maxLength: "La valeur est trop longue",
  unique: "Cette valeur existe déjà",
  exists: "Cette ressource n'existe pas",
  min: "La valeur est trop petite",
  max: "La valeur est trop grande",
};

/**
 * Formate les erreurs de validation en message lisible
 */
function formatValidationErrors(errors: ValidationError[]): string {
  if (errors.length === 0) {
    return "Les données fournies ne sont pas valides.";
  }

  if (errors.length === 1) {
    const error = errors[0];
    const fieldName = formatFieldName(error.field);
    const message = getValidationMessage(error);
    return `${fieldName} : ${message}`;
  }

  // Plusieurs erreurs
  const errorList = errors
    .map((error) => {
      const fieldName = formatFieldName(error.field);
      const message = getValidationMessage(error);
      return `• ${fieldName} : ${message}`;
    })
    .join("\n");

  return `Erreurs de validation :\n${errorList}`;
}

/**
 * Récupère le message d'erreur approprié pour une erreur de validation
 * Utilise le message de l'API s'il existe, sinon utilise le message par défaut basé sur la règle
 */
function getValidationMessage(error: ValidationError): string {
  // Si l'API fournit un message, on l'utilise
  if (error.message) {
    return error.message;
  }

  // Sinon, on utilise le message par défaut basé sur la règle de validation
  if (error.rule && VALIDATION_RULE_MESSAGES[error.rule]) {
    return VALIDATION_RULE_MESSAGES[error.rule];
  }

  // Message générique si aucune règle n'est reconnue
  return "La valeur n'est pas valide";
}

/**
 * Formate le nom d'un champ pour l'affichage
 */
function formatFieldName(field: string): string {
  const fieldNames: Record<string, string> = {
    title: "Titre",
    name: "Nom",
    description: "Description",
    email: "Email",
    password: "Mot de passe",
    status: "Statut",
    level: "Priorité",
    categoryId: "Catégorie",
  };

  return fieldNames[field] || field;
}

/**
 * Extrait et formate le message d'erreur d'une erreur API
 */
export function formatApiError(error: unknown): string {
  // Erreur Axios
  if (error && typeof error === "object" && "isAxiosError" in error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;

    // Erreur de réponse du serveur
    if (axiosError.response) {
      const { status, data } = axiosError.response;

      // Erreurs de validation avec détails
      if (
        data?.errors &&
        Array.isArray(data.errors) &&
        data.errors.length > 0
      ) {
        return formatValidationErrors(data.errors);
      }

      // Message personnalisé de l'API
      if (data?.message) {
        return data.message;
      }

      // Message par défaut selon le code HTTP
      if (status && HTTP_ERROR_MESSAGES[status]) {
        return HTTP_ERROR_MESSAGES[status];
      }

      return `Erreur ${status} : Une erreur est survenue.`;
    }

    // Erreur de requête (pas de réponse du serveur)
    if (axiosError.request) {
      return "Impossible de contacter le serveur. Vérifiez votre connexion internet.";
    }

    // Erreur lors de la configuration de la requête
    if (axiosError.message) {
      return `Erreur de configuration : ${axiosError.message}`;
    }
  }

  // Erreur JavaScript standard
  if (error instanceof Error) {
    return error.message;
  }

  // Erreur inconnue
  return "Une erreur inconnue est survenue. Veuillez réessayer.";
}

/**
 * Vérifie si une erreur est une erreur d'authentification
 */
export function isAuthError(error: unknown): boolean {
  if (error && typeof error === "object" && "isAxiosError" in error) {
    const axiosError = error as AxiosError;
    return axiosError.response?.status === 401;
  }
  return false;
}

/**
 * Vérifie si une erreur est une erreur de permission
 */
export function isPermissionError(error: unknown): boolean {
  if (error && typeof error === "object" && "isAxiosError" in error) {
    const axiosError = error as AxiosError;
    return axiosError.response?.status === 403;
  }
  return false;
}

/**
 * Vérifie si une erreur est une erreur de ressource introuvable
 */
export function isNotFoundError(error: unknown): boolean {
  if (error && typeof error === "object" && "isAxiosError" in error) {
    const axiosError = error as AxiosError;
    return axiosError.response?.status === 404;
  }
  return false;
}
