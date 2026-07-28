"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect, useSyncExternalStore } from "react";
import { SHIPNOW_SESSION_KEY } from "@/lib/session";

function subscribeToSession(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSessionSnapshot() {
  return localStorage.getItem(SHIPNOW_SESSION_KEY) === "active";
}

export function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const authenticated = useSyncExternalStore(
    subscribeToSession,
    getSessionSnapshot,
    () => false,
  );

  useEffect(() => {
    if (!authenticated) {
      router.replace("/login");
    }
  }, [authenticated, router]);

  if (!authenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface-page text-text-secondary">
        <p>Loading ShipNow…</p>
      </main>
    );
  }

  return children;
}
