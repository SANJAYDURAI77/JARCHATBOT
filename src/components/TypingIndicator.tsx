import { motion } from 'motion/react';
import { Cpu } from 'lucide-react';

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex gap-3 mb-6"
    >
      <div className="flex-shrink-0 mt-1">
        <div className="relative w-8 h-8 rounded-lg border border-cyan-400/40 bg-black/60 flex items-center justify-center">
          <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
          <div className="absolute inset-0 rounded-lg bg-cyan-400/10 blur-sm" />
        </div>
      </div>

      <div className="relative px-4 py-3 rounded-lg bg-cyan-500/10 border border-cyan-400/30 backdrop-blur-sm">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-cyan-400"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 rounded-lg bg-cyan-500/5 blur-md -z-10" />
      </div>
    </motion.div>
  );
}
