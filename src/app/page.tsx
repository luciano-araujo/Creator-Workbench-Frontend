"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Zap, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { ThemeColorPicker } from "@/components/shared/ThemeColorPicker";

export default function HomePage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Basic AuthGuard check for the fake token
    const hasToken = document.cookie.includes("creator_auth_token");
    if (!hasToken) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) return null; // Avoid flicker

  return (
    <div className="min-h-screen bg-background text-zinc-900 dark:text-zinc-100 flex flex-col font-sans relative">
      <div className="absolute inset-0 bg-dot-grid dark:bg-dot-grid-dark opacity-[0.4] dark:opacity-[0.2] pointer-events-none -z-20" />
      
      {/* NAVBAR */}
      <nav className="w-full h-[88px] border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/40 dark:bg-zinc-950/50 backdrop-blur-md z-50 flex items-center justify-between px-6 lg:px-12 fixed top-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl md:text-2xl font-black tracking-tighter uppercase font-heading">
            Workbench<span className="text-primary">_CR</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <ThemeColorPicker />
          <ThemeToggle />
          <Button 
            variant="outline" 
            className="rounded-xl border-zinc-200 dark:border-zinc-800 flex gap-2"
            onClick={() => {
              document.cookie = "creator_auth_token=; path=/; max-age=0";
              router.push("/login");
            }}
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sair</span>
          </Button>
        </div>
      </nav>

      {/* DASHBOARD CONTENT */}
      <main className="flex-1 pt-[120px] px-6 lg:px-12 max-w-[1600px] mx-auto w-full">
        <div className="bg-primary/10 border border-primary/20 text-primary p-6 rounded-3xl mb-8">
          <h1 className="text-2xl font-black uppercase tracking-tight mb-2">Conexão Bem-Sucedida!</h1>
          <p className="font-medium">O Frontend Next.js enviou os dados, o Backend Spring Boot processou, e o banco MySQL salvou. A PoC está funcionando.</p>
        </div>
      </main>
    </div>
  );
}