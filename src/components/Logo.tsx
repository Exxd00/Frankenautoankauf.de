export function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle cx="50" cy="50" r="48" fill="#EA580C" />

      {/* Car body */}
      <path
        d="M20 55 L25 45 L35 40 L65 40 L75 45 L80 55 L80 65 L20 65 Z"
        fill="white"
        stroke="white"
        strokeWidth="2"
      />

      {/* Car roof */}
      <path
        d="M30 40 L35 30 L65 30 L70 40"
        fill="white"
        stroke="white"
        strokeWidth="2"
      />

      {/* Windows */}
      <path
        d="M35 38 L38 32 L50 32 L50 38 Z"
        fill="#EA580C"
      />
      <path
        d="M52 38 L52 32 L62 32 L65 38 Z"
        fill="#EA580C"
      />

      {/* Wheels */}
      <circle cx="32" cy="65" r="8" fill="#333" stroke="white" strokeWidth="2" />
      <circle cx="32" cy="65" r="4" fill="#666" />
      <circle cx="68" cy="65" r="8" fill="#333" stroke="white" strokeWidth="2" />
      <circle cx="68" cy="65" r="4" fill="#666" />

      {/* Headlights */}
      <rect x="76" y="52" width="4" height="6" rx="1" fill="#FFD700" />
      <rect x="20" y="52" width="4" height="6" rx="1" fill="#FF6B6B" />

      {/* Euro symbol */}
      <text
        x="50"
        y="82"
        textAnchor="middle"
        fill="white"
        fontSize="14"
        fontWeight="bold"
        fontFamily="Arial, sans-serif"
      >
        ANKAUF
      </text>
    </svg>
  )
}

export function LogoWithText({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Logo className="w-12 h-12" />
      <div>
        <h1 className="font-bold text-xl leading-tight">Auto Ankauf</h1>
        <p className="text-xs text-gray-600 dark:text-gray-400 leading-tight">Franken</p>
      </div>
    </div>
  )
}
