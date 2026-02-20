'use client'

import { type ReactNode, useState } from 'react'

interface MarqueeProps {
  children: ReactNode
  direction?: 'left' | 'right'
  duration?: number
  className?: string
}

/**
 * Infinite horizontal scroll row.
 * Children are duplicated to create seamless loop.
 * Pauses on hover.
 */
export function Marquee({
  children,
  direction = 'left',
  duration = 35,
  className,
}: MarqueeProps) {
  const [paused, setPaused] = useState(false)

  return (
    <div
      className={className}
      style={{ overflow: 'hidden' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          gap: 'inherit',
          animation: `marquee-${direction} ${duration}s linear infinite`,
          animationPlayState: paused ? 'paused' : 'running',
        }}
      >
        {/* Original + duplicate for seamless loop */}
        {children}
        {children}
      </div>
    </div>
  )
}
