"use client";

import { useState } from "react";
import Link from "next/link";
import * as Icons from "lucide-react";
import { NavMenuItem } from "@/app/types/navigation";
import navigationData from "@/app/data/navigation.json";

interface SidebarProps {
  isOpen?: boolean;
}

export function Sidebar({ isOpen = true }: SidebarProps) {
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const menuItems: NavMenuItem[] = navigationData.mainMenu;

  const toggleMenu = (label: string) => {
    setExpandedMenu(expandedMenu === label ? null : label);
  };

  // Get icon component by name
  const getIcon = (iconName: string, size = 20) => {
    // @ts-expect-error - Dynamic icon name from lucide-react
    const IconComponent = Icons[iconName];
    return IconComponent ? (
      <IconComponent size={size} className="flex-shrink-0" />
    ) : null;
  };

  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-64px)] w-64 bg-blue-950 text-white overflow-y-auto transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <div key={item.label}>
            {/* Main Menu Item */}
            <button
              onClick={() => toggleMenu(item.label)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-900 transition-colors text-sm"
            >
              {getIcon(item.icon, 18)}
              <span className="flex-1 text-left font-medium">{item.label}</span>
              {item.children && (
                <Icons.ChevronDown
                  size={16}
                  className={`transition-transform ${
                    expandedMenu === item.label ? "rotate-180" : ""
                  }`}
                />
              )}
            </button>

            {/* Submenu Items */}
            {item.children && expandedMenu === item.label && (
              <div className="ml-4 space-y-1 mt-1 border-l border-blue-900 pl-0">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="flex items-center gap-3 px-4 py-2 text-xs text-blue-300 hover:text-white hover:bg-blue-900 rounded-lg transition-colors"
                  >
                    <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
