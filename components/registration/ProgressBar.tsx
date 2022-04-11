import { motion } from 'framer-motion';
import React from 'react';

export default function ProgressBar({ time }: { time: number }) {
  const timeLeft = (100 / 60) * time;
  const percentageLeft = 100 - timeLeft;

  return (
    <motion.div
      className='h-2 bg-green shadow rounded-sm'
      transition={{
        duration: 0.5,
      }}
      layout
      initial={{ width: 0 }}
      animate={{
        width: percentageLeft + '%',
      }}
    />
  );
}
