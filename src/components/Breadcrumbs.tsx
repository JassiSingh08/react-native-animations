import { ChevronRight, Home, Menu, Moon, Sun, X } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { animations } from "../data/animations";
import { useDarkMode } from "../hooks/useDarkMode";

interface BreadcrumbsProps {
  currentAnimationId: string | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  currentAnimationId,
  isOpen,
  setIsOpen,
}) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const animation = currentAnimationId
    ? animations.find((anim) => anim.id === currentAnimationId)
    : null;

  return (
    <nav className="flex justify-between items-center" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <Home size={16} className="mr-1" />
            Home
          </Link>
        </li>

        {animation && (
          <>
            <li>
              <div className="flex items-center">
                <ChevronRight size={16} className="text-gray-400" />
                <span className="ml-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                  {animation.name}
                </span>
              </div>
            </li>
          </>
        )}
      </ol>
      {/* Mobile menu button */}
      {!isHomePage ? (
        <div className="lg:hidden z-999 top-0 right-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md bg-white dark:bg-gray-800 shadow-md"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      ) : (
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          aria-label={
            isDarkMode ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      )}
    </nav>
  );
};

export default Breadcrumbs;
