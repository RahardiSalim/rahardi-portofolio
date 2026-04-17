'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { DarkModeToggle } from '@/components/common/DarkModeToggle';
import { NAV_LINKS } from '@/lib/constants/navigation';

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-black dark:border-gray-700 transition-colors"
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20 md:h-24">
          <Link href="/" className="text-2xl md:text-3xl font-black tracking-tighter dark:text-white uppercase">
            RS<span className="text-blue-600">.</span>
          </Link>

          <div className="hidden md:flex items-center gap-4 md:gap-6">
            <ul className="flex items-center gap-6 md:gap-8">
              {NAV_LINKS.map((item) => {
                const isActive =
                  item.href === '/' ? pathname === '/' : pathname?.startsWith(item.href);
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`text-xs md:text-sm font-mono uppercase tracking-widest transition-all relative group ${
                        isActive
                          ? 'text-black dark:text-white font-bold'
                          : 'text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white'
                      }`}
                    >
                      {item.name}
                      <span
                        className={`absolute -bottom-1 left-0 h-[2px] bg-blue-600 transition-all duration-300 ${
                          isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
            <DarkModeToggle />
          </div>

          <div className="md:hidden flex items-center gap-4">
            <DarkModeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-black dark:text-white p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-black dark:border-gray-700 bg-white dark:bg-gray-900"
            >
              <ul className="flex flex-col py-4">
                {NAV_LINKS.map((item) => {
                  const isActive =
                    item.href === '/' ? pathname === '/' : pathname?.startsWith(item.href);
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`block px-4 py-3 text-sm font-mono uppercase tracking-wider transition-colors ${
                          isActive
                            ? 'text-black dark:text-white bg-gray-50 dark:bg-gray-800'
                            : 'text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
