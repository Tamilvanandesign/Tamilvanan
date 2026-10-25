import React from 'react';

interface LogoProps {
  variant?: 'full' | 'compact' | 'icon-only';
  theme?: 'dark' | 'light' | 'auto';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  theme = 'light',
  className = '',
  size = 'md',
}) => {
  // Dimensions
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  const taglineSizes = {
    sm: 'text-[9px] tracking-wider',
    md: 'text-[11px] tracking-widest',
    lg: 'text-xs tracking-widest',
    xl: 'text-sm tracking-widest',
  };

  const textColor = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const taglineColor = theme === 'dark' ? 'text-cyan-400' : 'text-cyan-700';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Original TTS Monogram & Laptop Tech Emblem */}
      <div className={`relative flex-shrink-0 ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          <defs>
            {/* Tech Gradient Navy to Cyan */}
            <linearGradient id="ttsBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B192C" />
              <stop offset="100%" stopColor="#1E3E62" />
            </linearGradient>

            <linearGradient id="ttsCyanGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>

            <linearGradient id="ttsAmberAccent" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>

          {/* Outer Rounded Hexagonal Tech Shield */}
          <rect
            x="4"
            y="4"
            width="92"
            height="92"
            rx="22"
            fill="url(#ttsBgGrad)"
            stroke="#0891B2"
            strokeWidth="2"
          />

          {/* Circuit Tech Accent Grid Lines */}
          <path
            d="M16 30H28L36 38"
            stroke="#06B6D4"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeOpacity="0.6"
          />
          <circle cx="16" cy="30" r="2.5" fill="#38BDF8" />

          <path
            d="M84 70H72L64 62"
            stroke="#06B6D4"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeOpacity="0.6"
          />
          <circle cx="84" cy="70" r="2.5" fill="#38BDF8" />

          {/* Laptop Screen & Keyboard Base Silhouette */}
          {/* Laptop Display */}
          <rect
            x="24"
            y="24"
            width="52"
            height="34"
            rx="4"
            fill="#030712"
            stroke="url(#ttsCyanGlow)"
            strokeWidth="2"
          />
          {/* Laptop Base / Trackpad bar */}
          <path
            d="M18 61C18 59.8954 18.8954 59 20 59H80C81.1046 59 82 59.8954 82 61L86 67C86 68.6569 84.6569 70 83 70H17C15.3431 70 14 68.6569 14 67L18 61Z"
            fill="#1E293B"
            stroke="#06B6D4"
            strokeWidth="1.5"
          />
          {/* Trackpad notch */}
          <rect x="42" y="61" width="16" height="3" rx="1.5" fill="url(#ttsAmberAccent)" />

          {/* TTS Monogram on Screen */}
          {/* Letter T (Left) */}
          <path
            d="M30 31H38M34 31V48"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Central Highlight Monogram 'T' (Center with Amber Accent) */}
          <path
            d="M45 29H55M50 29V50"
            stroke="url(#ttsAmberAccent)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* Letter S (Right in Cyan) */}
          <path
            d="M68 34C67 32 64.5 31 62 31C59.5 31 58 32.5 58 34.5C58 37 60 38 63 39.5C66.5 41 68 42.5 68 45C68 47.5 66 49 63 49C60 49 58 47.5 57 45.5"
            stroke="#38BDF8"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Digital pulse indicator */}
          <circle cx="50" cy="51" r="1.5" fill="#F59E0B" />
        </svg>
      </div>

      {/* Typography: Business Name & Tagline */}
      {variant !== 'icon-only' && (
        <div className="flex flex-col text-left leading-tight">
          <div className="flex items-center gap-1.5 font-extrabold tracking-tight">
            <span className={`font-black ${titleSizes[size]} ${textColor} tracking-tight uppercase`}>
              Tamil Tech
            </span>
            <span className={`font-black ${titleSizes[size]} text-cyan-500 uppercase`}>
              Solutions
            </span>
          </div>
          {variant === 'full' && (
            <span className={`font-bold uppercase ${taglineSizes[size]} ${taglineColor}`}>
              Your Trusted IT Partner
            </span>
          )}
        </div>
      )}
    </div>
  );
};
