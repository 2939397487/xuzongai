"use client";

import Header from "@/components/header/Header";
import HeroSection from "@/components/hero/HeroSection";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
      </main>
      <Footer />
    </div>
  );
}
