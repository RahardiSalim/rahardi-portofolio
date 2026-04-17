'use client';

import { useEffect, useState } from 'react';
import { Mdx } from '@/components/common/Mdx';

interface NotebookCell {
  cell_type: 'code' | 'markdown' | 'raw';
  source: string | string[];
  outputs?: NotebookOutput[];
  execution_count?: number | null;
}

interface NotebookOutput {
  output_type: string;
  text?: string | string[];
  data?: { 'text/plain'?: string | string[]; 'image/png'?: string };
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
      .then((r) => r.json())
      .then((data: NotebookData) => { setNotebook(data); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, [url]);

  if (loading) {
    return (
      <div className="space-y-3 animate-pulse p-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-8 bg-gray-200 dark:bg-gray-700 rounded" />
        ))}
      </div>
    );
  }

  if (error || !notebook) {
    return (
      <div className="p-6 text-center text-gray-400 dark:text-gray-500 font-mono text-sm">
        Failed to load notebook.{' '}
        <a href={url} target="_blank" rel="noopener noreferrer" className="underline">
          Download instead →
        </a>
      </div>
    );
  }

  return (
    <div className="font-mono text-sm overflow-auto max-h-[70vh]">
      <div className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 sticky top-0 z-10">
        {name} · {notebook.cells.length} cells
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {notebook.cells.map((cell, i) => (
          <CellRenderer key={i} cell={cell} />
        ))}
      </div>
    </div>
  );
}

function toText(value: string | string[] | undefined): string {
  if (!value) return '';
  return Array.isArray(value) ? value.join('') : value;
}

function CellRenderer({ cell }: { cell: NotebookCell }) {
  const source = toText(cell.source);

  if (cell.cell_type === 'markdown') {
    return (
      <div className="px-10 py-6 bg-gray-50 dark:bg-gray-900/30">
        <Mdx content={source} className="!text-sm" />
      </div>
    );
  }

  if (cell.cell_type === 'code') {
    return (
      <div className="group">
        <div className="flex bg-white dark:bg-gray-950">
          <div className="w-10 flex-shrink-0 text-right pr-3 pt-4 text-[10px] font-mono text-gray-300 dark:text-gray-700 select-none border-r border-gray-50 dark:border-gray-900">
            [{cell.execution_count ?? ' '}]
          </div>
          <pre className="flex-1 px-4 py-4 overflow-x-auto text-gray-800 dark:text-gray-200 text-xs leading-relaxed font-mono">
            <code>{source}</code>
          </pre>
        </div>
        {cell.outputs && cell.outputs.length > 0 && (
          <div className="ml-10 border-l border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 px-4 py-3">
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
      <div className="my-2 bg-white p-2 inline-block border border-gray-100 dark:border-gray-800">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/png;base64,${output.data['image/png']}`}
          alt="notebook output"
          className="max-w-full h-auto"
        />
      </div>
    );
  }
  const text = toText(output.text) || toText(output.data?.['text/plain']) || '';
  if (!text) return null;
  return (
    <pre className="text-[11px] text-gray-500 dark:text-gray-400 whitespace-pre-wrap overflow-x-auto font-mono py-1">
      {text}
    </pre>
  );
}
