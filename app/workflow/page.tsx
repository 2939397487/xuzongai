"use client";

import Header from "@/components/header/Header";
import WorkflowSection from "@/components/workflow/WorkflowSection";
import Footer from "@/components/footer/Footer";

export default function WorkflowPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <WorkflowSection />
      </main>
      <Footer />
    </div>
  );
}
