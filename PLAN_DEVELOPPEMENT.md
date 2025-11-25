# Plan de Développement - Application de Gestion de Tâches (TaskFlow)

## 📋 Vue d'ensemble

Ce document décrit le plan étape par étape pour développer une application frontend Next.js complète qui exploite votre API de gestion de tâches, en utilisant DaisyUI pour l'interface utilisateur.

---

## 🎯 Objectifs

1. Créer une interface utilisateur moderne et fonctionnelle avec DaisyUI
2. Intégrer votre API de gestion de tâches
3. Respecter les bonnes pratiques de développement Next.js
4. Implémenter toutes les fonctionnalités CRUD (Create, Read, Update, Delete)
5. Gérer les états de chargement et les erreurs
6. Optimiser l'expérience utilisateur

---

## 📦 Phase 1 : Configuration et Structure de Base

### Étape 1.1 : Configuration de l'environnement

- [ ] Créer un fichier `.env.local` pour stocker l'URL de l'API
- [ ] Configurer DaisyUI dans `tailwind.config.js` (thème, options)
- [ ] Vérifier que Tailwind CSS est correctement configuré

### Étape 1.2 : Structure des dossiers

- [ ] Créer le dossier `lib/` pour les utilitaires
- [ ] Créer le dossier `components/` pour les composants réutilisables
- [ ] Créer le dossier `types/` pour les définitions TypeScript
- [ ] Créer le dossier `app/api/` si nécessaire (pour les routes API Next.js)

### Étape 1.3 : Configuration de base

- [ ] Mettre à jour les métadonnées dans `layout.tsx`
- [ ] Configurer le thème DaisyUI (couleurs, mode sombre)
- [ ] Créer un fichier de configuration pour l'API

---

## 🔧 Phase 2 : Définitions TypeScript et Configuration API

### Étape 2.1 : Types TypeScript

- [x] Les types `types/user.ts` existent déjà (User, LoginDto, RegisterDto, AuthResponseDto)
- [x] Les types `types/task.ts` existent déjà (Task, CreateTaskDto, UpdateTaskDto, etc.)
- [ ] Vérifier que tous les types nécessaires sont présents

### Étape 2.2 : Configuration API

- [ ] Créer `lib/api.ts` ou `lib/api/config.ts` :
  - Fonction pour obtenir l'URL de base de l'API
  - Fonction générique pour les requêtes HTTP
  - Gestion des erreurs de base

### Étape 2.3 : Services API

- [ ] Créer `lib/api/tasks.ts` avec les fonctions :
  - `getAllTasks()` - Récupérer toutes les tâches
  - `getTaskById(id)` - Récupérer une tâche par ID
  - `createTask(data)` - Créer une nouvelle tâche
  - `updateTask(id, data)` - Mettre à jour une tâche
  - `deleteTask(id)` - Supprimer une tâche

---

## 🔐 Phase 3 : Authentification et Gestion de Session

### Étape 3.1 : Services API d'authentification

- [ ] Créer `lib/api/auth.ts` avec les fonctions :
  - `register(data: RegisterDto)` - Créer un nouveau compte
  - `login(data: LoginDto)` - Se connecter
  - `logout()` - Se déconnecter
  - `getCurrentUser()` - Récupérer l'utilisateur connecté
  - `refreshToken()` - Rafraîchir le token (si applicable)

### Étape 3.2 : Gestion du token et du stockage

- [ ] Créer `lib/auth/token.ts` pour gérer le token :

  - `setToken(token: string)` - Stocker le token (localStorage ou cookie)
  - `getToken()` - Récupérer le token
  - `removeToken()` - Supprimer le token
  - `isTokenValid()` - Vérifier si le token est valide

- [ ] Créer `lib/auth/storage.ts` pour le stockage sécurisé :
  - Fonctions pour gérer localStorage/cookies de manière sécurisée
  - Gestion de la persistance de session

### Étape 3.3 : Context et Provider d'authentification

- [ ] Créer `contexts/AuthContext.tsx` :

  - Context React pour l'état d'authentification global
  - Provider avec les fonctions d'auth (login, register, logout)
  - État de l'utilisateur connecté
  - État de chargement de l'auth

- [ ] Créer `providers/AuthProvider.tsx` :
  - Wrapper du contexte d'authentification
  - Initialisation de l'état au chargement de l'app
  - Gestion de la persistance de session

