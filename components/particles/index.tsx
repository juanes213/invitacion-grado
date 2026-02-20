'use client'

import { useEffect, useRef } from 'react'

interface Piece {
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
  vr: number
  w: number
  h: number
  color: string
  opacity: number
}

const GOLD = ['#D4AF37', '#C9A227', '#B8960C', '#DAA520', '#E8C84A', '#BFA020']

interface ParticlesProps {
  count?: number
  className?: string
}

export function Particles({ count = 60, className }: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let pieces: Piece[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const makePiece = (yOverride?: number): Piece => ({
      x: Math.random() * canvas.width,
      y: yOverride ?? Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: Math.random() * 0.7 + 0.25,
      rotation: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.04,
      w: Math.random() * 7 + 3,
      h: Math.random() * 3 + 1.5,
      color: GOLD[Math.floor(Math.random() * GOLD.length)],
      opacity: Math.random() * 0.28 + 0.08,
    })

    const init = () => {
      resize()
      pieces = Array.from({ length: count }, () => makePiece())
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < pieces.length; i++) {
        const p = pieces[i]
        p.x += p.vx
        p.y += p.vy
        p.rotation += p.vr

        // When a piece exits the bottom, recycle it from the top
        if (p.y > canvas.height + 12) {
          pieces[i] = makePiece(-12)
          continue
        }
        if (p.x < -12) p.x = canvas.width + 12
        if (p.x > canvas.width + 12) p.x = -12

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)
        ctx.globalAlpha = p.opacity
        ctx.fillStyle = p.color
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        ctx.restore()
      }

      animationId = requestAnimationFrame(draw)
    }

    init()
    draw()
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [count])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
