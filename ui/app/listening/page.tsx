/**
 * Listening Page
 *
 * Main page for the Listening section of IELTS Assistant.
 * Provides two modes: Training and Exam.
 *
 * Structure:
 * - Uses DashboardLayout for consistent navigation
 * - Two large clickable cards for Training and Exam modes
 */

import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";

export default function ListeningPage() {
  return (
    <DashboardLayout pageTitle="Listening">
      <div className="max-w-5xl mx-auto">
        {/* Mode Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Training Mode */}
          <Link
            href="/listening/training"
            className={`
              // Card styling
              block p-8 rounded-xl border
              bg-white border-[var(--border-subtle)]
              // Hover effects
              hover:shadow-lg hover:border-[var(--slate-gray)]
              // Smooth transitions
              transition-all duration-200
            `}
          >
            <div className="flex flex-col items-center justify-center text-center py-8">
              {/* Icon */}
              <div className="text-6xl mb-4">💪</div>
              {/* Title */}
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                Training Mode
              </h2>
              {/* Description */}
              <p className="text-[var(--text-secondary)]">
                Practice without any time limit and get instant feedback
              </p>
            </div>
          </Link>

          {/* Exam Mode */}
          <Link
            href="/listening/exam"
            className={`
              // Card styling
              block p-8 rounded-xl border
              bg-white border-[var(--border-subtle)]
              // Hover effects
              hover:shadow-lg hover:border-[var(--slate-gray)]
              // Smooth transitions
              transition-all duration-200
            `}
          >
            <div className="flex flex-col items-center justify-center text-center py-8">
              {/* Icon */}
              <div className="text-6xl mb-4">📝</div>
              {/* Title */}
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                Exam Mode
              </h2>
              {/* Description */}
              <p className="text-[var(--text-secondary)]">
                Simulate real IELTS exam conditions with timed tests
              </p>
            </div>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
