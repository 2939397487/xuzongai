"use client";

import Header from "@/components/header/Header";
import ModelSection from "@/components/models/ModelSection";
import Footer from "@/components/footer/Footer";

export default function ModelsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <ModelSection />
      </main>
      <Footer />
    </div>
  );
}
