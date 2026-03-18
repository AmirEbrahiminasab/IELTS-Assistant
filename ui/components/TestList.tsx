"use client";

/**
 * TestList Component
 *
 * Displays a scrollable grid of available IELTS Cambridge tests.
 * Each test is a clickable box that opens the exam selection modal.
 *
 * Props:
 * - section: The IELTS section name (Listening, Reading, Writing, Speaking)
 * - mode: The mode (training or exam)
 */

import { useState } from "react";
import ExamSelectionPanel from "./ExamSelectionPanel";

interface TestListProps {
  section: string;
  mode: "training" | "exam";
}

// Cambridge test versions
const cambridgeVersions = [17, 18, 19, 20];

export default function TestList({ section, mode }: TestListProps) {
  const [selectedTest, setSelectedTest] = useState<number | null>(null);

  return (
    <>
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
            {section} - {mode === "training" ? "Training" : "Exam"} Mode
          </h2>
          <p className="text-[var(--text-secondary)]">
            Select a Cambridge test to begin
          </p>
        </div>

        {/* Test Grid - Scrollable */}
        <div className="max-h-[60vh] overflow-y-auto pr-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cambridgeVersions.map((version) => (
              <div
                key={version}
                onClick={() => setSelectedTest(version)}
                className={`
                  // Card styling
                  cursor-pointer block p-6 rounded-xl border
                  bg-white border-[var(--border-subtle)]
                  // Hover effects
                  hover:shadow-lg hover:border-[var(--slate-gray)]
                  // Smooth transitions
                  transition-all duration-200
                `}
              >
                <div className="flex items-center gap-4">
                  {/* Test Icon */}
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-[var(--surface-medium)] rounded-lg">
                    <span className="text-2xl">📚</span>
                  </div>

                  {/* Test Info */}
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)] mb-1">
                      IELTS Cambridge {version}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)]">
                      {section} Practice Test
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Exam Selection Modal */}
      {selectedTest && (
        <ExamSelectionPanel
          section={section as "listening" | "reading" | "writing" | "speaking"}
          mode={mode}
          testNumber={selectedTest}
          onClose={() => setSelectedTest(null)}
        />
      )}
    </>
  );
}
