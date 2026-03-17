"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  Moon,
  Sun,
  Bell,
  ChevronDown,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { User as UserType } from "@/app/types/navigation";
import userData from "@/app/data/user.json";

interface TopBarProps {
  onMenuToggle?: (isOpen: boolean) => void;
}

export function TopBar({ onMenuToggle }: TopBarProps) {
  const [isDark, setIsDark] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const currentUser: UserType = userData.currentUser;

  const toggleTheme = () => {
    setIsDark(!isDark);
    // Theme logic will be implemented later
  };

  const toggleSidebar = () => {
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);
    onMenuToggle?.(newState);
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-blue-900 border-b border-blue-950 shadow-lg z-50">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left Section - Logo & Menu Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-blue-800 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <Menu size={24} className="text-white" />
          </button>

          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SM</span>
            </div>
            <span className="font-bold text-base text-white">Stock Mgmt</span>
          </Link>
        </div>

        {/* Right Section - User & Controls */}
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <button className="relative p-2 text-blue-100 hover:bg-blue-800 rounded-lg transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-blue-100 hover:bg-blue-800 rounded-lg transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Divider */}
          <div className="w-px h-6 bg-blue-800"></div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 px-3 py-2 hover:bg-blue-800 rounded-lg transition-colors"
            >
              <div className="flex flex-col items-end">
                <span className="text-xs font-medium text-white">
                  {currentUser.name}
                </span>
                <span className="text-xs bg-blue-800 text-blue-100 px-2 py-0.5 rounded">
                  {currentUser.role}
                </span>
              </div>

              {/* Avatar Placeholder */}
              <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                {currentUser.name.charAt(0)}
              </div>

              <ChevronDown
                size={16}
                className={`text-blue-100 transition-transform ${
                  isUserMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* User Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-blue-850 rounded-lg shadow-lg border border-blue-900 py-1">
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-blue-100 hover:bg-blue-900">
                  <User size={16} />
                  Profile
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-blue-100 hover:bg-blue-900">
                  <Settings size={16} />
                  Settings
                </button>
                <hr className="my-1 border-blue-800" />
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-blue-900">
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
