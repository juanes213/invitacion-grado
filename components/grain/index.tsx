'use client'

/**
 * Animated film grain overlay using an SVG feTurbulence filter.
 * Pure CSS/SVG — no external images.
 */
export function Grain() {
  return (
    <>
      {/* SVG filter definition (hidden, 0x0) */}
      <svg className="absolute" width="0" height="0" aria-hidden="true">
        <filter id="grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>

      {/* Grain overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: '-50%',
          width: '200%',
          height: '200%',
          zIndex: 1,
          pointerEvents: 'none',
          opacity: 0.06,
          filter: 'url(#grain-filter)',
          animation: 'grain-shift 0.5s steps(3) infinite',
        }}
      />

      {/* Keyframes */}
      <style>{`
        @keyframes grain-shift {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-2%, 3%); }
          50% { transform: translate(3%, -1%); }
          75% { transform: translate(-1%, -2%); }
        }
      `}</style>
    </>
  )
}
