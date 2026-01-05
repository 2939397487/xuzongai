"use client";

import Header from "@/components/header/Header";
import AboutSection from "@/components/about/AboutSection";
import Footer from "@/components/footer/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}
