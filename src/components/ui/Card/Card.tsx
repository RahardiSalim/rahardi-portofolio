'use client';

import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function Card({ children, className = '', delay = 0 }: CardProps) {
  return (
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
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  className?: string;
}

export function CardHeader({ title, subtitle, badge, className = '' }: CardHeaderProps) {
  return (
    <div className={`mb-4 ${className}`}>
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
  className?: string;
}

export function CardBody({ children, className = '' }: CardBodyProps) {
  return (
    <div className={`body-md text-gray-800 dark:text-gray-300 ${className}`}>
      {children}
    </div>
  );
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`mt-6 flex items-center gap-4 text-sm ${className}`}>
      {children}
    </div>
  );
}
