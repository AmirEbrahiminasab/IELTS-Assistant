/**
 * Home Page
 *
 * The main landing page of the IELTS Assistant application.
 * This is the first page users see when they open the app.
 *
 * Features:
 * - Uses DashboardLayout for consistent navigation
 * - Welcome message and overview
 * - Quick links to different IELTS sections
 */

import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";

// Define the IELTS sections as an array for easy iteration
// Each section has a name, path, icon, and description
const sections = [
  {
    name: "Listening",
    path: "/listening",
    icon: "🎧",
    description: "Practice listening skills with audio exercises",
  },
  {
    name: "Reading",
    path: "/reading",
    icon: "📖",
    description: "Improve reading comprehension with various texts",
  },
  {
    name: "Writing",
    path: "/writing",
    icon: "✍️",
    description: "Develop writing skills for essays and reports",
  },
  {
    name: "Speaking",
    path: "/speaking",
    icon: "🎤",
    description: "Practice speaking for the IELTS interview",
  },
];

export default function Home() {
  return (
    // Wrap the page with DashboardLayout for sidebar and header
    <DashboardLayout pageTitle="Home">
      {/* Main content container */}
      <div className="max-w-4xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
            Welcome to IELTS Assistant! 👋
          </h1>
          <p className="text-[var(--text-secondary)] text-lg">
            Your comprehensive platform for IELTS preparation.
          </p>
        </div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Map through sections array to create cards */}
          {sections.map((section) => (
            <Link
              key={section.path}
              href={section.path}
              className={`
                // Card styling - Clean white surface with subtle border
                block p-6 rounded-xl border
                bg-white border-[var(--border-subtle)]
                // Hover effects
                hover:shadow-lg hover:border-[var(--slate-gray)]
                // Smooth transitions
                transition-all duration-200
              `}
            >
              {/* Card content */}
              <div className="flex items-start gap-4">
                {/* Icon with background - Minimalist gray */}
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-[var(--surface-medium)] rounded-lg">
                  <span className="text-2xl">{section.icon}</span>
                </div>

                {/* Text content */}
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)] mb-1">
                    {section.name}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)]">
                    {section.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="mt-8 p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-light)]">
          <h2 className="font-semibold text-[var(--text-primary)] mb-2">
            📌 Getting Started
          </h2>
          <p className="text-[var(--text-secondary)] text-sm">
            Select any section from the sidebar or cards above to start practicing.
            Track your progress in the Stats page and customize your experience
            in Settings.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
