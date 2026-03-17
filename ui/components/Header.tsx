"use client";

/**
 * Header Component
 *
 * The top navigation bar that appears at the top of the application.
 * It contains the page title and a profile dropdown menu.
 *
 * Key Features:
 * - Displays the current page title
 * - Profile icon in the top-right corner
 * - Dropdown menu with: Profile, Stats, Settings
 * - Click outside to close dropdown
 *
 * Props:
 * - pageTitle: string - the title of the current page to display
 */

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface HeaderProps {
  pageTitle: string;  // The title to display in the header
}

// Define the dropdown menu items
interface MenuItem {
  name: string;      // Display name
  path: string;      // URL path
  icon: string;      // Emoji icon
}

const menuItems: MenuItem[] = [
  { name: "Profile", path: "/profile", icon: "👤" },
  { name: "Stats", path: "/stats", icon: "📊" },
  { name: "Settings", path: "/settings", icon: "⚙️" },
];

export default function Header({ pageTitle }: HeaderProps) {
  // State to control dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // useRef creates a reference to a DOM element
  // We use it to detect clicks outside the dropdown to close it
  const dropdownRef = useRef<HTMLDivElement>(null);

  // useEffect runs side effects after component renders
  // This effect adds a click event listener to the document
  useEffect(() => {
    // Function to handle clicks outside the dropdown
    function handleClickOutside(event: MouseEvent) {
      // Check if the click happened outside the dropdown element
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        // Close the dropdown if clicked outside
        setIsDropdownOpen(false);
      }
    }

    // Add the event listener when dropdown is open
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup function: remove event listener when component unmounts
    // or when isDropdownOpen changes
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);  // Re-run effect when isDropdownOpen changes

  // Toggle dropdown open/closed state
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    // Header container
    // - Sticky positioning: stays at top when scrolling
    // - White background with subtle border
    // - Flexbox for layout (title on left, profile on right)
    <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-6 border-b border-[var(--border-subtle)] bg-white/95 backdrop-blur-sm">
      {/* Page Title */}
      <h2 className="text-lg font-semibold text-[var(--text-primary)]">
        {pageTitle}
      </h2>

      {/* Profile Section */}
      <div className="relative" ref={dropdownRef}>
        {/*
          Profile Button
          - Circular button with user icon
          - Clicking toggles the dropdown menu
        */}
        <button
          onClick={toggleDropdown}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--surface-medium)] hover:bg-[var(--light-gray)] transition-all duration-200"
          aria-label="Open profile menu"
          aria-expanded={isDropdownOpen}  // Accessibility: tells screen readers if menu is open
        >
          {/* User icon - emoji (can be replaced with SVG) */}
          <span className="text-xl">👤</span>
        </button>

        {/*
          Dropdown Menu
          - Only rendered when isDropdownOpen is true
          - Absolute positioning: appears below the profile button
          - White background with subtle border
        */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[var(--border-subtle)] py-2">
            {/* Menu header */}
            <div className="px-4 py-2 border-b border-[var(--border-subtle)]">
              <p className="text-sm font-semibold text-[var(--text-primary)]">Menu</p>
            </div>

            {/* Menu Items */}
            <nav className="flex flex-col">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsDropdownOpen(false)}  // Close dropdown on click
                  className={`
                    // Layout & Spacing
                    flex items-center gap-3 px-4 py-3
                    // Transition effects
                    transition-all duration-200
                    // Hover state
                    hover:bg-[var(--surface-light)] hover:text-[var(--charcoal)]
                    // Text color
                    text-[var(--text-secondary)]
                  `}
                >
                  {/* Menu item icon */}
                  <span className="text-lg">{item.icon}</span>
                  {/* Menu item name */}
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
