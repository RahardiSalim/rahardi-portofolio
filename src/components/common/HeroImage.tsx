'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function HeroImage() {
  const [isHovered, setIsHovered] = useState(false);

  const handleToggle = () => {
    setIsHovered(!isHovered);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleToggle();
        }
      }}
    >
      {/* Formal Image - Default */}
      <motion.div
        className="absolute inset-0 rounded-2xl overflow-hidden border-4 border-black dark:border-white"
        animate={{
          opacity: isHovered ? 0 : 1,
          rotateY: isHovered ? 180 : 0,
        }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      >
        <Image
          src="/assets/images/profil_formal.png"
          alt="Rahardi Salim - Professional"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Casual UI Image - On Hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl overflow-hidden border-4 border-black dark:border-white"
        animate={{
          opacity: isHovered ? 1 : 0,
          rotateY: isHovered ? 0 : -180,
        }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      >
        <Image
          src="/assets/images/profil_ui.png"
          alt="Rahardi Salim - Casual"
          fill
          className="object-cover"
        />
      </motion.div>

      {/* Hover/Click hint */}
      <motion.div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono text-gray-500 dark:text-gray-400"
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        Click to switch
      </motion.div>
    </motion.div>
  );
}
