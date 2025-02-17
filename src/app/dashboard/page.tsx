"use client";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

type Site = {
  site_id: number;
  name: string;
  url: string;
  status: string;
};

function StatusBadge({ status }: { status: string }) {
  if (status === "offline") {
    return (
      <span className="inline-flex items-center px-2 py-1 text-sm rounded bg-red-100 text-red-800 font-semibold">
        OFFLINE
      </span>
    );
  }

  return (
    <span className="inline-flex items-center px-2 py-1 text-sm rounded bg-green-100 text-green-800 font-semibold">
      ONLINE
    </span>
  );
}

export default function DashboardHomePage() {
  const [sites, setSites] = useState<Site[]>([]);

  // Fazer fetch no cliente repetidamente (exemplo, a cada 30s)
  useEffect(() => {
    fetchSites();
    const interval = setInterval(fetchSites, 30000);
    return () => clearInterval(interval);
  }, []);

  async function fetchSites() {
    try {
      const res = await fetch("http://127.0.0.1:8000/site/", { cache: "no-store" });
      if (!res.ok) throw new Error("Erro ao buscar sites");
      const data = await res.json();
      setSites(data);
    } catch (error) {
      console.error(error);
      toast.error("Falha ao atualizar dados do dashboard");
    }
  }

  // Exemplo de entrar em fullscreen
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  return (
    <div className="text-center">
      <h1 className="text-4xl font-extrabold mb-6">DASHBOARD</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        Acompanhe em tempo real o status dos seus sites
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {sites.map((site) => (
          <div
            key={site.site_id}
            className={`rounded-lg p-4 flex flex-col justify-center items-center transition-shadow ${
              site.status === "offline"
                ? "border-4 border-red-500 animate-pulse"
                : "border border-gray-200 dark:border-gray-700"
            }`}
          >
            <h2 className="text-2xl font-semibold mb-1">{site.name}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{site.url}</p>
            <StatusBadge status={site.status} />
          </div>
        ))}
      </div>
    </div>
  );
}
