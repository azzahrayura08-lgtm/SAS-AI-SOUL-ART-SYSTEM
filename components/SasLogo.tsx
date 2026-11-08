import React from 'react';

export type LogoVariant = 'horizontal' | 'square' | 'stacked' | 'icon';

interface SasLogoProps {
  variant?: LogoVariant;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showSlogan?: boolean;
  transparent?: boolean;
}

/**
 * Interconnected S-A-S Monogram Symbol
 * Precision vector geometry with luxury metallic rose gold, dusty pink, and ivory gradients.
 */
export const SasMonogram: React.FC<{ size?: number; className?: string }> = ({ 
  size = 40,
  className = '' 
}) => {
  const id = React.useId();
  const gradMetallic = `sas-rose-gold-${id}`;
  const gradLight = `sas-ivory-glow-${id}`;
  const gradDark = `sas-dusty-shadow-${id}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-300 ${className}`}
      aria-label="SAS Monogram Symbol"
    >
      <defs>
        {/* Luxury Metallic Rose Gold Linear Gradient */}
        <linearGradient id={gradMetallic} x1="10" y1="10" x2="110" y2="110" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FAF7F2" />
          <stop offset="25%" stopColor="#F5D0C5" />
          <stop offset="50%" stopColor="#E5AA9C" />
          <stop offset="75%" stopColor="#C98B94" />
          <stop offset="100%" stopColor="#9A5A65" />
        </linearGradient>

        {/* Soft Ivory Specular Glow */}
        <linearGradient id={gradLight} x1="60" y1="0" x2="60" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FAF7F2" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#E5AA9C" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#9A5A65" stopOpacity="0.1" />
        </linearGradient>

        {/* Dusty Pink Inner Shadow Gradient */}
        <linearGradient id={gradDark} x1="120" y1="20" x2="0" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E5AA9C" />
          <stop offset="70%" stopColor="#C98B94" />
          <stop offset="100%" stopColor="#4A2E35" />
        </linearGradient>

        {/* Subtle drop shadow filter for depth */}
        <filter id={`shadow-${id}`} x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Decorative Outer Harmonic Diamond / Ring */}
      <circle
        cx="60"
        cy="60"
        r="54"
        stroke={`url(#${gradMetallic})`}
        strokeWidth="1.2"
        strokeOpacity="0.35"
        strokeDasharray="4 2"
      />
      
      {/* Outer Diamond Accents */}
      <polygon
        points="60,8 112,60 60,112 8,60"
        fill="none"
        stroke={`url(#${gradMetallic})`}
        strokeWidth="0.8"
        strokeOpacity="0.25"
      />

      {/* Cardinal Star Accents */}
      <circle cx="60" cy="8" r="1.5" fill="#FAF7F2" />
      <circle cx="112" cy="60" r="1.5" fill="#E5AA9C" />
      <circle cx="60" cy="112" r="1.5" fill="#FAF7F2" />
      <circle cx="8" cy="60" r="1.5" fill="#E5AA9C" />

      {/* =========================================================
          THE INTERCONNECTED S-A-S MONOGRAM
          Central majestic 'A' interlocked with left 'S' & right 'S'
         ========================================================= */}
      <g filter={`url(#shadow-${id})`}>

        {/* Central Spire Arch of 'A' (Main Apex & Legs) */}
        <path
          d="M60 22 L36 88 H44 L51 68 H69 L76 88 H84 L60 22 Z M53.5 61 L60 41 L66.5 61 H53.5 Z"
          fill={`url(#${gradMetallic})`}
          stroke="#0C0C10"
          strokeWidth="0.8"
        />

        {/* Central A Crossbar Luxury Bar Accent */}
        <path
          d="M49 61.5 H71"
          stroke="#FAF7F2"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Left 'S' - Intertwining gracefully through the left leg of 'A' */}
        {/* Upper curve of Left S */}
        <path
          d="M48 38 C44 32, 34 30, 27 34 C20 38, 20 46, 26 50 C32 54, 46 56, 46 65 C46 74, 37 78, 28 77 C22 76, 17 72, 16 68"
          fill="none"
          stroke={`url(#${gradMetallic})`}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Left S Highlight line */}
        <path
          d="M47 38 C43.5 32.5, 34.5 30.5, 28 34.2 C21.5 38, 21.5 45.5, 27 49.5 C33 53.5, 45 55.5, 45 64.5 C45 73, 36.5 77, 28.5 76"
          fill="none"
          stroke="#FAF7F2"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeOpacity="0.75"
        />

        {/* Right 'S' - Harmonically mirrored, intertwining through the right leg of 'A' */}
        {/* Upper curve of Right S */}
        <path
          d="M72 38 C76 32, 86 30, 93 34 C100 38, 100 46, 94 50 C88 54, 74 56, 74 65 C74 74, 83 78, 92 77 C98 76, 103 72, 104 68"
          fill="none"
          stroke={`url(#${gradDark})`}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Right S Highlight line */}
        <path
          d="M73 38 C76.5 32.5, 85.5 30.5, 92 34.2 C98.5 38, 98.5 45.5, 93 49.5 C87 53.5, 75 55.5, 75 64.5 C75 73, 83.5 77, 91.5 76"
          fill="none"
          stroke="#FAF7F2"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeOpacity="0.75"
        />

        {/* Interlocking Link Rings at Intersections (Infinity ribbon effect) */}
        <circle cx="43.5" cy="52" r="2" fill="#FAF7F2" />
        <circle cx="76.5" cy="52" r="2" fill="#FAF7F2" />

        {/* Crown Star Spark at Apex of A */}
        <path
          d="M60 12 L61.5 17.5 L67 19 L61.5 20.5 L60 26 L58.5 20.5 L53 19 L58.5 17.5 Z"
          fill="#FAF7F2"
        />
      </g>
    </svg>
  );
};

