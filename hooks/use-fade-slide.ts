'use client'

import { gsap } from 'gsap'
import { type RefObject, useEffect } from 'react'

interface UseFadeSlideArgs {
  isActive: boolean
  rootRef: RefObject<HTMLElement | null>
  selector?: string
  duration?: number
  delay?: number
  y?: number
  ease?: string
  stagger?: number
}

/**
 * Animates elements from translateY(y) + opacity(0) to their natural position.
 * Mark elements with data-fade-slide (or a custom selector).
 */
export function useFadeSlide({
  isActive,
  rootRef,
  selector = '[data-fade-slide]',
  duration = 1.4,
  delay = 0,
  y = 36,
  ease = 'power3.out',
  stagger = 0.1,
}: UseFadeSlideArgs) {
  useEffect(() => {
    if (!isActive || !rootRef.current) return

    const elements = Array.from(
      rootRef.current.querySelectorAll<HTMLElement>(selector)
    )
    if (elements.length === 0) return

    gsap.set(elements, { y, opacity: 0 })

    const tween = gsap.to(elements, {
      y: 0,
      opacity: 1,
      duration,
      ease,
      delay,
      stagger,
    })

    return () => {
      tween.kill()
    }
  }, [isActive, rootRef, selector, duration, delay, y, ease, stagger])
}
