'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownProps {
  content: string;
  className?: string;
}

export function Markdown({ content, className = '' }: MarkdownProps) {
  return (
    <div className={`prose dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          // Minimalist styling for markdown elements
          h1: ({ ...props }) => <h1 className="text-3xl font-black mb-6 tracking-tighter uppercase dark:text-white" {...props} />,
          h2: ({ ...props }) => <h2 className="text-2xl font-bold mb-4 tracking-tight uppercase dark:text-white border-b border-black dark:border-white pb-2 inline-block" {...props} />,
          h3: ({ ...props }) => <h3 className="text-xl font-bold mb-3 tracking-tight dark:text-white" {...props} />,
          p: ({ ...props }) => <p className="mb-6 leading-relaxed text-gray-800 dark:text-gray-300" {...props} />,
          ul: ({ ...props }) => <ul className="list-none space-y-3 mb-6" {...props} />,
          li: ({ ...props }) => (
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-1.5 flex-shrink-0">●</span>
              <span className="text-gray-800 dark:text-gray-300" {...props} />
            </li>
          ),
          a: ({ ...props }) => <a className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-4 decoration-1" target="_blank" rel="noopener noreferrer" {...props} />,
          code: ({ ...props }) => <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded font-mono text-sm text-pink-600 dark:text-pink-400" {...props} />,
          pre: ({ ...props }) => <pre className="bg-gray-900 text-gray-100 p-6 rounded-none border border-black dark:border-gray-700 overflow-x-auto mb-6 font-mono text-sm" {...props} />,
          blockquote: ({ ...props }) => <blockquote className="border-l-4 border-blue-500 pl-6 italic text-gray-600 dark:text-gray-400 mb-6" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
