'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Layout } from '@/components/layout/Layout';
import type { Certification } from '@/types/portfolio.types';
import { motion } from 'framer-motion';
import { Badge } from '@/components/common/Badge';
import Image from 'next/image';

export default function CertificationsPage() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCertifications() {
      try {
        const response = await fetch('/api/portfolio');
        const data = await response.json();
        setCertifications(data.certifications || []);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch certifications:', error);
        setLoading(false);
      }
    }
    fetchCertifications();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="container-custom section-spacing min-h-[60vh] flex items-center justify-center">
          <div className="animate-pulse font-mono uppercase tracking-widest">Loading Certifications...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="container-custom pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24 border-b-8 border-black dark:border-white pb-12"
        >
          <h1 className="text-6xl md:text-8xl font-black mb-8 dark:text-white tracking-tighter uppercase">
            Professional<br />Credentials
          </h1>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl font-light leading-relaxed">
              Industry-recognized certifications validating expertise in AI, Machine Learning, and Data Science.
            </p>
            <div className="text-xs font-mono uppercase tracking-widest text-gray-400">
              {certifications.length} Certifications
            </div>
          </div>
        </motion.div>

        {certifications.length === 0 ? (
          <div className="text-center py-32 border-2 border-dashed border-gray-200 dark:border-gray-800">
            <p className="text-gray-500 dark:text-gray-400 font-mono uppercase tracking-widest">No certifications indexed yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.07 }}
              >
                <Link href={`/certifications/${cert.slug}`} className="group flex flex-col border border-black dark:border-gray-700 overflow-hidden hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-xl transition-all duration-300 h-full">
                  {cert.previewImage && (
                    <div className="relative w-full h-44 bg-gray-50 dark:bg-gray-800 border-b border-black/10 dark:border-white/10">
                      <Image
                        src={cert.previewImage}
                        alt={cert.title}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <Badge variant="outline" className="text-[10px] py-0.5 shrink-0">{cert.issuer}</Badge>
                      <span className="text-xs font-mono text-gray-400 whitespace-nowrap">{cert.date}</span>
                    </div>
                    <h3 className="text-base font-bold dark:text-white leading-tight mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{cert.title}</h3>
                    {cert.shortDescription && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-2 line-clamp-3">{cert.shortDescription}</p>
                    )}
                    {cert.credentialId && (
                      <p className="text-xs font-mono text-gray-400 mt-auto pt-4">ID: {cert.credentialId}</p>
                    )}
                    <div className="mt-4 flex justify-between items-center text-xs font-mono uppercase tracking-widest text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>View Details</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}
