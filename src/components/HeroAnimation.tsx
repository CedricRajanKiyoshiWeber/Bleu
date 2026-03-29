'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type SceneLayout =
  | 'massive-center'
  | 'massive-left'
  | 'stacked-fill'
  | 'stacked-left'
  | 'stacked-right'
  | 'stacked-tight'
  | 'smaller-center'
  | 'logo-center'
  | 'areas-split'
  | 'marquee-split'

type TransitionOut = 'hard-cut' | 'scale-out' | 'slide-left' | 'slide-right'
type Motion =
  | 'scale-in'
  | 'scale-down-in'
  | 'breathe'
  | 'pulse'
  | 'stagger-in'
  | 'slide-in-right'
  | 'slide-in-left'
  | 'slot-spin'
  | 'marquee-in'
  | 'none'

interface Scene {
  text: string[]
  duration: number
  bg: 'black' | 'bleu'
  textColor: 'bleu' | 'black'
  layout: SceneLayout
  motions: Motion[]
  transitionOut: TransitionOut
  scaleInFrom?: number
  pulseFrom?: number
  isLogo?: boolean
  isAreas?: boolean
  isMarquee?: boolean
}

// ---------------------------------------------------------------------------
// Scene data (24 scenes)
// ---------------------------------------------------------------------------

const SCENES: Scene[] = [
  // --- Akt 0: Logo (skipped on first play, animated on loop) ---
  {
    text: ['LOGO'],
    duration: 3.0,
    bg: 'black',
    textColor: 'bleu',
    layout: 'logo-center',
    motions: ['scale-down-in', 'breathe'], // match-cut: 110%→100% after JUST WORK scale-out
    transitionOut: 'hard-cut',
    isLogo: true,
  },

  // --- Akt 1: Einleitung ---
  {
    text: ['CREATIVE'],
    duration: 0.6,
    bg: 'bleu',
    textColor: 'black',
    layout: 'massive-center',
    motions: ['scale-down-in', 'breathe'], // match-cut: catches logo scale-out / static logo transition
    transitionOut: 'hard-cut',
  },
  {
    text: ['STUDIO'],
    duration: 0.6,
    bg: 'bleu',
    textColor: 'black',
    layout: 'massive-center',
    motions: ['pulse', 'breathe'],
    transitionOut: 'hard-cut',
  },
  // --- Akt 3: Core Message → Marquee ---
  {
    text: ['BRAND', 'WORLDS'],
    duration: 4.0,
    bg: 'bleu',
    textColor: 'black',
    layout: 'marquee-split',
    motions: ['marquee-in'],
    transitionOut: 'scale-out',
    isMarquee: true,
  },

  // --- Akt 4: Pillars (jump-cut sequence: empty → V → V D → V D C) ---
  {
    text: ['VISUAL'],
    duration: 0.5,
    bg: 'black',
    textColor: 'bleu',
    layout: 'stacked-tight',
    motions: ['scale-down-in'], // match-cut: catches BRAND WORLDS scale-out
    transitionOut: 'hard-cut',
  },
  {
    text: ['VISUAL', 'DIGITAL'],
    duration: 0.5,
    bg: 'black',
    textColor: 'bleu',
    layout: 'stacked-tight',
    motions: ['none'],
    transitionOut: 'hard-cut',
  },
  {
    text: ['VISUAL', 'DIGITAL', 'CONCEPTUAL'],
    duration: 1.0,
    bg: 'black',
    textColor: 'bleu',
    layout: 'stacked-tight',
    motions: ['none', 'breathe'],
    transitionOut: 'hard-cut',
  },

  // --- Akt 5: Services (ping-pong matchcut) ---
  {
    text: ['BRAND', 'IDENTITY'],
    duration: 0.55,
    bg: 'bleu',
    textColor: 'black',
    layout: 'stacked-left',
    motions: ['scale-in'],
    transitionOut: 'slide-right',
    scaleInFrom: 0.1,
  },
  {
    text: ['ART', 'DIRECTION'],
    duration: 0.1,
    bg: 'black',
    textColor: 'bleu',
    layout: 'stacked-right',
    motions: ['none'],
    transitionOut: 'slide-left',
  },
  {
    text: ['WEB', 'DESIGN'],
    duration: 0.1,
    bg: 'bleu',
    textColor: 'black',
    layout: 'stacked-left',
    motions: ['none'],
    transitionOut: 'slide-right',
  },
  {
    text: ['E-COMMERCE', 'STRATEGIE'],
    duration: 0.1,
    bg: 'black',
    textColor: 'bleu',
    layout: 'stacked-right',
    motions: ['none'],
    transitionOut: 'slide-left',
  },
  {
    text: ['DIGITAL', 'PRODUCTS'],
    duration: 0.6,
    bg: 'bleu',
    textColor: 'black',
    layout: 'stacked-left',
    motions: ['breathe'],
    transitionOut: 'scale-out',
  },

  // --- Akt 6: Branchen (slot-spin with "OUR PARTNERS" label) ---
  {
    text: ['FASHION', 'MUSIC', 'CULTURE', 'NIGHTLIFE'],
    duration: 4.5,
    bg: 'black',
    textColor: 'bleu',
    layout: 'areas-split',
    motions: ['slot-spin'],
    transitionOut: 'hard-cut',
    isAreas: true,
  },

  // --- Akt 7: Attitude ---
  {
    text: ['NO TEMPLATES'],
    duration: 1.0,
    bg: 'black',
    textColor: 'bleu',
    layout: 'smaller-center',
    motions: ['none'],
    transitionOut: 'hard-cut',
  },
  {
    text: ['NO RETAINERS'],
    duration: 0.5,
    bg: 'black',
    textColor: 'bleu',
    layout: 'smaller-center',
    motions: ['none'],
    transitionOut: 'hard-cut',
  },
  {
    text: ['JUST', 'WORK', 'THAT', 'MATTERS'],
    duration: 1.4,
    bg: 'bleu',
    textColor: 'black',
    layout: 'stacked-tight',
    motions: ['stagger-in', 'breathe'],
    transitionOut: 'scale-out', // loops back to Logo scene at index 0
  },
]

