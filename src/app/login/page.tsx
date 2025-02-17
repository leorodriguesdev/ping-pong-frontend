"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/GlobalContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useGlobalContext();
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const ok = await login(username, password); // Chama a função do contexto
    if (ok) {
      router.push("/"); // Redireciona para a home, ou /dashboard, conforme desejar
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Usuário:
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 bg-white dark:bg-gray-700"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Senha:
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 bg-white dark:bg-gray-700"
              placeholder="123456"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-semibold"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
