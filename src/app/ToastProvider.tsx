// src/app/ToastProvider.tsx (exemplo de arquivo)
"use client"; // precisa ser Client Component

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return <Toaster position="top-right" reverseOrder={false} />;
}
