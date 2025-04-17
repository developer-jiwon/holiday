export function BackgroundIllustration() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Abstract mountains in Canadian style */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 opacity-10"
      >
        <path d="M0,800 Q250,650 500,750 T1000,800 L1000,1000 L0,1000 Z" fill="#a38b7b" opacity="0.3" />
        <path d="M0,850 Q200,750 400,800 T800,750 T1000,850 L1000,1000 L0,1000 Z" fill="#8b6e5a" opacity="0.2" />

        {/* Abstract trees */}
        <g opacity="0.15">
          <circle cx="200" cy="820" r="20" fill="#8b6e5a" />
          <circle cx="200" cy="780" r="15" fill="#8b6e5a" />
          <circle cx="200" cy="750" r="10" fill="#8b6e5a" />

          <circle cx="300" cy="830" r="25" fill="#8b6e5a" />
          <circle cx="300" cy="790" r="20" fill="#8b6e5a" />
          <circle cx="300" cy="760" r="15" fill="#8b6e5a" />

          <circle cx="400" cy="810" r="15" fill="#8b6e5a" />
          <circle cx="400" cy="780" r="10" fill="#8b6e5a" />

          <circle cx="600" cy="820" r="20" fill="#8b6e5a" />
          <circle cx="600" cy="780" r="15" fill="#8b6e5a" />

          <circle cx="700" cy="830" r="25" fill="#8b6e5a" />
          <circle cx="700" cy="790" r="20" fill="#8b6e5a" />
          <circle cx="700" cy="760" r="15" fill="#8b6e5a" />

          <circle cx="800" cy="810" r="15" fill="#8b6e5a" />
          <circle cx="800" cy="780" r="10" fill="#8b6e5a" />
        </g>
      </svg>
    </div>
  )
}
