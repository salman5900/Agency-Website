import { type ReactNode } from 'react';
import { motion, type Variants } from 'motion/react';

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

// Wait until the element reaches ~18% above the bottom edge of the viewport
// so visitors clearly see step-by-step reveals in their active reading zone.
const VIEWPORT_CONFIG = {
  once: true,
  amount: 0.08,
  margin: '0px 0px -18% 0px',
} as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  duration?: number;
}

/**
 * GPU-composited scroll reveal (transform + opacity only for smooth 60fps on all hardware).
 */
export function Reveal({
  children,
  className = '',
  delay = 0,
  distance = 22,
  duration = 0.55,
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_CONFIG}
      transition={{
        duration,
        delay,
        ease: EASE_OUT_EXPO,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.04,
    },
  },
};

const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.52,
      ease: EASE_OUT_EXPO,
    },
  },
};

interface RevealStaggerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Orchestrates step-by-step sequential entrances for sibling cards or list rows.
 */
export function RevealStagger({ children, className = '' }: RevealStaggerProps) {
  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_CONFIG}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface RevealItemProps {
  children: ReactNode;
  className?: string;
}

export function RevealItem({ children, className = '' }: RevealItemProps) {
  return (
    <motion.div variants={staggerItemVariants} className={className}>
      {children}
    </motion.div>
  );
}
