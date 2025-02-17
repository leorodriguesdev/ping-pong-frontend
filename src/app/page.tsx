// src/app/page.tsx
"use client";

import Link from "next/link";
import { useGlobalContext } from "@/context/GlobalContext";
import ThemeSwitcher from "./themeSwitcher";

export default function HomePage() {
  const { user } = useGlobalContext();

  return (
    <div className="min-h-screen text-center bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:to-gray-800 py-20 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          Bem-vindo ao Monitor de Sites
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
          Gerencie o status dos seus sites favoritos. Monitore performance, veja históricos
          de requisições.
        </p>
        {user && (
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            Você está logado como <strong>{user.name}</strong>.
          </p>
        )}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/sites"
            className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
          >
            Acessar Sites
          </Link>
          <Link
            href="/sites/new"
            className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-6 py-3 rounded-md font-semibold hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
          >
            Cadastrar Novo Site
          </Link>
        </div>
      </div>
      <div className="max-w-4xl mx-auto mt-16 grid gap-8 sm:grid-cols-2 text-left">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Monitoramento em Tempo Real
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Saiba imediatamente quando um site cair, com atualizações constantes.
          </p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Histórico de Logs
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Acompanhe registros de status code e tempo de resposta, tudo em um só lugar.
          </p>
        </div>
      </div>
      <p className="mb-6 text-gray-700 dark:text-gray-300 italic pt-5">
            Simples e direto ao ponto!
          </p>
    </div>
  );
}
