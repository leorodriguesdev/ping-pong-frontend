// src/context/GlobalContext.tsx
"use client";

import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { Toaster, toast } from "react-hot-toast";
import axiosClient from "@/api/axiosClient";

// Tipos para o usuário e para os sites
interface User {
  name: string;
}

export interface Site {
  site_id: number;
  name: string;
  url: string;
  status: string;
}

interface GlobalContextProps {
  user: User | null;
  theme: "light" | "dark";
  healthOk: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  toggleTheme: () => void;
  showToast: (message: string, type?: "success" | "error") => void;
  fetchHealth: () => void;
  getSites: () => Promise<Site[]>;
  sites: Site[];
}

const GlobalContext = createContext<GlobalContextProps>({
  user: null,
  theme: "light",
  healthOk: false,
  login: async () => false,
  logout: () => {},
  toggleTheme: () => {},
  showToast: () => {},
  fetchHealth: () => {},
  getSites: async () => [],
  sites: [],
});

export function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [healthOk, setHealthOk] = useState(false);
  const [sites, setSites] = useState<Site[]>([]);

  // Função getSites definida com useCallback para estabilidade
  const getSites = useCallback(async (): Promise<Site[]> => {
    try {
      const response = await axiosClient.get("/site/");
      setSites(response.data);
      return response.data;
    } catch (err) {
      console.error(err);
      toast.error("Falha ao buscar sites");
      return [];
    }
  }, []);

  useEffect(() => {
    // Carrega tema e usuário do localStorage
    const storedTheme = localStorage.getItem("app-theme") as "light" | "dark" | null;
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    }
    const storedUser = localStorage.getItem("app-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    // Verifica a saúde da API ao carregar
    fetchHealth();
  }, []);

  async function login(username: string, password: string) {
    if (username === "admin" && password === "123456") {
      const newUser = { name: "Administrador" };
      setUser(newUser);
      localStorage.setItem("app-user", JSON.stringify(newUser));
      toast.success("Login efetuado com sucesso!");
      return true;
    } else {
      toast.error("Usuário ou senha inválidos!");
      return false;
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("app-user");
    toast("Você saiu da conta.");
  }

  function toggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("app-theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  }

  function showToast(message: string, type: "success" | "error" = "success") {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  }

  async function fetchHealth() {
    try {
      const response = await axiosClient.get("/health/");
      setHealthOk(response.status === 200);
    } catch (err) {
      console.error(err);
      setHealthOk(false);
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        user,
        theme,
        healthOk,
        login,
        logout,
        toggleTheme,
        showToast,
        fetchHealth,
        getSites,
        sites,
      }}
    >
      <Toaster position="top-right" reverseOrder={false} />
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
