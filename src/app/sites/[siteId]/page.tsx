"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";

interface LogData {
  request_log_id: number;
  site_id: number;
  status_code: number;
  response_time: number;
  timestamp: string; // ISO date
}

export default function LogsPage() {
  // Pega o "siteId" a partir da rota dinâmica, via next/navigation
  const { siteId } = useParams() as { siteId: string };

  // Estados
  const [logs, setLogs] = useState<LogData[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<LogData[]>([]);

  // Filtros
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // Busca inicial + atualizações caso precise
  useEffect(() => {
    if (!siteId) return;
    fetchLogs(siteId);
  }, [siteId]);

  // Aplica filtros sempre que logs ou filtros mudarem
  useEffect(() => {
    applyFilters();
  }, [logs, statusFilter, searchTerm, startDate, endDate]);

  async function fetchLogs(siteId: string) {
    try {
      const res = await fetch(`http://127.0.0.1:8000/logs/${siteId}`, {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error(`Erro ao buscar logs do site ${siteId}`);
      }
      const data = await res.json();
      setLogs(data);
    } catch (error) {
      console.error(error);
      toast.error("Falha ao buscar logs!");
    }
  }

  function applyFilters() {
    let temp = [...logs];

    // Filtro por status code
    if (statusFilter) {
      const code = parseInt(statusFilter, 10);
      temp = temp.filter((log) => log.status_code === code);
    }

    // Filtro por intervalo de datas
    if (startDate) {
      const start = new Date(startDate);
      temp = temp.filter((log) => new Date(log.timestamp) >= start);
    }
    if (endDate) {
      const end = new Date(endDate);
      temp = temp.filter((log) => new Date(log.timestamp) <= end);
    }

    // Filtro de texto livre (ex.: busca por parte da data ou status_code)
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      temp = temp.filter(
        (log) =>
          String(log.status_code).includes(lower) ||
          new Date(log.timestamp)
            .toLocaleString("pt-BR")
            .toLowerCase()
            .includes(lower)
      );
    }

    setFilteredLogs(temp);
  }

  function formatDate(isoString: string) {
    return new Date(isoString).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="mb-6 flex items-center justify-between flex-wrap gap-2">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Logs do site {siteId}
        </h1>
      </div>

      {/* Filtros */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6 flex flex-col sm:flex-row gap-4 sm:items-end">
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 dark:text-gray-200">
            Status Code:
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-48 border border-gray-300 dark:border-gray-700 rounded px-2 py-1 bg-white dark:bg-gray-700"
          >
            <option value="">Todos</option>
            <option value="200">200</option>
            <option value="404">404</option>
            <option value="500">500</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 dark:text-gray-200">
            Início (data/hora):
          </label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full sm:w-52 border border-gray-300 dark:border-gray-700 rounded px-2 py-1 bg-white dark:bg-gray-700"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 dark:text-gray-200">
            Fim (data/hora):
          </label>
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full sm:w-52 border border-gray-300 dark:border-gray-700 rounded px-2 py-1 bg-white dark:bg-gray-700"
          />
        </div>

        <div className="flex flex-col flex-1">
          <label className="font-semibold text-gray-700 dark:text-gray-200">
            Busca Rápida:
          </label>
          <input
            type="text"
            placeholder="Ex.: 200 ou 01/12/2025"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 bg-white dark:bg-gray-700 w-full"
          />
        </div>
      </div>

      {/* Tabela de Logs */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-200">
                Status Code
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-200">
                Tempo (s)
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-200">
                Data/Hora
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="px-4 py-4 text-center text-gray-500 dark:text-gray-300"
                >
                  Nenhum log encontrado.
                </td>
              </tr>
            ) : (
              filteredLogs.map((log) => (
                <tr
                  key={log.request_log_id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded font-semibold ${
                        log.status_code === 200
                          ? "bg-green-100 text-green-800"
                          : log.status_code >= 400 && log.status_code < 500
                          ? "bg-yellow-100 text-yellow-800"
                          : log.status_code >= 500
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {log.status_code}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {log.response_time?.toFixed(2)}
                  </td>
                  <td className="px-4 py-2">{formatDate(log.timestamp)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
