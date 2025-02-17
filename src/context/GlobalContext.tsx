// src/context/GlobalContext.tsx
"use client";

import { createContext, useState, useContext } from "react";
import { Toaster, toast } from "react-hot-toast";

// Definimos a forma do nosso contexto
interface GlobalContextProps {
  user: { name: string } | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  showToast: (message: string, type?: "success" | "error") => void;
}

const GlobalContext = createContext<GlobalContextProps>({
  user: null,
  login: async () => false,
  logout: () => {},
  showToast: () => {},
});

export function GlobalContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ name: string } | null>(null);

  async function login(username: string, password: string) {
    // Dados "chumbados"
    if (username === "admin" && password === "123456") {
      setUser({ name: "Administrador" });
      toast.success("Login efetuado com sucesso!");
      return true;
    } else {
      toast.error("Usuário ou senha inválidos!");
      return false;
    }
  }

  function logout() {
    setUser(null);
    toast("Você saiu da conta.");
  }

  function showToast(message: string, type: "success" | "error" = "success") {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  }

  return (
    <GlobalContext.Provider value={{ user, login, logout, showToast }}>
      {/* O Toaster exibe os pop-ups na tela */}
      <Toaster position="top-right" reverseOrder={false} />
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
