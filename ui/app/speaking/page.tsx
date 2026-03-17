/**
 * Speaking Page
 *
 * Main page for the Speaking section of IELTS Assistant.
 * Provides two modes: Training and Exam.
 */

import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";

export default function SpeakingPage() {
  return (
    <DashboardLayout pageTitle="Speaking">
      <div className="max-w-5xl mx-auto">
        {/* Mode Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Training Mode */}
          <Link
            href="/speaking/training"
            className={`
              block p-8 rounded-xl border
              bg-white border-[var(--border-subtle)]
              hover:shadow-lg hover:border-[var(--slate-gray)]
              transition-all duration-200
            `}
          >
            <div className="flex flex-col items-center justify-center text-center py-8">
              <div className="text-6xl mb-4">💪</div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                Training Mode
              </h2>
              <p className="text-[var(--text-secondary)]">
                Practice without any time limit and get instant feedback
              </p>
            </div>
          </Link>

          {/* Exam Mode */}
          <Link
            href="/speaking/exam"
            className={`
              block p-8 rounded-xl border
              bg-white border-[var(--border-subtle)]
              hover:shadow-lg hover:border-[var(--slate-gray)]
              transition-all duration-200
            `}
          >
            <div className="flex flex-col items-center justify-center text-center py-8">
              <div className="text-6xl mb-4">📝</div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                Exam Mode
              </h2>
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
