'use client';

import { motion } from 'framer-motion';

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-5xl md:text-6xl font-black dark:text-white mb-2">{number}</div>
      <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-light">{label}</p>
    </motion.div>
  );
}

export function HomeStats() {
  return (
    <section className="container-custom py-24 border-t border-black dark:border-gray-800">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
        <Stat number="07" label="Competition Wins" />
        <Stat number="12" label="Major Projects" />
        <Stat number="06" label="Tech Roles" />
        <Stat number="04" label="Specializations" />
      </div>
    </section>
  );
}