### Étape 3.4 : Hooks personnalisés d'authentification

- [ ] Créer `hooks/useAuth.ts` :

  - Hook pour accéder facilement au contexte d'authentification
  - Fonctions helper (isAuthenticated, user, etc.)

- [ ] Créer `hooks/useRequireAuth.ts` :
  - Hook pour protéger les routes nécessitant une authentification
  - Redirection automatique vers la page de connexion si non authentifié

### Étape 3.5 : Composants UI d'authentification

- [ ] Créer `components/Auth/LoginForm.tsx` :

  - Formulaire de connexion avec validation
  - Gestion des erreurs
  - Redirection après connexion réussie

- [ ] Créer `components/Auth/RegisterForm.tsx` :

  - Formulaire d'inscription avec validation
  - Confirmation de mot de passe
  - Gestion des erreurs

- [ ] Créer `components/Auth/AuthModal.tsx` (optionnel) :
  - Modal pour afficher login/register
  - Basculer entre les deux formulaires

### Étape 3.6 : Pages d'authentification

- [ ] Créer `app/login/page.tsx` :

  - Page de connexion
  - Intégration du LoginForm
  - Redirection si déjà connecté

- [ ] Créer `app/register/page.tsx` :
  - Page d'inscription
  - Intégration du RegisterForm
  - Redirection si déjà connecté

### Étape 3.7 : Protection des routes

- [ ] Créer `components/Auth/ProtectedRoute.tsx` ou middleware :

  - Composant pour protéger les routes nécessitant une authentification
  - Redirection vers /login si non authentifié
  - Affichage d'un loader pendant la vérification

- [ ] Créer `middleware.ts` (optionnel) :
  - Middleware Next.js pour protéger les routes au niveau serveur
  - Vérification du token avant le rendu

### Étape 3.8 : Intégration dans le Header

- [ ] Mettre à jour `components/Layout/Header.tsx` :
  - Afficher le nom de l'utilisateur si connecté
  - Bouton de déconnexion
  - Lien vers login/register si non connecté
  - Menu utilisateur (dropdown)

### Étape 3.9 : Configuration des requêtes API avec token

- [ ] Mettre à jour `lib/api/config.ts` :

  - Fonction pour ajouter automatiquement le token aux requêtes
  - Gestion de l'expiration du token
  - Intercepteur pour rafraîchir le token si nécessaire

- [ ] Mettre à jour les services API :
  - Ajouter le token dans les headers de toutes les requêtes authentifiées
  - Gérer les erreurs 401 (non autorisé) et rediriger vers login

---

## 🎨 Phase 4 : Composants UI de Base

### Étape 3.1 : Composants de layout

- [ ] Créer `components/Layout/Header.tsx` - En-tête de l'application
- [ ] Créer `components/Layout/Footer.tsx` - Pied de page (optionnel)
- [ ] Créer `components/Layout/Container.tsx` - Conteneur principal

### Étape 3.2 : Composants de tâches

- [ ] Créer `components/Task/TaskCard.tsx` - Carte d'affichage d'une tâche
- [ ] Créer `components/Task/TaskList.tsx` - Liste des tâches
- [ ] Créer `components/Task/TaskForm.tsx` - Formulaire de création/édition
- [ ] Créer `components/Task/TaskModal.tsx` - Modal pour créer/éditer (optionnel)

### Étape 3.3 : Composants utilitaires

- [ ] Créer `components/UI/Loading.tsx` - Indicateur de chargement
- [ ] Créer `components/UI/Error.tsx` - Affichage des erreurs
- [ ] Créer `components/UI/EmptyState.tsx` - État vide (pas de tâches)

---

## 🔄 Phase 5 : Gestion d'État et Logique Métier

### Étape 4.1 : Hooks personnalisés

- [ ] Créer `hooks/useTasks.ts` - Hook pour gérer les tâches :
  - État de chargement
  - État d'erreur
  - Fonctions CRUD
  - Rafraîchissement automatique

### Étape 4.2 : Gestion des erreurs

- [ ] Créer `lib/errors.ts` - Types d'erreurs personnalisés
- [ ] Implémenter la gestion d'erreurs dans les services API
- [ ] Créer des messages d'erreur utilisateur-friendly