// Logo is the first scene
const LOGO_SCENE_INDEX = 0

// ---------------------------------------------------------------------------
// Layout class mapping
// ---------------------------------------------------------------------------

const LAYOUT_CLASSES: Record<SceneLayout, string> = {
  'massive-center': 'flex items-center justify-center text-[18vw] leading-[0.85]',
  'massive-left': 'flex items-center justify-start pl-[5vw] text-[18vw] leading-[0.85]',
  'stacked-fill': 'flex flex-col items-center justify-center text-[14vw] leading-[0.88]',
  'stacked-left': 'flex flex-col items-start justify-center pl-[5vw] text-[11vw] leading-[0.88]',
  'stacked-right': 'flex flex-col items-end justify-center pr-[5vw] text-[11vw] leading-[0.88]',
  'stacked-tight': 'flex flex-col items-center justify-center text-[12vw] leading-[0.95]',
  'smaller-center': 'flex items-center justify-center text-[5vw] tracking-[0.08em]',
  'logo-center': 'flex items-center justify-center',
  'areas-split': 'flex items-center justify-between px-[5vw]',
  'marquee-split': 'relative w-full h-full',
}

// ---------------------------------------------------------------------------
// Inline SVG Logo
// ---------------------------------------------------------------------------

// Detail items fly by during spin; main areas are revealed when it stops
const SPIN_DETAILS = [
  'FESTIVALS', 'JEWELRY', 'STREETWEAR', 'CLUBS',
  'COFFEE SHOPS', 'GALLERIES', 'BARS', 'ARTISTS',
  'MAGAZINES', 'LABELS', 'FILM', 'DJS',
  'VENUES', 'DESIGNERS', 'PRODUCERS', 'BOUTIQUES',
]
const SPIN_MAIN = ['FASHION', 'MUSIC', 'CULTURE', 'NIGHTLIFE']
// Full list: details first, main areas at the end (visible at rest)
const SPIN_ITEMS = [...SPIN_DETAILS, ...SPIN_MAIN]
// How far to scroll: show last 4 items at rest → skip (total - 4) items
const SPIN_STOP_PERCENT = ((SPIN_ITEMS.length - 4) / SPIN_ITEMS.length) * 100

function BleuLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 68"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 63.4667V58.9333H4.54463V54.4H22.7231V49.8667H27.2678V36.2667H22.7231V18.1333H27.2678V13.6H31.8124V9.06667H36.357V4.53333H63.6248V0H72.7141V4.53333H77.2587V9.06667H72.605V4.53333H63.7339V9.06667H68.1694V13.6H72.7141V22.6667H68.1694V27.2H63.7339V31.7333H59.1892V36.2667H72.7141V40.8H77.2587V58.9333H72.7141V63.4667H68.1694V68H49.8818V63.4667H45.4463V49.7579H49.9909V45.3333H54.5355V40.8H59.0802V36.2667H54.5355V31.7333H59.0802V27.2H63.6248V9.06667H54.5355V13.6H50.1V18.1333H45.5554V22.7755H40.9017V36.2667H36.357V54.4H40.9017V63.4667H36.357V68H27.2678V63.4667H18.2876V68H4.54463V63.4667H0ZM31.8124 36.0491H36.357V22.6667H40.9017V18.1333H45.4463V13.6H49.9909V9.06667H40.9017V13.6H36.357V18.1333H31.8124V36.0491ZM49.9909 63.4667H63.6248V58.9333H68.1694V40.8H59.1892V45.3333H63.6248V54.4H59.0802V45.3333H54.6446V49.8667H49.9909V63.4667ZM27.3768 63.4667H31.8124V49.9755H27.2678V54.4H22.8322V58.9333H27.3768V63.4667ZM4.6537 63.4667H18.1785V58.9333H4.6537V63.4667Z" />
      <path d="M77.2587 63.4667V49.8667H81.8033V40.8H86.3479V27.2H90.8926V13.6H95.4372V4.53333H104.526V13.6H99.9818V27.2H95.4372V40.8H90.8926V54.4H86.3479V63.4667H95.4372V58.9333H99.9818V49.8667H104.526V45.3333H109.071V49.9755H104.526V59.0421H99.9818V63.5755H95.4372V68H81.8033V63.4667H77.2587Z" />
      <path d="M118.197 45.3333V49.8667H127.286V45.3333H131.831V36.2667H127.286V40.8H122.741V45.3333H118.197ZM131.903 68H113.652V63.4667H109.107V45.3333H113.652V40.8H118.197V36.2667H122.741V31.7333H136.375V36.2667H140.92V40.8H136.375V45.4421H131.831V49.9755H127.286V54.4H118.197V63.4667H131.794V58.9333H136.375V49.8667H140.811V45.3333H145.464V49.8667H140.92V59.0421H136.375V63.4667H131.903V68Z" />
      <path d="M150.009 63.4667V54.4H154.554V45.3333H159.098V36.2667H150.009V45.3333H145.464V36.2667H149.791V31.7333H163.643V36.2667H168.188V45.3333H163.643V58.9333H159.098V63.4667H168.188V54.4H172.732V45.3333H177.277V31.7333H186.366V45.3333H181.821V58.9333H177.277V63.4667H186.366V58.9333H190.911V49.8667H195.455V45.3333H200V49.9755H195.455V59.0421H190.911V63.5755H186.366V68H172.732V63.5755H168.188V68H154.554V63.4667H150.009Z" />
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([])
  const textRefs = useRef<(HTMLDivElement | null)[]>([])

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Reduced motion check
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const first = sceneRefs.current[0]
      if (first) gsap.set(first, { autoAlpha: 1 })
      return
    }

    const ctx = gsap.context(() => {
      // Hide all scenes initially
      sceneRefs.current.forEach((el) => {
        if (el) gsap.set(el, { autoAlpha: 0 })
      })
      textRefs.current.forEach((el) => {
        if (el) gsap.set(el, { clearProps: 'transform' })
      })

      // Show logo statically on first load (no animation)
      const logoEl = sceneRefs.current[LOGO_SCENE_INDEX]
      const logoTextEl = textRefs.current[LOGO_SCENE_INDEX]
      if (logoEl) gsap.set(logoEl, { autoAlpha: 1 })

      const tl = gsap.timeline({ paused: true })

      let pos = 0
      let creativeStartPos = 0
      const handledBySlide = new Set<number>()

      SCENES.forEach((scene, i) => {
        const el = sceneRefs.current[i]
        const textEl = textRefs.current[i]
        if (!el || !textEl) return

        // Record where CREATIVE starts (scene after logo)
        if (i === 1) creativeStartPos = pos

        const nextI = (i + 1) % SCENES.length
        const introDur = handledBySlide.has(i) ? 0 : getIntroDuration(scene)

        // ── SCENE IN ──────────────────────────────────────────────

        if (handledBySlide.has(i)) {
          // Already visible from previous slide-left — skip intro
        } else if (scene.motions.includes('scale-in')) {
          const from = scene.scaleInFrom ?? 0.05
          tl.set(el, { autoAlpha: 1 }, pos)
          tl.fromTo(
            textEl,
            { scale: from },
            { scale: 1, duration: 0.5, ease: 'power3.out' },
            pos,
          )
          pos += 0.5
        } else if (scene.motions.includes('scale-down-in')) {
          // Match-cut: starts slightly large (110%) and scales DOWN to 100%
          tl.set(el, { autoAlpha: 1 }, pos)
          tl.fromTo(
            textEl,
            { scale: 1.1 },
            { scale: 1, duration: 0.3, ease: 'power2.out' },
            pos,
          )
          pos += 0.3
        } else if (scene.motions.includes('slide-in-right')) {
          tl.set(el, { autoAlpha: 1 }, pos)
          tl.fromTo(
            textEl,
            { xPercent: 110 },
            { xPercent: 0, duration: 0.35, ease: 'power3.out' },
            pos,
          )
          pos += 0.35
        } else if (scene.motions.includes('slide-in-left')) {
          tl.set(el, { autoAlpha: 1 }, pos)
          tl.fromTo(
            textEl,
            { xPercent: -110 },
            { xPercent: 0, duration: 0.35, ease: 'power3.out' },
            pos,
          )
          pos += 0.35
        } else if (scene.motions.includes('stagger-in')) {
          tl.set(el, { autoAlpha: 1 }, pos)
          const lines = textEl.querySelectorAll('.line')
          if (lines.length > 0) {
            tl.fromTo(
              lines,
              { yPercent: 60, autoAlpha: 0 },
              {
                yPercent: 0,
                autoAlpha: 1,
                duration: 0.4,
                stagger: 0.1,
                ease: 'power3.out',
              },
              pos,
            )
          }
          pos += 0.4 + (scene.text.length - 1) * 0.1
        } else if (scene.motions.includes('pulse')) {
          const pulseScale = scene.pulseFrom ?? 1.08
          tl.set(el, { autoAlpha: 1 }, pos)
          tl.fromTo(
            textEl,
            { scale: pulseScale },
            { scale: 1, duration: 0.15, ease: 'power2.out' },
            pos,
          )
          pos += 0.15
        } else if (scene.motions.includes('marquee-in')) {
          tl.set(el, { autoAlpha: 1 }, pos)

          const weRefine = textEl.querySelector('.we-refine-text')
          const refineWord = textEl.querySelector('.refine-word') as HTMLElement | null
          const weRefineInner = textEl.querySelector('.we-refine-inner') as HTMLElement | null
          const topTrack = textEl.querySelector('.marquee-top .marquee-track')
          const bottomTrack = textEl.querySelector('.marquee-bottom .marquee-track')

          const weWord = textEl.querySelector('.we-word') as HTMLElement | null

          // Measure REFINE width so we can offset WE to screen-center initially
          const refineWidth = refineWord?.getBoundingClientRect().width ?? 0
          const halfRefineOffset = refineWidth / 2

          // Hide marquees, WE, and REFINE initially
          if (topTrack) tl.set(topTrack, { autoAlpha: 0 }, pos)
          if (bottomTrack) tl.set(bottomTrack, { autoAlpha: 0 }, pos)
          if (refineWord) tl.set(refineWord, { autoAlpha: 0 }, pos)
          if (weWord) tl.set(weWord, { autoAlpha: 0 }, pos)

          // Offset inner span right so WE will land screen-centered
          if (weRefineInner) tl.set(weRefineInner, { x: halfRefineOffset }, pos)

          // ── Part 1: WE scales down in (like STUDIO pulse) ──
          if (weWord) {
            tl.set(weWord, { autoAlpha: 1, scale: 1.08 }, pos)
            tl.to(weWord, {
              scale: 1,
              duration: 0.15,
              ease: 'power2.out',
            }, pos)
          }

          // ── Part 2: REFINE flies in from the right, pushing WE to new center ──
          if (refineWord) {
            tl.set(refineWord, { autoAlpha: 1, x: '100%' }, pos + 0.65)
            tl.to(refineWord, {
              x: '0%',
              duration: 0.35,
              ease: 'power3.out',
            }, pos + 0.65)
          }
          // Simultaneously shift the whole phrase to re-center "WE REFINE"
          if (weRefineInner) {
            tl.to(weRefineInner, {
              x: 0,
              duration: 0.35,
              ease: 'power3.out',
            }, pos + 0.65)
          }

          // At 1.0s WE REFINE scales out and disappears
          const scaleOutStart = pos + 1.0
          const scaleOutDur = 0.4
          if (weRefine) {
            tl.to(weRefine, {
              scale: 0.03,
              duration: scaleOutDur,
              ease: 'expo.in',
            }, scaleOutStart)
            tl.set(weRefine, { autoAlpha: 0 }, scaleOutStart + scaleOutDur)
          }
          // Reset inner elements so they're clean for the next loop iteration
          if (weWord) tl.set(weWord, { clearProps: 'transform' }, scaleOutStart + scaleOutDur)
          if (weRefineInner) tl.set(weRefineInner, { clearProps: 'transform' }, scaleOutStart + scaleOutDur)
          if (weRefine) tl.set(weRefine, { clearProps: 'transform' }, scaleOutStart + scaleOutDur + 0.01)

          // ── Part 2: Marquees burst in after WE REFINE is gone ──
          const marqueeStart = scaleOutStart + scaleOutDur
          const marqueeDur = scene.duration - (marqueeStart - pos)
          const tweenDur = marqueeDur * 12

          if (topTrack) {
            tl.set(topTrack, { autoAlpha: 1 }, marqueeStart)
            tl.fromTo(topTrack,
              { x: '-120vw' },
              { x: '0vw', duration: tweenDur, ease: 'expo.out' },
              marqueeStart,
            )
          }
          if (bottomTrack) {
            tl.set(bottomTrack, { autoAlpha: 1 }, marqueeStart)
            tl.fromTo(bottomTrack,
              { x: '0vw' },
              { x: '-120vw', duration: tweenDur, ease: 'expo.out' },
              marqueeStart,
            )
          }

          pos += scene.duration
        } else if (scene.motions.includes('slot-spin')) {
          // Slot-machine spin: items scroll fast top→bottom, then decelerate
          tl.set(el, { autoAlpha: 1 }, pos)
          const spinner = textEl.querySelector('.slot-spinner')
          if (spinner) {
            // Start at top (details visible), scroll up to reveal main areas at bottom
            tl.fromTo(
              spinner,
              { yPercent: 0 },
              { yPercent: -SPIN_STOP_PERCENT, duration: 3.0, ease: 'power4.out' },
              pos,
            )
          }
          pos += 3.0
        } else {
          // 'none' or default: instant show
          tl.set(el, { autoAlpha: 1 }, pos)
        }

        // ── BREATHE (during hold) ─────────────────────────────────

        const holdDur = scene.duration - introDur
        if (scene.motions.includes('breathe') && holdDur > 0.2) {
          tl.to(
            textEl,
            { scale: '+=0.04', duration: holdDur, ease: 'sine.inOut' },
            pos,
          )
        }

        // ── HOLD ──────────────────────────────────────────────────

        pos += holdDur

        // ── TRANSITION OUT ────────────────────────────────────────

        switch (scene.transitionOut) {
          case 'scale-out': {
            tl.to(textEl, {
              scale: 0.03,
              xPercent: 0,
              duration: 0.45,
              ease: 'expo.in',
            }, pos)
            pos += 0.45
            tl.set(el, { autoAlpha: 0 }, pos)
            tl.set(textEl, { clearProps: 'transform' }, pos)
            break
          }

          case 'slide-right': {
            // Matchcut: both texts travel rightward in sync.
            // Current (left-aligned) drifts right, next (right-aligned)
            // enters from left. Hard cut at midpoint when both are
            // roughly centered → swap is invisible at peak velocity.
            const nextEl = sceneRefs.current[nextI]
            const nextTextEl = textRefs.current[nextI]
            const dur = 0.6
            const travel = 25

            tl.to(textEl, {
              xPercent: travel,
              scale: 1,
              duration: dur,
              ease: 'power3.inOut',
            }, pos)

            if (nextEl && nextTextEl) {
              tl.set(nextTextEl, { xPercent: -travel, scale: 1 }, pos)
              tl.set(nextEl, { autoAlpha: 0 }, pos)

              tl.to(nextTextEl, {
                xPercent: 0,
                duration: dur,
                ease: 'power3.inOut',
              }, pos)

              // Hard cut at midpoint (peak velocity → imperceptible)
              tl.set(el, { autoAlpha: 0 }, pos + dur / 2)
              tl.set(nextEl, { autoAlpha: 1 }, pos + dur / 2)

              handledBySlide.add(nextI)
            }

            pos += dur
            tl.set(textEl, { clearProps: 'transform' }, pos)
            break
          }

          case 'slide-left': {
            // Matchcut: both texts travel leftward in sync.
            const nextEl = sceneRefs.current[nextI]
            const nextTextEl = textRefs.current[nextI]
            const dur = 0.6
            const travel = 25

            tl.to(textEl, {
              xPercent: -travel,
              scale: 1,
              duration: dur,
              ease: 'power3.inOut',
            }, pos)

            if (nextEl && nextTextEl) {
              tl.set(nextTextEl, { xPercent: travel, scale: 1 }, pos)
              tl.set(nextEl, { autoAlpha: 0 }, pos)

              tl.to(nextTextEl, {
                xPercent: 0,
                duration: dur,
                ease: 'power3.inOut',
              }, pos)

              tl.set(el, { autoAlpha: 0 }, pos + dur / 2)
              tl.set(nextEl, { autoAlpha: 1 }, pos + dur / 2)

              handledBySlide.add(nextI)
            }

            pos += dur
            tl.set(textEl, { clearProps: 'transform' }, pos)
            break
          }

          case 'hard-cut':
          default: {
            tl.set(el, { autoAlpha: 0 }, pos)
            tl.set(textEl, { clearProps: 'transform' }, pos)
            break
          }
        }
      })

      // Loop: restart timeline at the actual end of visible scenes,
      // not when the longest child tween finishes (marquee tweens overshoot).
      tl.call(
        () => {
          sceneRefs.current.forEach((sceneEl) => {
            if (sceneEl) gsap.set(sceneEl, { autoAlpha: 0 })
          })
          textRefs.current.forEach((txtEl) => {
            if (txtEl) gsap.set(txtEl, { clearProps: 'transform,opacity,visibility' })
          })
          tl.invalidate()
          tl.restart()
        },
        [],
        pos,
      )

      // After 1s static logo hold, scale-out then start timeline from CREATIVE
      gsap.delayedCall(1, () => {
        if (logoEl && logoTextEl) {
          gsap.to(logoTextEl, {
            scale: 0.03,
            duration: 0.45,
            ease: 'expo.in',
            onComplete: () => {
              gsap.set(logoEl, { autoAlpha: 0 })
              gsap.set(logoTextEl, { clearProps: 'transform' })
              // Start from CREATIVE, skipping logo on first play.
              // On loop, timeline goes back to 0 (logo with animation).
              tl.play(creativeStartPos)
            },
          })
        } else {
          tl.play(creativeStartPos)
        }
      })
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 h-full w-full overflow-hidden"
      aria-hidden="true"
    >
      {SCENES.map((scene, i) => {
        const bgClass = scene.bg === 'bleu' ? 'bg-bleu' : 'bg-black'
        const colorClass = scene.textColor === 'bleu' ? 'text-bleu' : 'text-black'

        return (
          <div
            key={i}
            ref={(el) => { sceneRefs.current[i] = el }}
            className={`absolute inset-0 h-full w-full ${bgClass} invisible opacity-0`}
          >
            <div className={`h-full w-full ${scene.isMarquee ? '' : 'md:p-10 overflow-hidden'}`}>
              <div
                ref={(el) => { textRefs.current[i] = el }}
                className={`h-full w-full ${LAYOUT_CLASSES[scene.layout]} ${colorClass} font-heading text-trim-cap`}
              >
                {scene.isLogo ? (
                  <BleuLogo className="w-[40vw] text-bleu" />
                ) : scene.isMarquee ? (
                  <>
                    {/* Centered WE REFINE */}
                    <div className="we-refine-text absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                      <span className="we-refine-inner text-[18vw] leading-[0.85] whitespace-nowrap inline-block">
                        <span className="we-word inline-block">WE&nbsp;</span>
                        <span className="refine-word inline-block">REFINE</span>
                      </span>
                    </div>
                    {/* Top marquee: BRAND WORLDS */}
                    <div className="marquee-top absolute top-[15%] left-0 w-full h-1/2 flex items-center">
                      <div className="marquee-track flex whitespace-nowrap">
                        {Array.from({ length: 10 }).map((_, ri) => (
                          <span key={ri} className="text-[14vw] leading-[0.88] font-heading px-[2vw]">
                            BRAND WORLDS
                          </span>
                        ))}
                      </div>
                    </div>
                    {/* Bottom marquee: BRAND WORLDS */}
                    <div className="marquee-bottom absolute bottom-[15%] left-0 w-full h-1/2 flex items-center">
                      <div className="marquee-track flex whitespace-nowrap">
                        {Array.from({ length: 10 }).map((_, ri) => (
                          <span key={ri} className="text-[14vw] leading-[0.88] font-heading px-[2vw]">
                            BRAND WORLDS
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                ) : scene.isAreas ? (
                  <>
                    {/* Left: slot-machine spinner */}
                    <div className="relative h-[4em] overflow-hidden text-[11vw] leading-[1] flex-1">
                      <div className="slot-spinner flex flex-col items-start">
                        {SPIN_ITEMS.map((item, li) => (
                          <span key={li} className="block whitespace-nowrap h-[1em]">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    {/* Right: label, vertically centered */}
                    <span className="text-[1.4vw] tracking-[0.12em] uppercase self-center whitespace-nowrap ml-[4vw]">
                      Our Partners
                    </span>
                  </>
                ) : scene.text.length === 1 ? (
                  <span className="line whitespace-nowrap">{scene.text[0]}</span>
                ) : (
                  scene.text.map((line, li) => (
                    <span key={li} className="line block whitespace-nowrap">
                      {line}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getIntroDuration(scene: Scene): number {
  if (scene.motions.includes('scale-in')) return 0.5
  if (scene.motions.includes('scale-down-in')) return 0.3
  if (scene.motions.includes('slide-in-right')) return 0.35
  if (scene.motions.includes('slide-in-left')) return 0.35
  if (scene.motions.includes('stagger-in'))
    return 0.4 + (scene.text.length - 1) * 0.1
  if (scene.motions.includes('pulse')) return 0.15
  if (scene.motions.includes('marquee-in')) return scene.duration
  if (scene.motions.includes('slot-spin')) return 3.0
  return 0
}
