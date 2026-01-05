"use client";

import Header from "@/components/header/Header";
import PromptSection from "@/components/prompts/PromptSection";
import Footer from "@/components/footer/Footer";

export default function PromptsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <PromptSection />
      </main>
      <Footer />
    </div>
  );
}
