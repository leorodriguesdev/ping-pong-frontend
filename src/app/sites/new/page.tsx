// src/app/sites/new/page.tsx
"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function NewSitePage() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Função auxiliar para simular um delay
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Exibe um toast de loading
    const toastId = toast.loading("Cadastrando site...");
    // Simula um delay de 3 segundos
    await delay(3000);
    try {
      const res = await fetch("http://127.0.0.1:8000/site/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, url }),
      });
      if (!res.ok) throw new Error("Erro ao criar site");
      toast.success("Site cadastrado com sucesso!", { id: toastId });
      router.push("/sites");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao criar site", { id: toastId });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="mb-4">
          <Link
            href="/sites"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors"
          >
            ← Voltar
          </Link>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
          Cadastrar Novo Site
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-200 mb-1">
              Nome do Site
            </label>
            <input
              id="siteName"
              type="text"
              placeholder="Ex: Meu Site"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-200 mb-1">
              URL
            </label>
            <input
              id="siteUrl"
              type="url"
              placeholder="Ex: https://exemplo.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Cadastrando..." : "Salvar"}
          </button>
        </form>
      </div>
    </div>
  );
}
