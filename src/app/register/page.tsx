// src/app/register/page.tsx
"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useGlobalContext } from "@/context/GlobalContext";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const { login, showToast } = useGlobalContext();
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      showToast("As senhas não conferem!", "error");
      return;
    }
    // Registro mockado: utilizamos login para simular o registro
    const ok = await login(username, password);
    if (ok) {
      router.push("/");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
          Registro
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-200 mb-1">
              Usuário
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="Digite seu usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-200 mb-1">
              Senha
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-200 mb-1">
              Confirme a Senha
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="Confirme sua senha"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Registrar
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          Já possui uma conta?{" "}
          <Link href="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
}
