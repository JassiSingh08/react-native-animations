import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useDarkMode } from '../hooks/useDarkMode';

interface CodeBlockProps {
  code: string;
  language: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);
  const { isDarkMode } = useDarkMode();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="relative group rounded-lg overflow-hidden">
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 p-2 bg-gray-800 dark:bg-gray-700 bg-opacity-70 rounded-md text-white z-10 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Copy code to clipboard"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
      <SyntaxHighlighter
        language={language === 'typescript' ? 'tsx' : 'jsx'}
        style={isDarkMode ? vscDarkPlus : vs}
        customStyle={{
          margin: 0,
          padding: '1rem',
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
        }}
        showLineNumbers
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;