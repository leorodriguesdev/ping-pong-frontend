// src/app/page.tsx
import Link from "next/link";

type Site = {
  site_id: number;
  name: string;
  url: string;
  status: string; // "online", "offline" ou outro
};

export default async function HomePage() {
  // Busca a lista de sites
  const res = await fetch("http://127.0.0.1:8000/site/", { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Erro ao buscar lista de sites");
  }

  const sites: Site[] = await res.json();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Título */}
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-8">
          Monitor de Sites
        </h1>

        {/* Grid de cartões */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sites.map((site) => (
            <div
              key={site.site_id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col"
            >
              {/* Nome e URL */}
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-1">
                {site.name}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 break-all mb-4">
                {site.url}
              </p>

              {/* Status colorido */}
              <div className="mb-4">
                <StatusBadge status={site.status} />
              </div>

              {/* Link para logs */}
              <div className="mt-auto">
                <Link
                  href={`/sites/${site.site_id}`}
                  className="inline-block text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                >
                  Ver logs →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Componente para exibir o status com cor
function StatusBadge({ status }: { status: string }) {
  let colorClasses = "bg-gray-300 text-gray-800"; // default

  if (status === "online") {
    colorClasses = "bg-green-100 text-green-800";
  } else if (status === "offline") {
    colorClasses = "bg-red-100 text-red-800";
  }

  return (
    <span className={`px-2 py-1 text-sm font-semibold rounded ${colorClasses}`}>
      {status.toUpperCase()}
    </span>
  );
}
