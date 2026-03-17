"use client";

/**
 * DashboardLayout Component
 *
 * A reusable layout wrapper that provides the consistent structure for all pages.
 * It includes the collapsible sidebar and the header with profile dropdown.
 *
 * Key Features:
 * - Uses shared sidebar state from context
 * - Provides consistent layout across all pages
 * - Responsive: content area adjusts based on sidebar state
 *
 * Usage:
 * Wrap any page content with <DashboardLayout pageTitle="Page Name">
 */

import Sidebar from "./Sidebar";
import Header from "./Header";
import { useSidebarState } from "./SidebarStateContext";

interface DashboardLayoutProps {
  children: React.ReactNode;  // The page content to render inside the layout
  pageTitle: string;          // Title to display in the header
}

export default function DashboardLayout({ children, pageTitle }: DashboardLayoutProps) {
  // Get shared sidebar state from context
  const { isCollapsed, toggle } = useSidebarState();

  return (
    // Main container: full viewport height, flexbox for layout
    <div className="flex min-h-screen bg-[var(--bg-primary)]">
      {/* 
        Sidebar Component
        - Passes collapsed state and toggle function from context
        - Fixed on the left side, doesn't scroll with content
      */}
      <Sidebar
        isCollapsed={isCollapsed}
        toggleSidebar={toggle}
      />

      {/* 
        Main Content Area
        - Takes remaining width (flex-1)
        - Left margin adjusts based on sidebar state
        - When sidebar collapsed: margin-left = 5rem (80px)
        - When sidebar expanded: margin-left = 16rem (256px)
        - Smooth transition matches sidebar animation
      */}
      <main
        className={`flex-1 transition-all duration-300 ease-in-out
          ${isCollapsed ? "ml-20" : "ml-64"}`}
      >
        {/* Header Component */}
        <Header pageTitle={pageTitle} />
        
        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
