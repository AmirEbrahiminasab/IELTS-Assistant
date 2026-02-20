# IELTS Assistant - Frontend UI

A modern, responsive web application built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

## 📁 Project Structure

```
ui/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Home page (default route /)
│   ├── layout.tsx                # Root layout (HTML structure)
│   ├── globals.css               # Global styles (Tailwind imports)
│   ├── listening/page.tsx        # Listening section page
│   ├── reading/page.tsx          # Reading section page
│   ├── writing/page.tsx          # Writing section page
│   ├── speaking/page.tsx         # Speaking section page
│   ├── profile/page.tsx          # User profile page
│   ├── stats/page.tsx            # Statistics/progress page
│   └── settings/page.tsx         # Application settings page
│
├── components/                   # Reusable React components
│   ├── Sidebar.tsx               # Collapsible navigation sidebar
│   ├── Header.tsx                # Top header with profile dropdown
│   ├── DashboardLayout.tsx       # Main layout wrapper
│   └── ComingSoon.tsx            # Placeholder component
│
├── public/                       # Static assets (images, fonts, etc.)
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
└── next.config.ts                # Next.js configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Navigate to the ui directory
cd ui

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create a production build
npm run build

# Start the production server
npm start
```

## 🎨 Features

### 1. Collapsible Sidebar
- Located on the left side of the screen
- Contains navigation to all major sections
- Can be minimized to show only icons (saves screen space)
- Smooth animations when collapsing/expanding
- Active state highlighting for current page

### 2. Navigation Sections
- **Home** - Main landing page with quick access cards
- **Listening** - Listening practice exercises (placeholder)
- **Reading** - Reading comprehension (placeholder)
- **Writing** - Writing exercises (placeholder)
- **Speaking** - Speaking practice (placeholder)

### 3. Profile Dropdown
- Located in the top-right corner
- Click the profile icon to reveal menu
- Options: Profile, Stats, Settings
- Closes when clicking outside

### 4. Responsive Design
- Adapts to different screen sizes
- Content area adjusts based on sidebar state
- Mobile-friendly layout

## 📚 Component Documentation

### DashboardLayout
The main layout wrapper that provides consistent structure across all pages.

```tsx
import DashboardLayout from "@/components/DashboardLayout";

export default function MyPage() {
  return (
    <DashboardLayout pageTitle="My Page">
      {/* Your page content here */}
    </DashboardLayout>
  );
}
```

### ComingSoon
A reusable placeholder component for pages under development.

```tsx
import ComingSoon from "@/components/ComingSoon";

export default function MyPage() {
  return (
    <DashboardLayout pageTitle="My Page">
      <ComingSoon pageName="My Feature" />
    </DashboardLayout>
  );
}
```

## 🎯 Key Concepts Explained

### TypeScript Interfaces
TypeScript adds type safety to your code. Interfaces define the shape of objects:

```tsx
interface NavItem {
  name: string;      // The display name
  path: string;      // URL path
  icon: string;      // Icon emoji
}
```

### React Hooks

**useState** - Manages component state:
```tsx
const [isCollapsed, setIsCollapsed] = useState(false);
// isCollapsed: current value
// setIsCollapsed: function to update the value
// false: initial value
```

**useEffect** - Runs side effects after render:
```tsx
useEffect(() => {
  // Code to run
  return () => {
    // Cleanup code (optional)
  };
}, [dependency]); // Re-run when dependency changes
```

**usePathname** - Next.js hook for current URL path:
```tsx
const pathname = usePathname();
// Returns: "/" or "/listening" etc.
```

### Tailwind CSS Classes

Tailwind uses utility classes for styling:

```tsx
<div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow">
  <!-- flex: use flexbox layout -->
  <!-- items-center: vertically center items -->
  <!-- gap-3: space between children -->
  <!-- p-4: padding (1rem) -->
  <!-- bg-white: white background -->
  <!-- rounded-lg: rounded corners -->
  <!-- shadow: drop shadow -->
</div>
```

### Conditional Classes

Use template literals for dynamic classes:

```tsx
className={`
  base-styles
  ${isActive ? "active-style" : "inactive-style"}
  ${isCollapsed ? "collapsed-style" : "expanded-style"}
`}
```

## 🔧 Customization

### Changing Colors
Edit `app/globals.css` to modify CSS variables or add custom styles.

### Adding New Pages
1. Create a new folder in `app/` with the page name
2. Add `page.tsx` inside the folder
3. Use `DashboardLayout` wrapper
4. Add navigation link in `components/Sidebar.tsx`

### Replacing Emoji Icons
Replace emoji strings with SVG icons:

```tsx
// Instead of:
icon: "🏠"

// Use an SVG component:
icon: <HomeIcon className="w-6 h-6" />
```

## 📝 Next Steps

1. **Add Real Content** - Replace placeholder pages with actual IELTS exercises
2. **State Management** - Add user authentication and progress tracking
3. **API Integration** - Connect to backend for data persistence
4. **Testing** - Add unit and integration tests
5. **Accessibility** - Ensure WCAG compliance
6. **Performance** - Optimize bundle size and loading times

## 🛠️ Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Clear Cache
```bash
# Remove .next folder and reinstall
rm -rf .next node_modules
npm install
```

### TypeScript Errors
```bash
# Check for type errors
npx tsc --noEmit
```

## 📖 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
