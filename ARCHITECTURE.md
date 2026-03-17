# Stock Management System - Architecture Overview

## Project Structure

```
app/
├── components/
│   ├── layout/
│   │   ├── TopBar.tsx          # Top navigation bar with user menu
│   │   ├── Sidebar.tsx         # Left sidebar with navigation menu
│   │   ├── LayoutWrapper.tsx   # Layout wrapper combining both bars
│   │   └── index.ts            # Export all layout components
│   ├── PagePlaceholder.tsx     # Reusable page placeholder component
│   └── ...                     # Other components (to be added)
├── data/
│   ├── navigation.json         # Mock data for navigation menu
│   └── user.json               # Mock data for current user
├── types/
│   └── navigation.ts           # TypeScript interfaces for navigation
├── dashboard/                  # Dashboard section pages
├── master-data/                # Master data section pages
├── stock-management/           # Stock management section pages  
├── transactions/               # Transactions section pages
├── reports/                    # Reports section pages
├── user-management/            # User management section pages
├── layout.tsx                  # Root layout with LayoutWrapper
├── page.tsx                    # Home page
└── globals.css                 # Global styles
```

## Features Implemented

### 1. **TopBar Component**
- Logo and app branding
- Menu toggle button
- Notification bell
- Theme toggle (light/dark)
- User profile dropdown with:
  - User name
  - Role tag
  - User avatar
  - Quick menu (Profile, Settings, Logout)

### 2. **Sidebar Component**
- Expandable/collapsible menu items
- 6 main menu categories:
  - Dashboard (3 submenus)
  - Master Data (4 submenus)
  - Stock Management (3 submenus)
  - Transactions (2 submenus)
  - Reports (3 submenus)
  - User Management (3 submenus)
- Smooth animations and hover effects
- Active menu indication

### 3. **Navigation Architecture**
- Menu driven from `app/data/navigation.json`
- Easy to update menu structure
- Icon support via lucide-react
- Responsive design

### 4. **Page Structure**
- All routes set up with placeholder pages
- Consistent page layout pattern
- Mock user data in `app/data/user.json`

## How to Use

### Running the Application
```bash
npm run dev
```
Then open http://localhost:3000

### Adding New Menu Items
Edit `app/data/navigation.json`:
```json
{
  "label": "New Section",
  "href": "/new-section",
  "icon": "IconName",  // From lucide-react
  "children": [
    {
      "label": "Subsection",
      "href": "/new-section/subsection"
    }
  ]
}
```

### Creating New Pages
1. Create folder: `app/section-name/page.tsx`
2. Use PagePlaceholder component:
```tsx
import PagePlaceholder from "@/app/components/PagePlaceholder";

export default function Page() {
  return <PagePlaceholder title="Page Title" description="Optional description" />;
}
```

### Updating User Data
Edit `app/data/user.json` to change current user information

## Design System

- **Layout**: Flexbox + Grid (Tailwind)
- **Colors**: Slate color palette
- **Icons**: Lucide React (20-24px)
- **Typography**: Geist font family
- **Spacing**: Tailwind default spacing scale

## Next Steps

1. Add custom UI components for each page
2. Implement theme toggle functionality
3. Add data tables and forms
4. Connect to backend API
5. Add authentication
6. Implement dynamic menu highlighting based on current route
