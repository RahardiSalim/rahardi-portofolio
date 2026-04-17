'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { HeroImage } from '@/components/common/HeroImage';
import { Badge } from '@/components/ui/Badge';
import { SITE_GITHUB, SITE_LINKEDIN } from '@/lib/constants/metadata';

export function HomeHero() {
  return (
    <section className="container-custom section-spacing pt-24 md:pt-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-black dark:bg-white" />
            <Badge variant="outline">Data Science &amp; AI Engineer</Badge>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-8 dark:text-white leading-[0.9] tracking-tighter uppercase">
            RAHARDI<br />SALIM
          </h1>

          <p className="text-xl md:text-2xl mb-10 text-gray-800 dark:text-gray-300 max-w-2xl font-light leading-relaxed">
            Specialist in <span className="font-mono font-bold italic">Machine Learning</span>,
            NLP, and Computer Vision. Currently pursuing Computer Science at University of Indonesia.
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            <Link
              href="/projects"
              className="inline-block bg-black dark:bg-white text-white dark:text-black px-10 py-5 text-sm font-mono uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-all"
            >
              View Projects
            </Link>
            <a
              href="mailto:rahardisalim23@gmail.com"
              className="inline-block border border-black dark:border-white text-black dark:text-white px-10 py-5 text-sm font-mono uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
            >
              Get in Touch
            </a>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <a
              href={SITE_LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors border-b border-transparent hover:border-black dark:hover:border-white pb-0.5"
            >
              LinkedIn
            </a>
            <span className="text-gray-300 dark:text-gray-700">|</span>
            <a
              href={SITE_GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors border-b border-transparent hover:border-black dark:hover:border-white pb-0.5"
            >
              GitHub
            </a>
            <span className="text-gray-300 dark:text-gray-700">|</span>
            <a
              href="/assets/RahardiSalim_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors border-b border-transparent hover:border-black dark:hover:border-white pb-0.5"
            >
              Resume
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
          className="flex justify-center lg:justify-end"
        >
          <HeroImage />
        </motion.div>
      </div>
    </section>
  );
}
