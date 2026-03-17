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
    <div className="flex h-[100px] w-full items-center overflow-hidden bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 py-2 text-3xl text-white shadow-[0_16px_36px_rgba(168,85,247,0.18)]">
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
