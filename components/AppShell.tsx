
"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "@/components/Sidebar";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setCollapsed((previous) => !previous);
  };

  const closeMobileSidebar = () => {
    setMobileOpen(false);
  };

  return (
    <div
      className={`app-shell ${
        collapsed ? "app-shell-collapsed" : ""
      }`}
    >
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onToggle={toggleSidebar}
        onClose={closeMobileSidebar}
      />

      <div className="app-main">
        <button
          type="button"
          className="mobile-sidebar-trigger"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={mobileOpen}
        >
          <Menu size={23} strokeWidth={1.6} />
        </button>

        <div className="app-content">
          {children}
        </div>
      </div>
    </div>
  );
}
