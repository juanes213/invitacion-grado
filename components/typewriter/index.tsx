'use client'

import { useEffect, useState } from 'react'

interface TypewriterProps {
  text: string
  speed?: number
  delay?: number
  className?: string
  style?: React.CSSProperties
  onComplete?: () => void
}

export function Typewriter({ text, speed = 50, delay = 0, className, style, onComplete }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (delay <= 0) {
      setHasStarted(true)
      return
    }

    const delayTimer = setTimeout(() => {
      setHasStarted(true)
    }, delay * 1000)

    return () => clearTimeout(delayTimer)
  }, [delay])

  useEffect(() => {
    if (!hasStarted) return

    if (displayedText.length === text.length) {
      setIsComplete(true)
      onComplete?.()
      return
    }

    const timer = setTimeout(() => {
      setDisplayedText(text.slice(0, displayedText.length + 1))
    }, speed)

    return () => clearTimeout(timer)
  }, [displayedText, text, speed, onComplete, hasStarted])

  return (
    <p className={className} style={style}>
      {displayedText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </p>
  )
}
