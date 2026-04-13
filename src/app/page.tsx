"use client";

import dynamic from "next/dynamic";

const Dashboard = dynamic(() => import("@/components/Dashboard"), { 
  ssr: false,
  loading: () => <div className="h-screen w-full flex items-center justify-center bg-white text-slate-500">Iniciando Generador...</div>
});

export default function Home() {
  return (
    <main className="min-h-screen">
      <Dashboard />
    </main>
  );
}
