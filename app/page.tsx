'use client'

import { useEffect, useRef, useState } from 'react'
import { Grain } from '~/components/grain'
import { Marquee } from '~/components/marquee'
import { Particles } from '~/components/particles'
import { Typewriter } from '~/components/typewriter'
import { Wrapper } from '~/components/wrapper'
import { useFadeSlide } from '~/hooks/use-fade-slide'
import { useLineReveal } from '~/hooks/use-line-reveal'
import { useScrollAnimate } from '~/hooks/use-scroll-animate'

// ── Fecha de la cena ────────────────────────────────────────────────────────
const TARGET_DATE = new Date('2026-03-13T20:00:00-05:00')

// ── Fotos y videos para los carruseles ─────────────────────────────────────
// Agrega tus fotos/videos en /public/carousel/ y pon las rutas aquí.
// Cada fila puede tener diferente cantidad de archivos.
// Formatos soportados: imágenes (jpg, png, webp, avif) y videos (mp4, webm, mov).
interface MediaItem {
  src: string
}

const VIDEO_EXTS = ['.mp4', '.webm', '.mov']
function isVideo(src: string) {
  return VIDEO_EXTS.some((ext) => src.toLowerCase().endsWith(ext))
}

const ROW_1: MediaItem[] = [
  { src: '/carousel/foto-01.jpeg' },
  { src: '/carousel/foto-02.jpeg' },
  { src: '/carousel/foto-03.jpeg' },
  { src: '/carousel/foto-04.jpeg' },
  { src: '/carousel/foto-05.jpeg' },
  { src: '/carousel/foto-06.jpeg' },
  { src: '/carousel/foto-07.jpeg' },
  { src: '/carousel/foto-08.jpeg' },
  { src: '/carousel/foto-09.jpeg' },
  { src: '/carousel/foto-10.jpeg' },
  { src: '/carousel/video-01.mp4' },
  { src: '/carousel/video-02.mp4' },
  { src: '/carousel/video-11.mp4' },
  { src: '/carousel/video-12.mp4' },
]
const ROW_2: MediaItem[] = [
  { src: '/carousel/foto-11.jpeg' },
  { src: '/carousel/foto-12.jpeg' },
  { src: '/carousel/foto-13.jpeg' },
  { src: '/carousel/foto-14.jpeg' },
  { src: '/carousel/foto-15.jpeg' },
  { src: '/carousel/foto-16.jpeg' },
  { src: '/carousel/foto-17.jpeg' },
  { src: '/carousel/foto-18.jpeg' },
  { src: '/carousel/foto-19.jpeg' },
  { src: '/carousel/foto-20.jpeg' },
  { src: '/carousel/video-03.mp4' },
  { src: '/carousel/video-04.mp4' },
  { src: '/carousel/video-05.mp4' },
  { src: '/carousel/video-13.mp4' },
  { src: '/carousel/video-14.mp4' },
]
const ROW_3: MediaItem[] = [
  { src: '/carousel/foto-21.jpeg' },
  { src: '/carousel/foto-22.jpeg' },
  { src: '/carousel/foto-23.jpeg' },
  { src: '/carousel/foto-24.jpeg' },
  { src: '/carousel/foto-25.jpeg' },
  { src: '/carousel/foto-26.jpeg' },
  { src: '/carousel/foto-27.jpeg' },
  { src: '/carousel/foto-28.jpeg' },
  { src: '/carousel/foto-29.jpeg' },
  { src: '/carousel/foto-30.jpeg' },
  { src: '/carousel/video-06.mp4' },
  { src: '/carousel/video-07.mp4' },
  { src: '/carousel/video-08.mp4' },
  { src: '/carousel/video-15.mp4' },
  { src: '/carousel/video-16.mp4' },
]
const ROW_4: MediaItem[] = [
  { src: '/carousel/foto-31.jpeg' },
  { src: '/carousel/foto-32.jpeg' },
  { src: '/carousel/foto-33.jpeg' },
  { src: '/carousel/foto-34.jpeg' },
  { src: '/carousel/foto-35.jpeg' },
  { src: '/carousel/foto-36.jpeg' },
  { src: '/carousel/foto-37.jpeg' },
  { src: '/carousel/foto-38.jpeg' },
  { src: '/carousel/foto-39.jpeg' },
  { src: '/carousel/foto-40.jpeg' },
  { src: '/carousel/foto-41.jpeg' },
  { src: '/carousel/video-09.mp4' },
  { src: '/carousel/video-10.mp4' },
  { src: '/carousel/video-17.mp4' },
  { src: '/carousel/video-18.mp4' },
]

