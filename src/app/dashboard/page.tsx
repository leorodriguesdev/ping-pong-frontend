// src/app/dashboard/page.tsx

type Site = {
    site_id: number;
    name: string;
    url: string;
    status: string; // "online" ou "offline"
  };
  
  export default async function DashboardHomePage() {
    // Faz a request no servidor, sem cache
    const res = await fetch("http://127.0.0.1:8000/site/", { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Erro ao buscar sites");
    }
  
    const sites: Site[] = await res.json();
  
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {sites.map((site) => (
            <div
              key={site.site_id}
              className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 flex flex-col"
            >
              <h2 className="text-lg font-semibold">
                {site.name}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {site.url}
              </p>
  
              <div className="mt-2">
                {/* Badge de status com cor */}
                <StatusBadge status={site.status} />
              </div>
  
              <div className="mt-auto pt-4">
                <a
                  href={`/sites/${site.site_id}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                >
                  Ver logs
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  // Componente de badge para status
  function StatusBadge({ status }: { status: string }) {
    // Pode mapear as cores conforme o status
    let bg = "bg-gray-300 text-gray-800"; // default
    if (status === "online") {
      bg = "bg-green-100 text-green-800";
    } else if (status === "offline") {
      bg = "bg-red-100 text-red-800";
    }
  
    return (
      <span className={`inline-block px-2 py-1 text-sm rounded ${bg}`}>
        {status.toUpperCase()}
      </span>
    );
  }
  