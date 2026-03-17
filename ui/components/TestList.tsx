/**
 * TestList Component
 *
 * Displays a scrollable grid of available IELTS Cambridge tests.
 * Each test is a clickable box that directs to the test panel.
 *
 * Props:
 * - section: The IELTS section name (Listening, Reading, Writing, Speaking)
 * - mode: The mode (training or exam)
 */

import Link from "next/link";
import ComingSoon from "./ComingSoon";

interface TestListProps {
  section: string;
  mode: "training" | "exam";
}

// Cambridge test versions
const cambridgeVersions = [17, 18, 19, 20];

export default function TestList({ section, mode }: TestListProps) {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
          {section} - {mode === "training" ? "Training" : "Exam"} Mode
        </h2>
        <p className="text-[var(--text-secondary)]">
          Select a test to begin your practice
        </p>
      </div>

      {/* Test Grid - Scrollable */}
      <div className="max-h-[60vh] overflow-y-auto pr-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cambridgeVersions.map((version) => (
            <Link
              key={version}
              href={`/${section.toLowerCase()}/${mode}/test-${version}`}
              className={`
                // Card styling
                block p-6 rounded-xl border
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
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
