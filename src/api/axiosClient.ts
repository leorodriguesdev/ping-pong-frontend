// src/api/axiosClient.ts
import axios from "axios";

// Crie a instância do axios apontando para sua API Python
// Ajuste a baseURL conforme seu backend
const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8000",
  // Se precisar de headers adicionais, timeout, etc., configure aqui
});

export default axiosClient;
