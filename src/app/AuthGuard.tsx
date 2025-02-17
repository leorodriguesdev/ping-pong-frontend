// src/app/AuthGuard.tsx
"use client";

import { ReactNode, useEffect, useState } from "react";
import { useGlobalContext } from "@/context/GlobalContext";
import { usePathname, useRouter } from "next/navigation";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { user } = useGlobalContext();
  const router = useRouter();
  const pathname = usePathname() || "";
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const publicRoutes = ["/login", "/register"];
    if (publicRoutes.includes(pathname)) {
      setIsAllowed(true);
    } else {
      if (!user) {
        router.replace("/login");
      } else {
        setIsAllowed(true);
      }
    }
  }, [user, pathname, router]);

  return isAllowed ? <>{children}</> : null;
}
