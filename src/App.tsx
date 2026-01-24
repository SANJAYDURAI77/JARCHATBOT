import { useState, useRef, useEffect } from 'react';
import { ChatInterface } from './components/ChatInterface';

export default function App() {
  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,255,170,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,170,0.03)_1px,transparent_1px)] bg-size-[50px_50px] animate-grid" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,100,255,0.15),transparent_70%)]" />
      
      {/* Scanline effect */}
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,255,170,0.02)_50%)] bg-size-[100%_4px] animate-scanline" />
      
      <ChatInterface />
    </div>
  );
}
