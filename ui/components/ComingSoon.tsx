/**
 * ComingSoon Component
 * 
 * A reusable placeholder component for pages that are not yet implemented.
 * Displays a friendly message indicating the feature is coming soon.
 * 
 * Key Features:
 * - Clean, centered design
 * - Customizable page name
 * - Decorative emoji icon
 * 
 * Props:
 * - pageName: string - the name of the page/feature (e.g., "Listening", "Reading")
 * 
 * Usage:
 * <ComingSoon pageName="Listening" />
 * Renders: "Listening Coming Soon!"
 */

interface ComingSoonProps {
  pageName: string;  // The name of the page/feature
}

export default function ComingSoon({ pageName }: ComingSoonProps) {
  return (
    // Container: centers content vertically and horizontally
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      {/* Decorative Icon */}
      <div className="text-6xl mb-6">🚧</div>
      
      {/* Main Heading */}
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        {pageName} Coming Soon!
      </h1>
      
      {/* Subtitle/Description */}
      <p className="text-lg text-gray-600 text-center max-w-md">
        We're working hard to bring you this feature. Check back soon!
      </p>

      {/* Optional decorative elements */}
      <div className="mt-8 flex gap-2">
        <span className="text-2xl">🎯</span>
        <span className="text-2xl">📚</span>
        <span className="text-2xl">✨</span>
      </div>
    </div>
  );
}
