"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewSitePage() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:8000/site/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, url }),
      });

      if (!res.ok) {
        throw new Error("Erro ao criar site");
      }

      // Se der certo, redireciona para a lista
      router.push("/sites");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        {/* Link de voltar */}
        <div className="mb-4">
          <Link
            href="/sites"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors"
          >
            ← Voltar
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          Cadastrar Novo Site
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="siteName"
              className="block mb-1 font-semibold text-gray-700 dark:text-gray-200"
            >
              Nome do Site:
            </label>
            <input
              id="siteName"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              type="text"
              placeholder="Ex: Meu Site"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="siteUrl"
              className="block mb-1 font-semibold text-gray-700 dark:text-gray-200"
            >
              URL:
            </label>
            <input
              id="siteUrl"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              type="url"
              placeholder="Ex: https://exemplo.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors"
          >
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}
