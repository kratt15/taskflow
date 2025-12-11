"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isAuthenticated) {
    return null; // Redirection en cours
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-primary to-secondary">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-primary-content">
          <h1 className="text-6xl font-bold mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 inline-block mr-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            TaskFlow
          </h1>
          <p className="text-2xl mb-8 opacity-90">
            Gérez vos tâches avec simplicité et efficacité
          </p>
          <p className="text-lg mb-12 max-w-2xl mx-auto opacity-80">
            TaskFlow est votre application moderne de gestion de tâches.
            Organisez, priorisez et suivez vos projets en toute simplicité.
          </p>

          <div className="flex gap-4 justify-center">
            <Link href="/register" className="btn btn-lg btn-accent">
              Commencer gratuitement
            </Link>
            <Link
              href="/login"
              className="btn btn-lg btn-outline btn-primary-content"
            >
              Se connecter
            </Link>
          </div>

          {/* Fonctionnalités */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="card bg-base-100 text-base-content shadow-xl">
              <div className="card-body items-center text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-primary mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
                <h3 className="card-title">Gestion simple</h3>
                <p>Créez, modifiez et organisez vos tâches en quelques clics</p>
              </div>
            </div>

            <div className="card bg-base-100 text-base-content shadow-xl">
              <div className="card-body items-center text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-primary mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                <h3 className="card-title">Catégorisation</h3>
                <p>Organisez vos tâches par catégories personnalisées</p>
              </div>
            </div>

            <div className="card bg-base-100 text-base-content shadow-xl">
              <div className="card-body items-center text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-primary mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <h3 className="card-title">Suivi de progression</h3>
                <p>Visualisez votre avancement avec des statistiques claires</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
