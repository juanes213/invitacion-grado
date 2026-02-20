'use client'

import { type RefObject, useEffect, useState } from 'react'

/**
 * Observes when a section enters the viewport and returns true once visible.
 * Uses IntersectionObserver — triggers once and disconnects.
 */
export function useScrollAnimate(
  ref: RefObject<HTMLElement | null>,
  threshold = 0.15
): boolean {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, threshold])

  return isVisible
}
