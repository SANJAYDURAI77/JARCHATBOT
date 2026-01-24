import { useState, useRef, useEffect } from 'react';
import { Send, Mic, Radio } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { CharacterSidebar } from './CharacterSidebar';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: '1',
    type: 'ai',
    content: 'Good evening, sir. Probe online and ready to assist.',
    timestamp: new Date(Date.now() - 120000),
  },
  {
    id: '2',
    type: 'user',
    content: 'Run a full system diagnostic.',
    timestamp: new Date(Date.now() - 90000),
  },
  {
    id: '3',
    type: 'ai',
    content: 'All systems operational. Power levels at 100%. Network connectivity stable. No anomalies detected.',
    timestamp: new Date(Date.now() - 60000),
  },
];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');
    
    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: getAIResponse(inputValue),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const getAIResponse = (userInput: string): string => {
    const responses = [
      'Understood. Processing your request now.',
      'Affirmative. Running analysis on the specified parameters.',
      'Data retrieved successfully. Shall I display the results?',
      'All systems are operating within normal parameters.',
      'I have completed the requested operation, sir.',
      'Integration complete. Would you like me to continue?',
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 gap-6">
      {/* Character Sidebar */}
      <CharacterSidebar />

      {/* Main Chat Interface */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl h-[85vh] flex flex-col"
      >
        {/* Header */}
        <div className="relative mb-4">
          <div className="flex items-center justify-between px-6 py-4 rounded-t-xl border border-cyan-500/30 bg-black/40 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
              </div>
              <div>
                <h1 className="text-cyan-400 font-light tracking-[0.2em] text-sm">probe</h1>
                <p className="text-emerald-400/60 text-xs font-light">AI Assistant Interface</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-xs font-light">ONLINE</span>
            </div>
          </div>
          {/* Top glow */}
          <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
        </div>

        {/* Chat Container */}
        <div className="relative flex-1 rounded-xl border border-cyan-500/30 bg-black/40 backdrop-blur-sm overflow-hidden">
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-emerald-400/50" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-emerald-400/50" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400/50" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400/50" />

          {/* Messages Area */}
          <div className="h-full overflow-y-auto px-6 py-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-cyan-500/20">
            <AnimatePresence>
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </AnimatePresence>
            
            {isTyping && <TypingIndicator />}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="relative mt-4">
          <div className={`flex items-end gap-3 px-6 py-4 rounded-xl border transition-all duration-300 ${
            isFocused 
              ? 'border-cyan-400/60 bg-black/60 shadow-[0_0_20px_rgba(34,211,238,0.2)]' 
              : 'border-cyan-500/30 bg-black/40'
          } backdrop-blur-sm`}>
            <div className="flex-1">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Enter command..."
                className="w-full bg-transparent border-none outline-none text-emerald-100 placeholder-emerald-400/40 font-light tracking-wide"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="group p-2 rounded-lg border border-emerald-500/30 bg-black/40 hover:bg-emerald-500/10 hover:border-emerald-400/60 transition-all duration-300 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                aria-label="Voice input"
              >
                <Mic className="w-4 h-4 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
              </button>
              
              <button
                type="button"
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="group p-2 rounded-lg border border-cyan-500/30 bg-black/40 hover:bg-cyan-500/10 hover:border-cyan-400/60 transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-black/40 disabled:hover:border-cyan-500/30 disabled:hover:shadow-none"
              >
                <Send className="w-4 h-4 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
              </button>
            </div>
          </div>
          
          {/* Bottom glow */}
          {isFocused && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}