// src/app/Header.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useGlobalContext } from "@/context/GlobalContext";
import ThemeSwitcher from "./themeSwitcher";

export default function Header() {
  const { user, healthOk, logout, lastHealthCheck } = useGlobalContext();
  const [elapsed, setElapsed] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      setElapsed(Math.floor((now - lastHealthCheck) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [lastHealthCheck]);

  return (
    <>
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl">
            Monitor de Sites
          </Link>
          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:gap-6">
            {user ? (
              <>
                <span className="text-sm text-gray-700 dark:text-gray-200">
                  Olá, {user.name}
                </span>
                <Link href="/sites" className="hover:underline text-sm">
                  Sites
                </Link>
                <Link href="/sites/new" className="hover:underline text-sm">
                  Cadastrar
                </Link>
                <Link href="/dashboard" className="hover:underline text-sm">
                  Dashboard
                </Link>
                <button onClick={logout} className="text-sm text-red-600 hover:underline">
                  Sair
                </button>
              </>
            ) : (
              <Link href="/login" className="hover:underline text-sm">
                Login
              </Link>
            )}  
            <ThemeSwitcher />
          </div>
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-700 dark:text-gray-200 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-3">
            <div className="flex flex-col gap-3">
              {user ? (
                <>
                  <span className="text-sm text-gray-700 dark:text-gray-200">
                    Olá, {user.name}
                  </span>
                  <Link href="/sites" className="hover:underline text-sm" onClick={() => setIsMenuOpen(false)}>
                    Sites
                  </Link>
                  <Link href="/sites/new" className="hover:underline text-sm" onClick={() => setIsMenuOpen(false)}>
                    Cadastrar
                  </Link>
                  <Link href="/dashboard" className="hover:underline text-sm" onClick={() => setIsMenuOpen(false)}>
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Sair
                  </button>
                </>
              ) : (
                <Link href="/login" className="hover:underline text-sm" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
              )}
              <ThemeSwitcher />
            </div>
          </div>
        )}
      </header>
      {/* Indicador fixo no canto inferior direito */}
      <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 p-2 rounded shadow-lg z-50">
        <div className="flex items-center gap-2">
          <span
            className={`text-sm font-semibold ${healthOk ? "text-green-600" : "text-red-600"
              }`}
          >
            {healthOk ? "Monitoramento Online" : "Sistema Offline"}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            ({elapsed}s)
          </span>
        </div>
      </div>
    </>
  );
}
