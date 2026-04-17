'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Certification } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Mdx } from '@/components/common/Mdx';

interface CertificationDetailProps {
  certification: Certification;
}

export function CertificationDetail({ certification }: CertificationDetailProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="container-custom section-spacing"
    >
      <div className="max-w-3xl mx-auto">
        <Link
          href="/certifications"
          className="inline-block mb-10 text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white border-b border-transparent hover:border-black dark:hover:border-white pb-0.5 transition-all"
        >
          ← Back to Certifications
        </Link>

        <header className="mb-12">
          <p className="text-sm font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3">
            {certification.issuer}
          </p>
          <h1 className="text-4xl md:text-5xl font-black mb-6 dark:text-white tracking-tighter">
            {certification.title}
          </h1>
          {certification.credentialId && (
            <Badge variant="outline">Credential ID: {certification.credentialId}</Badge>
          )}
        </header>

        {certification.longDescription && (
          <div className="prose dark:prose-invert max-w-none">
            <Mdx content={certification.longDescription} />
          </div>
        )}
      </div>
    </motion.div>
  );
}
