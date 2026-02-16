'use client';
import React from 'react';

const keyframes = `
  @keyframes marquee {
    0%   { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
  }
`;

const marqueeStyle: React.CSSProperties = {
  animation: 'marquee 30s linear infinite',
  whiteSpace: 'nowrap',
  display: 'inline-block',
};

export default function TickerTape() {
  return (
    <div className="w-full overflow-hidden bg-black text-white text-3xl h-[100px] flex items-center py-2">
      {/* inject keyframes */}
      <style>{keyframes}</style>

      {/* moving container */}
      <div style={marqueeStyle} className="flex items-center w-full">
        <span className="mx-4">📸 Welcome to my Photography Portfolio</span>
        <span className="mx-4">🌍 Based in the UK & Morocco</span>
        <span className="mx-4">🕋 Islamic-Inspired Visuals</span>
        <span className="mx-4">📧 Contact me for collaborations!</span>
      </div>
    </div>
  );
}