// ── Countdown ───────────────────────────────────────────────────────────────
function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const tick = () => {
      const diff = targetDate.getTime() - Date.now()
      if (diff <= 0)
        return setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [targetDate])

  return timeLeft
}

function pad(n: number) {
  return n.toString().padStart(2, '0')
}

// ── Media slot (imagen o video) ──────────────────────────────────────────────
function MediaSlot({ src }: { src: string }) {
  const cls = 'shrink-0 coi-w-200 dt:coi-w-280 object-cover'

  if (isVideo(src)) {
    return (
      <video
        src={src}
        className={cls}
        style={{ aspectRatio: '4/3' }}
        autoPlay
        loop
        muted
        playsInline
      />
    )
  }

  return (
    <img
      src={src}
      alt=""
      className={cls}
      style={{ aspectRatio: '4/3' }}
      loading="lazy"
      draggable={false}
    />
  )
}

function PlaceholderSlot() {
  return (
    <div
      className="shrink-0 coi-w-200 dt:coi-w-280 bg-secondary/5 border border-solid border-secondary/8"
      style={{ aspectRatio: '4/3' }}
    />
  )
}

// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false)
  const timeLeft = useCountdown(TARGET_DATE)

  // Refs
  const heroRef = useRef<HTMLElement>(null)
  const carouselRef = useRef<HTMLElement>(null)
  const invitationRef = useRef<HTMLElement>(null)
  const detailsRef = useRef<HTMLElement>(null)
  const countdownRef = useRef<HTMLElement>(null)

  // Scroll triggers
  const isCarouselVisible = useScrollAnimate(carouselRef, 0.05)
  const isInvitationVisible = useScrollAnimate(invitationRef, 0.15)
  const isDetailsVisible = useScrollAnimate(detailsRef, 0.15)
  const isCountdownVisible = useScrollAnimate(countdownRef, 0.1)

  // ── Animations ────────────────────────────────────────────────────────────
  useFadeSlide({
    isActive: isPreloaderComplete,
    rootRef: heroRef,
    delay: 0.5,
    duration: 1.8,
    y: 24,
    stagger: 0.14,
  })

  useFadeSlide({
    isActive: isCarouselVisible,
    rootRef: carouselRef,
    selector: '[data-fade-slide]',
    delay: 0.2,
    stagger: 0.15,
  })

  useLineReveal({ isActive: isInvitationVisible, rootRef: invitationRef })
  useFadeSlide({
    isActive: isInvitationVisible,
    rootRef: invitationRef,
    delay: 0.3,
    stagger: 0.12,
  })

  useLineReveal({ isActive: isDetailsVisible, rootRef: detailsRef })
  useFadeSlide({
    isActive: isDetailsVisible,
    rootRef: detailsRef,
    delay: 0.3,
    stagger: 0.1,
  })

  useLineReveal({ isActive: isCountdownVisible, rootRef: countdownRef })
  useFadeSlide({
    isActive: isCountdownVisible,
    rootRef: countdownRef,
    delay: 0.3,
    stagger: 0.1,
  })

  return (
    <Wrapper
      theme="light"
      className="overflow-x-clip"
      onPreloaderComplete={() => setIsPreloaderComplete(true)}
    >
      <Particles count={200} />
      <Grain />

      {/* ═══════════════════════════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center coi-px-6 dt:coi-px-12"
      >
        <div className="coi-layout-block-inner flex flex-col items-center">
          <Typewriter
            text="Y después de 5 años,"
            speed={50}
            delay={2.6}
            className="text-secondary will-change-transform"
            style={{
              fontFamily: 'var(--next-font-playfair)',
              fontSize: 'calc(((32 * 100) / var(--device-width)) * 1vw)',
              lineHeight: '1.6',
              fontStyle: 'italic',
              fontWeight: 400,
              display: 'block',
            }}
          />
          <Typewriter
            text="10 semestres…"
            speed={50}
            delay={3.7}
            className="text-secondary will-change-transform"
            style={{
              fontFamily: 'var(--next-font-playfair)',
              fontSize: 'calc(((32 * 100) / var(--device-width)) * 1vw)',
              lineHeight: '1.6',
              fontStyle: 'italic',
              fontWeight: 400,
              marginTop: 'calc(((8 * 100) / var(--device-width)) * 1vw)',
              display: 'block',
            }}
          />
          <Typewriter
            text="Gracias por ser parte de este capítulo."
            speed={50}
            delay={4.4}
            className="caption text-secondary uppercase tracking-widest coi-mt-10 will-change-transform"
            style={{
              fontFamily: 'var(--next-font-montserrat)',
              display: 'block',
            }}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CARRUSELES DE FOTOS — 4 filas, direcciones alternas
          ═══════════════════════════════════════════════════════════════ */}
      <section
        ref={carouselRef}
        className="relative z-10 flex flex-col coi-gap-3 dt:coi-gap-4 coi-py-16 dt:coi-py-20"
      >
        {[
          { items: ROW_1, dir: 'left' as const, dur: 40 },
          { items: ROW_2, dir: 'right' as const, dur: 45 },
          { items: ROW_3, dir: 'left' as const, dur: 38 },
          { items: ROW_4, dir: 'right' as const, dur: 42 },
        ].map(({ items, dir, dur }, i) => (
          <Marquee key={i} direction={dir} duration={dur} className="coi-gap-3 dt:coi-gap-4">
            <div className="flex coi-gap-3 dt:coi-gap-4" data-fade-slide>
              {items.length > 0
                ? items.map((item, j) => <MediaSlot key={j} src={item.src} />)
                : Array.from({ length: 6 }, (_, j) => <PlaceholderSlot key={j} />)}
            </div>
          </Marquee>
        ))}
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          LA INVITACIÓN
          ═══════════════════════════════════════════════════════════════ */}
      <section
        ref={invitationRef}
        className="relative z-10 flex flex-col items-center text-center coi-py-28 dt:coi-py-36"
      >
        <div className="coi-layout-block-inner flex flex-col items-center">

          {/* Logo */}
          <img
            data-fade-slide
            src="/logo-uninorte.png"
            alt="Universidad del Norte"
            className="will-change-transform"
            style={{
              width: '65%',
              maxWidth: 400,
              height: 'auto',
            }}
          />

          <div
            data-line-reveal
            className="coi-w-40 dt:coi-w-60 coi-h-px bg-secondary/15 coi-mt-12 coi-mb-12 will-change-transform"
          />

          {/* Nombre en script */}
          <p
            data-fade-slide
            className="text-secondary will-change-transform"
            style={{
              fontFamily: 'var(--next-font-great-vibes)',
              fontSize: 'calc(((52 * 100) / var(--device-width)) * 1vw)',
              lineHeight: 1.2,
            }}
          >
            María Camila Gómez Blanquicett
          </p>

          {/* Texto de invitación */}
          <p
            data-fade-slide
            className="caption text-secondary/40 uppercase tracking-widest coi-mt-8 coi-mb-2 will-change-transform"
          >
            tiene el honor de invitarte a celebrar su graduación como
          </p>

          {/* Título en script */}
          <p
            data-fade-slide
            className="text-secondary will-change-transform"
            style={{
              fontFamily: 'var(--next-font-great-vibes)',
              fontSize: 'calc(((38 * 100) / var(--device-width)) * 1vw)',
              lineHeight: 1.4,
            }}
          >
            Ingeniería de Sistemas y Computación
          </p>

          <p
            data-fade-slide
            className="caption text-secondary/30 uppercase tracking-widest coi-mt-2 will-change-transform"
          >
            Universidad del Norte
          </p>

          <div
            data-line-reveal
            className="coi-w-40 dt:coi-w-60 coi-h-px bg-secondary/15 coi-mt-12 coi-mb-12 will-change-transform"
          />

          {/* Detalles de la cena */}
          <p
            data-fade-slide
            className="caption text-secondary/30 uppercase tracking-widest coi-mb-6 will-change-transform"
          >
            Cena de celebración
          </p>

          <p
            data-fade-slide
            className="contact text-secondary uppercase will-change-transform"
          >
            Viernes, 13 de Marzo de 2026
          </p>

          <p
            data-fade-slide
            className="h2 text-secondary leading-none coi-mt-6 coi-mb-6 will-change-transform"
          >
            8:00 PM
          </p>

          <div
            data-line-reveal
            className="coi-w-40 dt:coi-w-60 coi-h-px bg-secondary/10 coi-mb-6 will-change-transform"
          />

          <p
            data-fade-slide
            className="contact text-secondary uppercase will-change-transform"
          >
            Pepe Anca
          </p>
          <p
            data-fade-slide
            className="caption text-secondary/30 uppercase tracking-widest coi-mt-2 will-change-transform"
          >
            Cra. 49c #76-164
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          DETALLES (ref vacío para mantener scroll trigger del countdown)
          ═══════════════════════════════════════════════════════════════ */}
      <section ref={detailsRef} />

      {/* ═══════════════════════════════════════════════════════════════
          COUNTDOWN + DRESS CODE
          ═══════════════════════════════════════════════════════════════ */}
      <section
        ref={countdownRef}
        className="relative z-10 flex flex-col items-center text-center coi-py-20 dt:coi-py-28"
      >
        <div className="coi-layout-block-inner flex flex-col items-center">
          <p
            data-fade-slide
            className="caption text-secondary/30 uppercase tracking-widest coi-mb-8 will-change-transform"
          >
            Faltan
          </p>

          <p
            data-fade-slide
            className="h1 text-secondary leading-none will-change-transform"
          >
            {pad(timeLeft.days)}
          </p>
          <p
            data-fade-slide
            className="caption text-secondary/30 uppercase tracking-widest coi-mt-2 coi-mb-6 will-change-transform"
          >
            Días
          </p>

          <div className="flex items-center coi-gap-10 dt:coi-gap-16">
            {[
              { value: timeLeft.hours, label: 'H' },
              { value: timeLeft.minutes, label: 'M' },
              { value: timeLeft.seconds, label: 'S' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center">
                <p
                  data-fade-slide
                  className="contact text-secondary tabular-nums will-change-transform"
                >
                  {pad(value)}
                </p>
                <p className="caption text-secondary/25 uppercase tracking-widest coi-mt-1">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <div
            data-line-reveal
            className="w-full coi-h-px bg-secondary/10 coi-my-14 dt:coi-my-18 will-change-transform"
          />

          <p
            data-fade-slide
            className="caption text-secondary/30 uppercase tracking-widest coi-mb-8 will-change-transform"
          >
            Código de vestimenta
          </p>

          <div className="flex flex-col dt:flex-row dt:items-center coi-gap-6 dt:coi-gap-16">
            <div className="flex flex-col items-center coi-gap-1">
              <p
                data-fade-slide
                className="contact text-secondary uppercase will-change-transform"
              >
                Hombres
              </p>
              <p
                data-fade-slide
                className="caption text-secondary/30 uppercase tracking-widest will-change-transform"
              >
                Vestimenta Formal
              </p>
            </div>
            <div className="flex flex-col items-center coi-gap-1">
              <p
                data-fade-slide
                className="contact text-secondary uppercase will-change-transform"
              >
                Mujeres
              </p>
              <p
                data-fade-slide
                className="caption text-secondary/30 uppercase tracking-widest will-change-transform"
              >
                Coctel
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════════════════════════ */}
      <footer className="relative z-10 coi-py-8">
        <div className="coi-layout-block-inner">
          <div className="w-full coi-h-px bg-secondary/10 coi-mb-5" />
          <div className="flex items-center justify-between">
            <p className="caption text-secondary/20 uppercase tracking-widest">
              13 · 03 · 2026
            </p>
            <p className="caption text-secondary/20 uppercase tracking-widest">
              M.C.G.B.
            </p>
          </div>
        </div>
      </footer>
    </Wrapper>
  )
}
