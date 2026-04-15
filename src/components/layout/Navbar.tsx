'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { DarkModeToggle } from '../common/DarkModeToggle';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Work', href: '/experience' },
  { name: 'Projects', href: '/projects' },
  { name: 'Awards', href: '/competitions' },
  { name: 'About', href: '/about' },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-black dark:border-gray-700 transition-colors"
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="text-xl md:text-2xl font-light tracking-tight dark:text-white">
            Rahardi Salim
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-4 md:gap-6">
            <ul className="flex items-center gap-6 md:gap-8">
              {navigation.map((item) => {
                const isActive = item.href === '/' ? pathname === '/' : pathname?.startsWith(item.href);
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`text-sm md:text-base font-mono uppercase tracking-wider transition-colors ${
                        isActive ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
