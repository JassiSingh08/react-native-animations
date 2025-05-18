import { ArrowRight, ExternalLink } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { animations } from "../data/animations";

const HomePage: React.FC = () => {
  return (
    <div className="py-8 px-4 md:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <img
          src="/react-native-animations/react-native-animtions-text.png"
          alt="React Native Animation Components"
          className="rounded-lg mb-4"
        />
        {/* <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          React Native Animation Components
        </h1> */}
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A comprehensive and open source library of customizable,
          performance-optimized animation components for React Native
          applications.
        </p>
      </div>

      <Link
        to={`/animation/${animations[0].id}`}
        className="max-w-36 text-gray-600 mb-6 flex justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-3 py-1.5 overflow-hidden border-2 rounded-full group"
      >
        Explore
        <svg
          className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45 group-hover:scale-150"
          viewBox="0 0 16 19"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
            className="fill-gray-800 group-hover:fill-gray-800"
          ></path>
        </svg>
      </Link>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-purple-900/30 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
            Why Use These Animations?
          </h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-indigo-600 dark:text-indigo-400 mr-2">
                ✓
              </span>
              <span className="text-gray-700 dark:text-gray-300">
                Performance optimized with native drivers
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 dark:text-indigo-400 mr-2">
                ✓
              </span>
              <span className="text-gray-700 dark:text-gray-300">
                TypeScript support with full type definitions
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 dark:text-indigo-400 mr-2">
                ✓
              </span>
              <span className="text-gray-700 dark:text-gray-300">
                Well-documented with usage examples
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-indigo-900/30 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
            Getting Started
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Browse our collection of animations, copy the code, and integrate
            them directly into your React Native project.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            All components are designed to be drop-in solutions with minimal
            dependencies.
          </p>
          <div className="mt-2">
            <a
              href="https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              React Native Reanimated docs
              <ExternalLink size={14} className="ml-1" />
            </a>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-indigo-900/30 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          NOTE:
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          All animations are built using React Native Reanimated (unless
          specified) and require it to be installed in your project. Please
          ensure you have the correct version of Reanimated installed.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Available Animations
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {animations.map((animation) => (
          <Link
            key={animation.id}
            to={`/animation/${animation.id}`}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-5 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              {animation.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm line-clamp-2">
              {animation.description}
            </p>
            <div className="flex items-center text-indigo-600 dark:text-indigo-400 text-sm font-medium">
              View details
              <ArrowRight size={16} className="ml-1" />
            </div>
          </Link>
        ))}
      </div>

      {/* CONTRIBUTE TO GITHUB HIDDEN */}
      <div className="hidden text-center mt-12">
        <p className="text-gray-600 dark:text-gray-400">
          Have a suggestion for a new animation component?
          <a
            href="https://github.com/yourusername/react-native-animations"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 dark:text-indigo-400 ml-1 hover:underline"
          >
            Contribute on GitHub
          </a>
        </p>
      </div>
    </div>
  );
};

export default HomePage;
