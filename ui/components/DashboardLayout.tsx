"use client";

/**
 * DashboardLayout Component
 *
 * A reusable layout wrapper that provides the consistent structure for all pages.
 * It includes the collapsible sidebar and the header with profile dropdown.
 *
 * Key Features:
 * - Manages sidebar collapsed/expanded state
 * - Provides consistent layout across all pages
 * - Responsive: content area adjusts based on sidebar state
 * - Persists sidebar state in localStorage
 *
 * Usage:
 * Wrap any page content with <DashboardLayout pageTitle="Page Name">
 */

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface DashboardLayoutProps {
  children: React.ReactNode;  // The page content to render inside the layout
  pageTitle: string;          // Title to display in the header
}

export default function DashboardLayout({ children, pageTitle }: DashboardLayoutProps) {
  // State to track whether sidebar is collapsed
  // Initialize from localStorage if available, otherwise default to false (expanded)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sidebarCollapsed");
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  // Persist sidebar state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", JSON.stringify(isSidebarCollapsed));
  }, [isSidebarCollapsed]);

  // Function to toggle sidebar state
  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    // Main container: full viewport height, flexbox for layout
    <div className="flex min-h-screen bg-[var(--bg-primary)]">
      {/* 
        Sidebar Component
        - Passes collapsed state and toggle function
        - Fixed on the left side, doesn't scroll with content
      */}
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        toggleSidebar={toggleSidebar} 
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
          ${isSidebarCollapsed ? "ml-20" : "ml-64"}`}
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
