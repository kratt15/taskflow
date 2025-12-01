import { api } from "@/lib/api/config";
import {
  LoginDto,
  RegisterDto,
  AuthResponseDto,
  UserResponseDto,
} from "@/types/user";
import { setToken, removeToken, getToken } from "@/lib/auth/token";

/**
 * Connecte un utilisateur
 */
export async function login(credentials: LoginDto): Promise<AuthResponseDto> {
  const response = await api.post<AuthResponseDto>("/auth/login", credentials);
  const { token } = response.data;
  setToken(token);
  return response.data;
}

/**
 * Inscrit un nouvel utilisateur
 */
export async function register(data: RegisterDto): Promise<AuthResponseDto> {
  const response = await api.post<AuthResponseDto>("/auth/register", data);
  const { token } = response.data;
  setToken(token);
  return response.data;
}

/**
 * Déconnecte l'utilisateur
 */
export function logout(): void {
  removeToken();
  // Optionnel : appeler l'API pour invalider le token côté serveur si nécessaire
}

/**
 * Récupère l'utilisateur actuellement connecté
 */
export async function getCurrentUser(): Promise<UserResponseDto> {
  const token = getToken();
  if (!token) {
    throw new Error("Non authentifié");
  }

  // Ajout manuel du header Authorization pour cette requête spécifique
  // Idéalement, cela devrait être géré par un intercepteur Axios
  const response = await api.get<UserResponseDto>("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
