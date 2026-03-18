"use client";

/**
 * ExamSelectionPanel Component
 *
 * Displays a 2x2 grid modal of available exams (1-4) for a Cambridge test.
 * Used as a popup overlay on the test selection page.
 */

import { useEffect } from "react";
import Link from "next/link";

interface ExamSelectionPanelProps {
  section: "listening" | "reading" | "writing" | "speaking";
  mode: "training" | "exam";
  testNumber: number;
  onClose: () => void;
}

const examNumbers = [1, 2, 3, 4];

export default function ExamSelectionPanel({ section, mode, testNumber, onClose }: ExamSelectionPanelProps) {
  // Handle ESC key press
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    // Modal Overlay - Click to close
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal Content - Stop propagation to prevent closing when clicking inside */}
      <div 
        className="relative w-full max-w-2xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-[var(--lavender)] transition-colors"
          aria-label="Close modal"
        >
          <span className="text-3xl">×</span>
        </button>

        {/* Modal Card */}
        <div className="bg-white rounded-xl shadow-2xl p-6">
          {/* Header */}
          <div className="mb-6 text-center">
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">
              IELTS Cambridge {testNumber} - {section.charAt(0).toUpperCase() + section.slice(1)}
            </h2>
            <p className="text-[var(--text-secondary)]">
              {mode === "training" ? "Training" : "Exam"} Mode - Select an exam to begin
            </p>
          </div>

          {/* Exam Grid - 2x2 Layout */}
          <div className="grid grid-cols-2 gap-4">
            {examNumbers.map((examNum) => (
              <Link
                key={examNum}
                href={`/${section.toLowerCase()}/${mode}/test-${testNumber}/exam-${examNum}`}
                onClick={onClose}
                className={`
                  // Card styling
                  block p-6 rounded-xl border
                  bg-[var(--surface-light)] border-[var(--border-subtle)]
                  // Hover effects
                  hover:shadow-lg hover:border-[var(--slate-gray)]
                  // Smooth transitions
                  transition-all duration-200
                `}
              >
                <div className="flex flex-col items-center justify-center text-center py-2">
                  {/* Exam Icon */}
                  <div className="text-4xl mb-2">📋</div>
                  
                  {/* Exam Number */}
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1">
                    Exam {examNum}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-xs text-[var(--text-secondary)]">
                    Full {section.toLowerCase()} test
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
