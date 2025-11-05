"use client"

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Spinner } from "./ui/spinner";

/**
 * Client-side routing gate that protects routes.
 * - Protects all routes except: '/', '/login', '/signup'
 * - Redirects authenticated users away from '/login' and '/signup' to '/dashboard'
 */
export default function AuthenticatedGate({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const publicPaths = ["/", "/login", "/signup"];

  React.useEffect(() => {
    if (typeof pathname === "undefined" || loading) return;

    const isPublic = publicPaths.some((p) => pathname === p || pathname.startsWith(p + "/"));

    if (user) {
      // If authenticated user is on a public auth page, send to dashboard
      if (pathname === "/login" || pathname === "/signup") {
        router.replace("/dashboard");
      }
      // Otherwise allow
      return;
    }

    // Not authenticated
    if (!isPublic) {
      router.replace("/login");
    }
  }, [user, loading, pathname, router]);

  // While we don't know auth state, avoid rendering protected content to prevent flicker.
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="size-10"/>
      </div>
    );
  }

  return <>{children}</>;
}
