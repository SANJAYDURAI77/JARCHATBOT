import { motion } from 'motion/react';
import { Activity, Zap, Shield, Cpu } from 'lucide-react';
import { useEffect, useState } from 'react';

export function CharacterSidebar() {
  const [currentThought, setCurrentThought] = useState(0);

  const thoughts = [
    "Standing by for instructions",
    "All systems operational",
    "Ready to assist you",
    "Monitoring incoming queries",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentThought((prev) => (prev + 1) % thoughts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-80 h-[85vh] flex flex-col"
    >
      {/* AI Character Card */}
      <div className="relative rounded-xl border border-cyan-500/30 bg-black/40 backdrop-blur-sm overflow-hidden flex-1 flex flex-col">
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400/50" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-emerald-400/50" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-400/50" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-emerald-400/50" />
        
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          {/* Main AI Orb */}
          <div className="relative w-64 h-64 flex items-center justify-center mb-8">
            {/* Outer glow ring */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute w-56 h-56 rounded-full border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 to-emerald-400/10"
            />

            {/* Middle ring */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 20, repeat: Infinity, ease: "linear" }
              }}
              className="absolute w-44 h-44 rounded-full border border-cyan-400/30"
              style={{
                background: 'conic-gradient(from 0deg, transparent 0deg, rgba(6, 182, 212, 0.3) 90deg, transparent 180deg)',
              }}
            />

            {/* Core orb */}
            <div className="relative w-32 h-32 rounded-full border-2 border-cyan-400/50 bg-gradient-to-br from-black via-cyan-950/50 to-black flex items-center justify-center overflow-hidden">
              {/* Inner pulse */}
              <motion.div
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400/40 to-emerald-400/40 blur-xl"
              />
              
              {/* Center icon */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <Cpu className="w-16 h-16 text-cyan-400/80" />
              </motion.div>
            </div>

            {/* Orbiting particles */}
            {[0, 120, 240].map((angle, i) => (
              <motion.div
                key={i}
                animate={{
                  rotate: [angle, angle + 360],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.1,
                }}
                className="absolute w-48 h-48"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              </motion.div>
            ))}
          </div>

          {/* AI Name and Status */}
          <div className="text-center space-y-3 w-full">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-2xl font-light tracking-[0.3em] text-cyan-400"
            >
              PROBE
            </motion.h2>
            
            <div className="flex items-center justify-center gap-2">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
              />
              <span className="text-emerald-400 text-sm font-light tracking-wider">ONLINE</span>
            </div>
          </div>
        </div>

        {/* Status Section */}
        <div className="border-t border-cyan-500/20 p-6 space-y-4">
          {/* Current State */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-cyan-400/60 font-light tracking-wider">STATUS</span>
              <span className="text-xs text-emerald-400/80 font-light">ACTIVE</span>
            </div>
            
            {/* Thought bubble */}
            <motion.div
              key={currentThought}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.5 }}
              className="text-sm text-cyan-100/70 font-light italic flex items-center gap-2"
            >
              <motion.div
                animate={{
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
                className="w-1 h-1 rounded-full bg-cyan-400"
              />
              "{thoughts[currentThought]}"
            </motion.div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-cyan-500/10">
            <div className="flex items-center gap-2">
              <Zap className="w-3 h-3 text-emerald-400/60" />
              <div className="flex flex-col">
                <span className="text-xs text-cyan-400/50 font-light">Power</span>
                <span className="text-xs text-emerald-400 font-light">100%</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Activity className="w-3 h-3 text-cyan-400/60" />
              <div className="flex flex-col">
                <span className="text-xs text-cyan-400/50 font-light">Response</span>
                <span className="text-xs text-cyan-400 font-light">12ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}