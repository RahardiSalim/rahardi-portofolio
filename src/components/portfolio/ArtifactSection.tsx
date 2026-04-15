'use client';

import { useState } from 'react';
import type { ArtifactFile } from '@/types/portfolio.types';
import { NotebookViewer } from './NotebookViewer';

const CATEGORY_LABELS: Record<ArtifactFile['category'], string> = {
  code:     'Code',
  ppt:      'Slides',
  proposal: 'Proposal',
  other:    'Files',
};

const TYPE_ICONS: Record<ArtifactFile['type'], string> = {
  notebook: '📓',
  pdf:      '📄',
  video:    '🎥',
  other:    '📁',
};

interface ArtifactSectionProps {
  artifacts: ArtifactFile[];
}

export function ArtifactSection({ artifacts }: ArtifactSectionProps) {
  const [active, setActive] = useState<ArtifactFile | null>(null);

  if (!artifacts || artifacts.length === 0) return null;

  // Group by category
  const grouped = artifacts.reduce<Record<string, ArtifactFile[]>>((acc, a) => {
    (acc[a.category] ??= []).push(a);
    return acc;
  }, {});

  const displayName = (name: string) =>
    name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mb-8">
      <h2 className="text-sm uppercase tracking-widest font-mono mb-6 dark:text-white">Artifacts</h2>

      <div className="space-y-6">
        {(Object.keys(grouped) as ArtifactFile['category'][]).map(cat => (
          <div key={cat}>
            <p className="text-xs font-mono uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
              {CATEGORY_LABELS[cat] ?? cat}
            </p>
            <div className="flex flex-wrap gap-3">
              {grouped[cat].map((artifact, i) => (
                <button
                  key={i}
                  onClick={() => setActive(active?.url === artifact.url ? null : artifact)}
                  className={`inline-flex items-center gap-2 border px-4 py-2 text-sm font-mono transition-colors ${
                    active?.url === artifact.url
                      ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
                      : 'border-black dark:border-gray-600 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <span>{TYPE_ICONS[artifact.type]}</span>
                  <span className="max-w-xs truncate">{displayName(artifact.name)}</span>
                  <span className="text-xs opacity-60">{active?.url === artifact.url ? '▲' : '▼'}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Inline viewer */}
      {active && (
        <div className="mt-6 border border-black dark:border-gray-600 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <span className="text-xs font-mono text-gray-600 dark:text-gray-400 truncate">
              {TYPE_ICONS[active.type]} {active.name}
            </span>
            <div className="flex items-center gap-3 flex-shrink-0 ml-4">
              <a
                href={active.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              >
                Open ↗
              </a>
              <button
                onClick={() => setActive(null)}
                className="text-xs font-mono text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Content */}
          {active.type === 'notebook' ? (
            <NotebookViewer url={active.url} name={active.name} />
          ) : active.type === 'video' ? (
            <video controls className="w-full max-h-[70vh] bg-black">
              <source src={active.url} />
              Your browser does not support video.
            </video>
          ) : (
            <iframe
              src={active.url}
              className="w-full"
              style={{ height: '70vh' }}
              title={active.name}
            />
          )}
        </div>
      )}
    </div>
  );
}
