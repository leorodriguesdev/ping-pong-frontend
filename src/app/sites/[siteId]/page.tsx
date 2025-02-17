// src/app/sites/[siteId]/page.tsx

interface LogsPageProps {
  params: {
    siteId: string; // Param definido pela rota [siteId]
  };
}

export default async function LogsPage({ params }: LogsPageProps) {
  const { siteId } = params; // OK, pois é async

  // Buscar dados do backend usando o siteId
  const res = await fetch(`http://127.0.0.1:8000/logs/${siteId}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Erro ao buscar logs do site ${siteId}`);
  }

  const logs = await res.json();

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Logs do site {siteId}</h1>
      <ul className="space-y-2">
        {logs.map((log: any) => (
          <li key={log.request_log_id}>
            Status: {log.status_code} | Tempo: {log.response_time}s | Data: {log.timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
}
