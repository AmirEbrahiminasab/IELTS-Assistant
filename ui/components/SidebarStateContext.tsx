"use client";

/**
 * SidebarStateContext
 *
 * Provides persistent sidebar collapsed state across all pages.
 * Uses localStorage to persist state between navigations.
 */

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface SidebarStateContextType {
  isCollapsed: boolean;
  toggle: () => void;
}

const SidebarStateContext = createContext<SidebarStateContextType | undefined>(undefined);

export function SidebarStateProvider({ children }: { children: ReactNode }) {
  // Start with false to match server render
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("sidebarCollapsed");
    if (saved !== null) {
      setIsCollapsed(JSON.parse(saved));
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when changed
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("sidebarCollapsed", JSON.stringify(isCollapsed));
    }
  }, [isCollapsed, isLoaded]);

  const toggle = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <SidebarStateContext.Provider value={{ isCollapsed, toggle }}>
      {children}
    </SidebarStateContext.Provider>
  );
}

export function useSidebarState() {
  const context = useContext(SidebarStateContext);
  if (context === undefined) {
    throw new Error("useSidebarState must be used within a SidebarStateProvider");
  }
  return context;
}
