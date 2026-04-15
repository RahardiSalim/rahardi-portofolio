'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  href?: string;
  delay?: number;
}

export function Card({ children, className = '', href, delay = 0 }: CardProps) {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      className={`card-minimal ${className}`}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="block group">
        {content}
      </a>
    );
  }

  return content;
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
}

export function CardHeader({ title, subtitle, badge }: CardHeaderProps) {
  return (
    <div className="mb-4">
      {badge && (
        <span className="inline-block text-xs uppercase tracking-widest mb-2 text-gray-600 dark:text-gray-400">
          {badge}
        </span>
      )}
      <h3 className="heading-sm mb-1 dark:text-white">{title}</h3>
      {subtitle && (
        <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">{subtitle}</p>
      )}
    </div>
  );
}

interface CardBodyProps {
  children: ReactNode;
}

export function CardBody({ children }: CardBodyProps) {
  return (
    <div className="body-md text-gray-800 dark:text-gray-300">
      {children}
    </div>
  );
}

interface CardFooterProps {
  children: ReactNode;
}

export function CardFooter({ children }: CardFooterProps) {
  return (
    <div className="mt-6 flex items-center gap-4 text-sm">
      {children}
    </div>
  );
}
