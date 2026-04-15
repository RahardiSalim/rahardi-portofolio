'use client';

import { useEffect, useState } from 'react';

interface NotebookCell {
  cell_type: 'code' | 'markdown' | 'raw';
  source: string[];
  outputs?: NotebookOutput[];
  execution_count?: number | null;
}

interface NotebookOutput {
  output_type: string;
  text?: string[];
  data?: { 'text/plain'?: string[]; 'image/png'?: string };
}

interface NotebookData {
  cells: NotebookCell[];
}

interface NotebookViewerProps {
  url: string;
  name: string;
}

export function NotebookViewer({ url, name }: NotebookViewerProps) {
  const [notebook, setNotebook] = useState<NotebookData | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(r => r.json())
      .then((data: NotebookData) => { setNotebook(data); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, [url]);

  if (loading) return (
    <div className="space-y-3 animate-pulse p-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-8 bg-gray-200 dark:bg-gray-700 rounded" />
      ))}
    </div>
  );

  if (error || !notebook) return (
    <div className="p-6 text-center text-gray-400 dark:text-gray-500 font-mono text-sm">
      Failed to load notebook. <a href={url} target="_blank" rel="noopener noreferrer" className="underline">Download instead →</a>
    </div>
  );

  return (
    <div className="font-mono text-sm overflow-auto max-h-[70vh]">
      <div className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        {name} · {notebook.cells.length} cells
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {notebook.cells.map((cell, i) => (
          <NotebookCell key={i} cell={cell} />
        ))}
      </div>
    </div>
  );
}

function NotebookCell({ cell }: { cell: NotebookCell }) {
  const source = cell.source.join('');

  if (cell.cell_type === 'markdown') {
    return (
      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900/50">
        <pre className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 text-xs leading-relaxed font-sans">
          {source}
        </pre>
      </div>
    );
  }

  if (cell.cell_type === 'code') {
    return (
      <div>
        {/* Code cell */}
        <div className="flex">
          <div className="w-10 flex-shrink-0 text-right pr-3 pt-3 text-xs text-gray-400 dark:text-gray-600 select-none">
            [{cell.execution_count ?? ' '}]
          </div>
          <pre className="flex-1 px-3 py-3 overflow-x-auto bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200 text-xs leading-relaxed">
            <code>{source}</code>
          </pre>
        </div>
        {/* Outputs */}
        {cell.outputs && cell.outputs.length > 0 && (
          <div className="ml-10 border-l-2 border-orange-300 dark:border-orange-700 pl-3 py-2 bg-orange-50/50 dark:bg-orange-950/20">
            {cell.outputs.map((out, oi) => (
              <CellOutput key={oi} output={out} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return null;
}

function CellOutput({ output }: { output: NotebookOutput }) {
  if (output.data?.['image/png']) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`data:image/png;base64,${output.data['image/png']}`}
        alt="notebook output"
        className="max-w-full"
      />
    );
  }
  const text = output.text?.join('') ?? output.data?.['text/plain']?.join('') ?? '';
  if (!text) return null;
  return (
    <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap overflow-x-auto">
      {text}
    </pre>
  );
}
