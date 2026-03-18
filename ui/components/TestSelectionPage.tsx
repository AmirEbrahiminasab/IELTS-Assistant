"use client";

/**
 * TestSelectionPage Component
 *
 * Reusable component for test selection pages that show a card
 * and open an exam selection modal when clicked.
 */

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import ExamSelectionPanel from "@/components/ExamSelectionPanel";

interface TestSelectionPageProps {
  section: "listening" | "reading" | "writing" | "speaking";
  mode: "training" | "exam";
  testNumber: number;
  icon?: string;
}

export default function TestSelectionPage({ section, mode, testNumber, icon = "📚" }: TestSelectionPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <DashboardLayout pageTitle={`Cambridge ${testNumber} - ${section.charAt(0).toUpperCase() + section.slice(1)} ${mode === "training" ? "Training" : "Exam"}`}>
      <div className="max-w-4xl mx-auto">
        {/* Test Card - Opens modal instantly on click */}
        <div
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer block p-8 rounded-xl border bg-white border-[var(--border-subtle)] hover:shadow-lg hover:border-[var(--slate-gray)] transition-all duration-200"
        >
          <div className="flex flex-col items-center justify-center text-center py-8">
            <div className="text-6xl mb-4">{icon}</div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
              IELTS Cambridge {testNumber}
            </h2>
            <p className="text-[var(--text-secondary)]">
              {section.charAt(0).toUpperCase() + section.slice(1)} - {mode === "training" ? "Training" : "Exam"} Mode
            </p>
          </div>
        </div>
      </div>

      {/* Exam Selection Modal */}
      {isModalOpen && (
        <ExamSelectionPanel
          section={section}
          mode={mode}
          testNumber={testNumber}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </DashboardLayout>
  );
}
