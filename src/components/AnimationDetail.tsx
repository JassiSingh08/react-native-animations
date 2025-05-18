import React, { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { animations } from "../data/animations";
import { CodeLanguage } from "../types";
import CodeBlock from "./CodeBlock";
import { Tag as TagIcon, Download } from "lucide-react";

const AnimationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<CodeLanguage>("typescript");

  const animation = animations.find((anim) => anim.id === id);

  if (!animation) {
    return <Navigate to="/" replace />;
  }

  const downloadCode = () => {
    const code =
      activeTab === "typescript" ? animation.tsCode : animation.jsCode;
    const fileName = `${animation.name.replace(/\s+/g, "")}.${
      activeTab === "typescript" ? "tsx" : "jsx"
    }`;

    const element = document.createElement("a");
    const file = new Blob([code], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="py-8 px-4 md:px-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {animation.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4 ">
          {animation.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {animation.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
            >
              <TagIcon size={12} className="mr-1" />
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-10">
        <div>
          <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
            Use Cases
          </h2>
          <ul className="space-y-2 list-disc list-inside text-gray-600 dark:text-gray-400">
            {animation.useCases.map((useCase, index) => (
              <li key={index}>{useCase}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
          Preview
        </h2>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex items-center justify-center">
          <video
            key={animation.id}
            controls
            className="max-w-full h-auto rounded"
            style={{ maxHeight: "300px" }}
          >
            <source src={`/react-native-animations/videos/${animation.id}.mp4`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Implementation
          </h2>
          <button
            onClick={downloadCode}
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/50 dark:text-indigo-300 dark:hover:bg-indigo-900"
          >
            <Download size={16} className="mr-1.5" />
            Download Code
          </button>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab("typescript")}
              className={`flex-1 py-2 px-4 text-sm font-medium ${
                activeTab === "typescript"
                  ? "bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-500"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
              }`}
            >
              TypeScript
            </button>
            <button
              onClick={() => setActiveTab("javascript")}
              className={`flex-1 py-2 px-4 text-sm font-medium ${
                activeTab === "javascript"
                  ? "bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-500"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
              }`}
            >
              JavaScript
            </button>
          </div>

          <div className="p-4">
            <CodeBlock
              code={
                activeTab === "typescript" ? animation.tsCode : animation.jsCode
              }
              language={activeTab}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimationDetail;
