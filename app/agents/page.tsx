"use client";

import Header from "@/components/header/Header";
import AgentSection from "@/components/agents/AgentSection";
import Footer from "@/components/footer/Footer";

export default function AgentsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <AgentSection />
      </main>
      <Footer />
    </div>
  );
}