/**
 * Complete Responsive SAS Logo Suite
 * Supports:
 * - 'horizontal' (for headers, top bars, footers)
 * - 'square' (for mobile app icons, favicons, avatar badges)
 * - 'stacked' (for hero sections, splash screens, about pages)
 * - 'icon' (monogram symbol only)
 */
export const SasLogo: React.FC<SasLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  className = '',
  showSlogan = true,
  transparent = true,
}) => {
  // Sizing definitions
  const iconSizes = {
    sm: 28,
    md: 38,
    lg: 52,
    xl: 76,
  };

  const currentIconSize = iconSizes[size];

  // ========================================================
  // VARIANT: ICON ONLY (MONOGRAM)
  // ========================================================
  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <SasMonogram size={currentIconSize} />
      </div>
    );
  }

  // ========================================================
  // VARIANT: SQUARE (MOBILE APP ICON / APPMARK)
  // Suitable for mobile app icons, square avatars, app drawer
  // ========================================================
  if (variant === 'square') {
    const squareSizes = {
      sm: 'w-12 h-12 p-2 rounded-xl',
      md: 'w-20 h-20 p-3 rounded-2xl',
      lg: 'w-32 h-32 p-4 rounded-3xl',
      xl: 'w-44 h-44 p-6 rounded-[36px]',
    };

    return (
      <div className={`relative flex flex-col items-center justify-center group ${className}`}>
        <div 
          className={`relative flex items-center justify-center border border-[#E5AA9C]/40 shadow-xl overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:border-[#E5AA9C] ${
            transparent 
              ? 'bg-gradient-to-br from-[#1C1A24]/90 via-[#14131A]/95 to-[#0C0C10]' 
              : 'bg-[#0C0C10]'
          } ${squareSizes[size]}`}
        >
          {/* Subtle inner metallic radial light */}
          <div className="absolute inset-0 bg-radial from-[#E5AA9C]/15 via-transparent to-transparent opacity-80 pointer-events-none" />
          
          {/* Inner hairline border */}
          <div className="absolute inset-1 rounded-[inherit] border border-[#FAF7F2]/10 pointer-events-none" />

          {/* Centered Interconnected Monogram */}
          <div className="relative z-10 flex items-center justify-center">
            <SasMonogram size={currentIconSize} />
          </div>
        </div>

        {/* Optional text caption below app icon */}
        {showSlogan && (size === 'lg' || size === 'xl') && (
          <div className="text-center mt-3 space-y-0.5">
            <span className="font-serif text-xs tracking-wider uppercase text-[#FAF7F2] font-semibold block">
              SAS SOUL ART SYSTEM
            </span>
            <span className="text-[10px] tracking-wide text-[#E5AA9C] font-sans block">
              Create Your Dream with AI
            </span>
          </div>
        )}
      </div>
    );
  }

  // ========================================================
  // VARIANT: STACKED (GRAND HERO LOCKUP)
  // Centered monogram on top, brand name and slogan below
  // ========================================================
  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center space-y-3 ${className}`}>
        {/* Monogram with radiant halo */}
        <div className="relative flex items-center justify-center">
          <div className="absolute -inset-4 bg-[#E5AA9C]/15 rounded-full blur-xl pointer-events-none" />
          <SasMonogram size={currentIconSize * 1.2} />
        </div>

        {/* Brand Name & Slogan Block */}
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-2">
            <span className="w-6 h-[1px] bg-gradient-to-r from-transparent to-[#E5AA9C]/60" />
            <h1 className="font-serif tracking-[0.22em] text-[#FAF7F2] font-bold text-lg sm:text-2xl uppercase">
              SAS SOUL ART SYSTEM
            </h1>
            <span className="w-6 h-[1px] bg-gradient-to-l from-transparent to-[#E5AA9C]/60" />
          </div>

          {showSlogan && (
            <p className="font-serif italic text-xs sm:text-sm tracking-widest text-[#E5AA9C] font-medium">
              Create Your Dream with AI
            </p>
          )}
        </div>
      </div>
    );
  }

  // ========================================================
  // VARIANT: HORIZONTAL (DEFAULT FOR DASHBOARD HEADER)
  // Left: Monogram Symbol | Right: Wordmark & Slogan
  // ========================================================
  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 group focus-visible:outline-none ${className}`}>
      {/* Monogram Symbol */}
      <div className="relative flex items-center justify-center shrink-0">
        <SasMonogram size={currentIconSize} className="group-hover:rotate-3 transition-transform" />
      </div>

      {/* Typography Wordmark + Slogan */}
      <div className="flex flex-col justify-center text-left min-w-0">
        <div className="flex items-center gap-1.5 leading-none">
          <span className="font-serif text-base sm:text-lg font-bold tracking-[0.14em] text-[#FAF7F2] group-hover:text-[#E5AA9C] transition-colors uppercase whitespace-nowrap">
            SAS
          </span>
          <span className="font-serif text-xs sm:text-sm font-semibold tracking-wider text-[#FAF7F2]/90 group-hover:text-[#FAF7F2] transition-colors uppercase whitespace-nowrap hidden xs:inline">
            SOUL ART SYSTEM
          </span>
        </div>

        {showSlogan && (
          <span className="text-[8px] sm:text-[9.5px] tracking-wide text-[#E5AA9C] font-serif italic mt-0.5 whitespace-nowrap truncate max-w-[160px] sm:max-w-none">
            Create Your Dream with AI
          </span>
        )}
      </div>
    </div>
  );
};
