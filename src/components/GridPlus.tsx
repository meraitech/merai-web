// components/CalmGridPlus.tsx
"use client";

export default function GridPlus({
  grid = 50, // jarak antar garis (px)
  plusGap = 200, // jarak antar tanda plus (px)
  plusSize = 6, // panjang satu sisi tanda plus (px)
  stroke = "rgba(255,255,255,0.25)", // warna grid
  plusStroke = "rgba(255,255,255,0.6)", // warna tanda plus
  bg = "#171717", // warna dasar (abu2 lembut)
}: {
  grid?: number;
  plusGap?: number;
  plusSize?: number;
  stroke?: string;
  plusStroke?: string;
  bg?: string;
}) {
  return (
    <div className="absolute inset-0 -z-10">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* GRID tipis */}
          <pattern
            id="grid"
            width={grid}
            height={grid}
            patternUnits="userSpaceOnUse"
          >
            <rect width={grid} height={grid} fill={bg} />
            {/* garis horizontal & vertical */}
            <path d={`M 0 0 H ${grid}`} stroke={stroke} strokeWidth="1" />
            <path d={`M 0 0 V ${grid}`} stroke={stroke} strokeWidth="1" />
          </pattern>

          {/* PLUS di jarak lebih lebar */}
          <pattern
            id="pluses"
            width={plusGap}
            height={plusGap}
            patternUnits="userSpaceOnUse"
          >
            {/* tanda plus di tengah tile */}
            <g transform={`translate(${plusGap / 2}, ${plusGap / 2})`}>
              {/* garis vertikal */}
              <line
                x1="0"
                y1={-plusSize}
                x2="0"
                y2={plusSize}
                stroke={plusStroke}
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              {/* garis horizontal */}
              <line
                x1={-plusSize}
                y1="0"
                x2={plusSize}
                y2="0"
                stroke={plusStroke}
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </g>
          </pattern>

          {/* vignette halus biar calm */}
          <radialGradient id="vignette" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.12)" />
          </radialGradient>
        </defs>

        {/* layer bg + grid */}
        <rect width="100%" height="100%" fill="url(#grid)" />
        {/* layer plus */}
        <rect width="100%" height="100%" fill="url(#pluses)" opacity="0.9" />
        {/* vignette halus */}
        <rect width="100%" height="100%" fill="url(#vignette)" />
      </svg>
    </div>
  );
}