---

## 📱 Phase 6 : Pages et Routes

### Étape 6.1 : Page principale

- [ ] Refactoriser `app/page.tsx` pour afficher la liste des tâches
- [ ] Protéger la page avec l'authentification
- [ ] Intégrer les composants créés
- [ ] Ajouter la fonctionnalité de filtrage (optionnel)

### Étape 6.2 : Page de détail (optionnel)

- [ ] Créer `app/tasks/[id]/page.tsx` - Page de détail d'une tâche
- [ ] Protéger la page avec l'authentification
- [ ] Implémenter la navigation

### Étape 6.3 : Navigation

- [ ] Créer un système de navigation cohérent
- [ ] Ajouter des liens entre les pages

---

## ✨ Phase 7 : Fonctionnalités Avancées

### Étape 7.1 : Filtrage et recherche

- [ ] Ajouter un champ de recherche
- [ ] Implémenter le filtrage par statut
- [ ] Ajouter le tri (par date, par statut, etc.)

### Étape 7.2 : Actions utilisateur

- [ ] Ajouter des boutons d'action (modifier, supprimer)
- [ ] Implémenter les confirmations de suppression
- [ ] Ajouter des notifications de succès/erreur (toast)

### Étape 7.3 : Optimisations

- [ ] Implémenter le revalidation côté serveur (si applicable)
- [ ] Ajouter la pagination (si nécessaire)
- [ ] Optimiser les performances (memoization, etc.)

---

## 🎨 Phase 8 : Styling et UX

### Étape 8.1 : Thème DaisyUI

- [ ] Choisir et configurer un thème DaisyUI
- [ ] Personnaliser les couleurs selon votre branding
- [ ] Tester le mode sombre/clair

### Étape 8.2 : Responsive Design

- [ ] S'assurer que l'application est responsive
- [ ] Tester sur différentes tailles d'écran
- [ ] Optimiser pour mobile

### Étape 8.3 : Animations et transitions

- [ ] Ajouter des transitions douces
- [ ] Implémenter des animations de chargement
- [ ] Améliorer le feedback visuel

---

## 🧪 Phase 9 : Tests et Validation

### Étape 9.1 : Tests manuels

- [ ] Tester toutes les fonctionnalités CRUD
- [ ] Tester la gestion des erreurs
- [ ] Tester les cas limites

### Étape 9.2 : Validation

- [ ] Vérifier que toutes les règles ESLint sont respectées
- [ ] Vérifier la cohérence du code TypeScript
- [ ] Vérifier l'accessibilité de base

---

## 🚀 Phase 10 : Finalisation

### Étape 10.1 : Documentation

- [ ] Documenter les composants principaux
- [ ] Créer un README avec les instructions
- [ ] Documenter la configuration de l'API

### Étape 10.2 : Optimisations finales

- [ ] Nettoyer le code
- [ ] Optimiser les imports
- [ ] Vérifier les performances

---

## 📝 Notes Importantes

1. **Bonnes pratiques Next.js** :

   - Utiliser les Server Components quand possible
   - Utiliser les Client Components uniquement pour l'interactivité
   - Respecter la structure App Router

2. **TypeScript** :

   - Toujours typer les props et les fonctions
   - Éviter `any` autant que possible
   - Utiliser les types stricts

3. **DaisyUI** :

   - Utiliser les classes utilitaires DaisyUI
   - Respecter la structure HTML requise par DaisyUI
   - Personnaliser via les variables CSS si nécessaire

4. **Gestion d'état** :

   - Commencer simple (useState, useEffect)
   - Évoluer vers des solutions plus complexes si nécessaire

5. **Authentification** :
   - Stocker le token de manière sécurisée (localStorage ou cookies httpOnly)
   - Toujours vérifier l'authentification avant les requêtes API
   - Gérer l'expiration du token et la déconnexion automatique
   - Protéger les routes sensibles avec des composants ou middleware

---

## 🎓 Points d'Apprentissage

À chaque étape, nous aborderons :

- Les concepts Next.js utilisés
- Les patterns de code recommandés
- Les bonnes pratiques React
- Les spécificités de DaisyUI
- La gestion d'erreurs et d'états

---

## 🚀 Prêt à commencer ?

On commence par la Phase 1 ! 🚀
