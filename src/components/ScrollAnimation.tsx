'use client';

import React from 'react';

// Try to import 'framer-motion', fallback to a passthrough if not available
let motion: any;
try {
  // @ts-ignore
  motion = require('framer-motion').motion;
} catch {
  motion = {
    div: ({ children, className }: any) => <div className={className}>{children}</div>
  };
}

import { ReactNode } from 'react';

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const ScrollAnimation = ({ children, className = "", delay = 0 }: ScrollAnimationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
