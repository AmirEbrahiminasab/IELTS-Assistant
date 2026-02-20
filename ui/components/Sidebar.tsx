"use client";

/**
 * Sidebar Component
 * 
 * This is the main navigation sidebar that appears on the left side of the application.
 * It contains navigation links to all major sections of the IELTS Assistant app.
 * 
 * Key Features:
 * - Collapsible: Can be minimized to show only icons, saving screen space
 * - Navigation links to: Home, Listening, Reading, Writing, Speaking
 * - Smooth transitions when collapsing/expanding
 * - Active state highlighting for current page
 * 
 * Props:
 * - isCollapsed: boolean - controls whether sidebar is minimized or not
 * - toggleSidebar: function - callback to toggle the collapsed state
 */

import Link from "next/link";
import { usePathname } from "next/navigation";

// Define the navigation items as an array of objects
// Each object represents a link in the sidebar
interface NavItem {
  name: string;      // Display name of the navigation item
  path: string;      // URL path for routing
  icon: string;      // Emoji icon (can be replaced with SVG icons later)
}

const navItems: NavItem[] = [
  { name: "Home", path: "/", icon: "🏠" },
  { name: "Listening", path: "/listening", icon: "🎧" },
  { name: "Reading", path: "/reading", icon: "📖" },
  { name: "Writing", path: "/writing", icon: "✍️" },
  { name: "Speaking", path: "/speaking", icon: "🎤" },
];

interface SidebarProps {
  isCollapsed: boolean;        // Whether the sidebar is currently minimized
  toggleSidebar: () => void;   // Function to toggle the collapsed state
}

export default function Sidebar({ isCollapsed, toggleSidebar }: SidebarProps) {
  // usePathname is a Next.js hook that returns the current URL path
  // We use it to highlight the active navigation item
  const pathname = usePathname();

  return (
    // Main sidebar container
    // - Fixed position on the left side of the screen
    // - Full height (h-screen)
    // - Width changes based on collapsed state (264px expanded, 80px collapsed)
    // - Smooth transition animation (transition-all duration-300)
    // - White background with subtle border
    <aside
      className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 
        transition-all duration-300 ease-in-out
        ${isCollapsed ? "w-20" : "w-64"}`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        {/* Logo/Title - only shown when sidebar is expanded */}
        {!isCollapsed && (
          <h1 className="text-xl font-bold text-gray-800">IELTS Assistant</h1>
        )}
        
        {/* Collapse/Expand Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {/* 
            Display different arrows based on collapsed state:
            - When collapsed: Right arrow (→) to indicate expanding
            - When expanded: Left arrow (←) to indicate collapsing
          */}
          <span className="text-lg text-gray-600">
            {isCollapsed ? "→" : "←"}
          </span>
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-2 p-4">
        {/* Map through navItems array to create navigation links */}
        {navItems.map((item) => {
          // Check if this item's path matches the current URL
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`
                flex items-center gap-3 px-3 py-3 rounded-lg
                transition-all duration-200
                hover:bg-gray-100
                ${isActive ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-700"}
                ${isCollapsed ? "justify-center" : ""}
              `}
              title={isCollapsed ? item.name : undefined}
            >
              {/* Icon - always visible */}
              <span className="text-xl">{item.icon}</span>
              
              {/* Navigation item name - hidden when sidebar is collapsed */}
              {!isCollapsed && (
                <span className="text-sm">{item.name}</span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
