import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Breadcrumbs from "./Breadcrumbs";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  let currentAnimationId: string | null = null;

  if (path.startsWith("/animation/")) {
    currentAnimationId = path.split("/animation/")[1];
  }

  const isHomePage = path === "/";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="flex flex-col md:flex-row">
        {!isHomePage && (
          <Sidebar
            currentAnimationId={currentAnimationId}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        )}
        <main className="flex-1">
          <div className="px-4 py-3 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
            <Breadcrumbs
              currentAnimationId={currentAnimationId}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
