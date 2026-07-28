"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SHIPNOW_SESSION_KEY } from "@/lib/session";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const hasSession =
      localStorage.getItem(SHIPNOW_SESSION_KEY) === "active";
    router.replace(hasSession ? "/dashboard" : "/login");
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface-page text-text-secondary">
      <p>Loading ShipNow…</p>
    </main>
  );
}
