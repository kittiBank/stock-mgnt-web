"use client";

import { useState } from "react";
import { TopBar } from "./TopBar";
import { Sidebar } from "./Sidebar";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-blue-50">
      <TopBar onMenuToggle={setIsSidebarOpen} />

      <div className="flex pt-16">
        <Sidebar isOpen={isSidebarOpen} />

        {/* Main Content */}
        <main
          className={`flex-1 transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-0"
          }`}
        >
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
