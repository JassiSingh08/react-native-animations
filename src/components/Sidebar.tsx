import { Moon, Search, Sun } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { animations } from "../data/animations";
import { useDarkMode } from "../hooks/useDarkMode";

interface SidebarProps {
  currentAnimationId: string | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  currentAnimationId,
  isOpen,
  setIsOpen,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const filteredAnimations = animations.filter(
    (animation) =>
      animation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animation.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
        fixed top-0 left-0 min-h-screen bg-white dark:bg-gray-800 shadow-lg 
        transition-transform duration-300 ease-in-out z-10
        w-72 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }
        lg:w-72 lg:sticky overflow-y-auto
      `}
      >
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/"
              className="flex justify-center items-center text-xl font-bold text-indigo-600 dark:text-indigo-400"
            >
              <img
                src="/react-native-animations/react-native-animtions.png"
                alt="logo"
                className="w-12 h-12 mr-2 rounded-lg"
              />
              React Native Animations
            </Link>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search animations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>

          <nav>
            <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Animations
            </h2>
            <ul className="space-y-1">
              {filteredAnimations.map((animation) => (
                <li key={animation.id}>
                  <Link
                    to={`/animation/${animation.id}`}
                    className={`
                      block px-3 py-2 rounded-md text-sm
                      ${
                        currentAnimationId === animation.id
                          ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }
                    `}
                    onClick={() => setIsOpen(false)}
                  >
                    {animation.name}
                  </Link>
                </li>
              ))}
              {filteredAnimations.length === 0 && (
                <li className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                  No results found
                </li>
              )}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
