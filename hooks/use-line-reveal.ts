'use client'

import { gsap } from 'gsap'
import { type RefObject, useEffect } from 'react'

interface UseLineRevealArgs {
  isActive: boolean
  rootRef: RefObject<HTMLElement | null>
  selector?: string
  duration?: number
  delay?: number
  ease?: string
  stagger?: number
}

/**
 * Animates horizontal separator lines from scaleX(0) to scaleX(1),
 * creating a "drawing in" effect from left to right.
 * Mark elements with data-line-reveal (or a custom selector).
 */
export function useLineReveal({
  isActive,
  rootRef,
  selector = '[data-line-reveal]',
  duration = 1.6,
  delay = 0,
  ease = 'power4.inOut',
  stagger = 0.2,
}: UseLineRevealArgs) {
  useEffect(() => {
    if (!isActive || !rootRef.current) return

    const elements = Array.from(
      rootRef.current.querySelectorAll<HTMLElement>(selector)
    )
    if (elements.length === 0) return

    gsap.set(elements, { scaleX: 0, transformOrigin: 'left center' })

    const tween = gsap.to(elements, {
      scaleX: 1,
      duration,
      ease,
      delay,
      stagger,
    })

    return () => {
      tween.kill()
    }
  }, [isActive, rootRef, selector, duration, delay, ease, stagger])
}
