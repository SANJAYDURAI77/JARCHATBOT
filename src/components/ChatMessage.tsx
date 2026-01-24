import { motion } from 'motion/react';
import { User, Cpu } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.type === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`flex gap-3 mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="shrink-0 mt-1">
          <div className="relative w-8 h-8 rounded-lg border border-cyan-400/40 bg-black/60 flex items-center justify-center">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <div className="absolute inset-0 rounded-lg bg-cyan-400/10 blur-sm" />
          </div>
        </div>
      )}

      <div className={`flex flex-col max-w-[75%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`relative px-4 py-3 rounded-lg backdrop-blur-sm ${
            isUser
              ? 'bg-emerald-500/10 border border-emerald-400/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
              : 'bg-cyan-500/10 border border-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.1)]'
          }`}
        >
          {/* Corner accent */}
          <div className={`absolute top-0 ${isUser ? 'right-0' : 'left-0'} w-6 h-6 border-t ${
            isUser ? 'border-r border-emerald-400/40' : 'border-l border-cyan-400/40'
          }`} />
          <p className={`font-light tracking-wide leading-relaxed ${
            isUser ? 'text-emerald-100' : 'text-cyan-100'
          }`}>
            {message.content}
          </p>

          {/* Glow effect */}
          <div className={`absolute inset-0 rounded-lg blur-md -z-10 ${
            isUser ? 'bg-emerald-500/5' : 'bg-cyan-500/5'
          }`} />
        </div>

        <span className={`text-xs mt-1.5 font-light ${
          isUser ? 'text-emerald-400/50' : 'text-cyan-400/50'
        }`}>
          {message.timestamp.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </span>
      </div>

      {isUser && (
        <div className="shrink-0 mt-1">
          <div className="relative w-8 h-8 rounded-lg border border-emerald-400/40 bg-black/60 flex items-center justify-center">
            <User className="w-4 h-4 text-emerald-400" />
            <div className="absolute inset-0 rounded-lg bg-emerald-400/10 blur-sm" />
          </div>
        </div>
      )}
    </motion.div>
  );
}
