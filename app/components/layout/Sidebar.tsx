"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Icons from "lucide-react";
import { NavMenuItem } from "@/app/types/navigation";
import navigationData from "@/app/data/navigation.json";

interface SidebarProps {
  isOpen?: boolean;
}

export function Sidebar({ isOpen = true }: SidebarProps) {
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const menuItems: NavMenuItem[] = navigationData.mainMenu;

  const toggleMenu = (label: string) => {
    setExpandedMenu(expandedMenu === label ? null : label);
  };

  // Check if menu item or its children match current pathname
  const isMenuActive = (item: NavMenuItem): boolean => {
    if (item.href && pathname.startsWith(item.href)) {
      return true;
    }
    if (item.children) {
      return item.children.some((child) => pathname.startsWith(child.href));
    }
    return false;
  };

  // Check if a submenu item matches current pathname
  const isSubMenuActive = (href: string): boolean => {
    return pathname.startsWith(href);
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
        {menuItems.map((item) => {
          const active = isMenuActive(item);
          const hasActiveChild = item.children?.some((child) =>
            isSubMenuActive(child.href),
          );

          return (
            <div key={item.label}>
              {/* Main Menu Item */}
              <button
                onClick={() => toggleMenu(item.label)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm ${
                  active
                    ? "bg-blue-800 text-white font-semibold"
                    : "hover:bg-blue-900 text-white"
                }`}
              >
                {getIcon(item.icon, 18)}
                <span className="flex-1 text-left font-medium">
                  {item.label}
                </span>
                {item.children && (
                  <Icons.ChevronDown
                    size={16}
                    className={`transition-transform ${
                      expandedMenu === item.label || hasActiveChild
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                )}
              </button>

              {/* Submenu Items */}
              {item.children &&
                (expandedMenu === item.label || hasActiveChild) && (
                  <div className="ml-4 space-y-1 mt-1 border-l border-blue-900 pl-0">
                    {item.children.map((child) => {
                      const childActive = isSubMenuActive(child.href);
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`flex items-center gap-3 px-4 py-2 text-xs rounded-lg transition-colors ${
                            childActive
                              ? "bg-blue-800 text-white font-semibold"
                              : "text-blue-300 hover:text-white hover:bg-blue-900"
                          }`}
                        >
                          <span
                            className={`w-1 h-1 rounded-full ${
                              childActive ? "bg-blue-400" : "bg-blue-600"
                            }`}
                          ></span>
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
