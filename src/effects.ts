import { type EaseFn, type EaseName, resolveEase } from './easing'

// ─── Types ────────────────────────────────────────────────────────────────────

export type Direction = 'up' | 'down' | 'left' | 'right'

export interface RevealOptions {
  /** Extra delay in ms before the animation starts. Default: 0 */
  delay?: number
  /** How far the element travels before settling. Default: '24px' */
  distance?: string
  /** Which direction the element enters from. Default: 'up' */
  direction?: Direction
  /** Animation duration in ms. Default: 600 */
  duration?: number
  /** Easing function name or custom fn. Default: 'cubicOut' */
  ease?: EaseName | EaseFn
  /** Fraction of element visible before triggering. Default: 0.12 */
  threshold?: number
  /** Viewport margin to shrink trigger zone (CSS shorthand). Default: '0px 0px -10% 0px' */
  rootMargin?: string
  /** Whether to unobserve after first reveal. Default: true */
  once?: boolean
  /** CSS class added when in view. Default: 'sc-in' */
  inClass?: string
}

export interface CounterOptions {
  /** Animation duration in ms. Default: 1400 */
  duration?: number
  /** Easing function name or custom fn. Default: 'cubicOut' */
  ease?: EaseName | EaseFn
  /** Fraction of element visible before triggering. Default: 0.45 */
  threshold?: number
  /** Custom number formatter. Default: toLocaleString('en-US') */
  formatter?: (value: number) => string
  /** Attribute that holds the target number. Default: 'data-count' */
  attribute?: string
}

export interface ProgressOptions {
  /**
   * Viewport fraction (0–1) where the fill animation starts.
   * 0.82 means "when the top of the element is 82% down the viewport". Default: 0.82
   */
  start?: number
  /**
   * Viewport fraction (0–1) where the fill animation ends.
   * 0.2 means "when the top of the element is 20% down the viewport". Default: 0.2
   */
  end?: number
  /**
   * Selector (relative to each step element) for the fill node.
   * Default: '.sc-fill'
   */
  fillSelector?: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function resolveElements(target: string | Element | NodeList | Element[]): Element[] {
  if (typeof target === 'string') return Array.from(document.querySelectorAll(target))
  if (target instanceof Element) return [target]
  return Array.from(target as NodeList) as Element[]
}

function directionToTransform(direction: Direction, distance: string): string {
  switch (direction) {
    case 'up':    return `translateY(${distance})`
    case 'down':  return `translateY(-${distance})`
    case 'left':  return `translateX(${distance})`
    case 'right': return `translateX(-${distance})`
  }
}

// ─── reveal ───────────────────────────────────────────────────────────────────

/**
 * Watches elements with IntersectionObserver and animates them into view.
 * Returns a cleanup function that disconnects the observer.
 *
 * @example
 * const stop = reveal('.hero-text', { delay: 100, direction: 'up' })
 */
export function reveal(
  target: string | Element | NodeList | Element[],
  options: RevealOptions = {},
): () => void {
  const {
    delay = 0,
    distance = '24px',
    direction = 'up',
    duration = 600,
    ease = 'cubicOut',
    threshold = 0.12,
    rootMargin = '0px 0px -10% 0px',
    once = true,
    inClass = 'sc-in',
  } = options

  const easeFn = resolveEase(ease)
  const elements = resolveElements(target)
  if (!elements.length) return () => {}

  const transform = directionToTransform(direction, distance)

  // Set initial state via inline styles so no CSS import is required
  elements.forEach((el) => {
    const h = el as HTMLElement
    h.style.opacity = '0'
    h.style.transform = transform
    h.style.transition = 'none'
    h.style.willChange = 'opacity, transform'
  })

  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => {
      const h = el as HTMLElement
      h.style.opacity = '1'
      h.style.transform = 'none'
      h.classList.add(inClass)
    })
    return () => {}
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const h = entry.target as HTMLElement

        const start = performance.now() + delay
        let rafId: number

        function step(now: number) {
          if (now < start) {
            rafId = requestAnimationFrame(step)
            return
          }
          const elapsed = Math.min(1, (now - start) / duration)
          const eased = easeFn(elapsed)
          const [tx, ty] = direction === 'left' || direction === 'right'
            ? [`${parseFloat(distance) * (1 - eased)}${distance.replace(/[\d.-]/g, '') || 'px'}`, '0']
            : ['0', `${parseFloat(distance) * (direction === 'up' ? (1 - eased) : -(1 - eased))}${distance.replace(/[\d.-]/g, '') || 'px'}`]
          h.style.opacity = String(eased)
          h.style.transform =
            direction === 'left' || direction === 'right'
              ? `translateX(${parseFloat(distance) * (direction === 'left' ? (1 - eased) : -(1 - eased))}${distance.replace(/[\d.-]/g, '') || 'px'})`
              : `translateY(${parseFloat(distance) * (direction === 'up' ? (1 - eased) : -(1 - eased))}${distance.replace(/[\d.-]/g, '') || 'px'})`
          if (elapsed < 1) {
            rafId = requestAnimationFrame(step)
          } else {
            h.style.opacity = '1'
            h.style.transform = 'none'
            h.style.willChange = 'auto'
            h.classList.add(inClass)
          }
        }

        rafId = requestAnimationFrame(step)
        if (once) observer.unobserve(entry.target)
      })
    },
    { threshold, rootMargin },
  )

  elements.forEach((el) => observer.observe(el))
  return () => observer.disconnect()
}

// ─── counter ──────────────────────────────────────────────────────────────────

/**
 * Animates numeric text content from 0 to the value in `data-count` (or custom attribute).
 * Returns a cleanup function that disconnects the observer.
 *
 * @example
 * const stop = counter('[data-count]', { duration: 1200, ease: 'quartOut' })
 */
export function counter(
  target: string | Element | NodeList | Element[],
  options: CounterOptions = {},
): () => void {
  const {
    duration = 1400,
    ease = 'cubicOut',
    threshold = 0.45,
    formatter = (n) => n.toLocaleString('en-US'),
    attribute = 'data-count',
  } = options

  const easeFn = resolveEase(ease)
  const elements = resolveElements(target)
  if (!elements.length || !('IntersectionObserver' in window)) return () => {}

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const node = entry.target as HTMLElement
        const targetValue = Number(node.getAttribute(attribute) ?? 0)
        const start = performance.now()

        function step(now: number) {
          const progress = Math.min(1, (now - start) / duration)
          node.textContent = formatter(Math.round(targetValue * easeFn(progress)))
          if (progress < 1) requestAnimationFrame(step)
        }

        requestAnimationFrame(step)
        observer.unobserve(node)
      })
    },
    { threshold },
  )

  elements.forEach((el) => observer.observe(el))
  return () => observer.disconnect()
}

// ─── progress ─────────────────────────────────────────────────────────────────

/**
 * Fills child elements (`.sc-fill` by default) as the parent element scrolls through the viewport.
 * Uses `clip-path: inset(0 X% 0 0)` to animate a left-to-right fill.
 * Returns a cleanup function that removes the scroll listener.
 *
 * @example
 * const stop = progress('#timeline .step', { start: 0.82, end: 0.2 })
 */
export function progress(
  target: string | Element | NodeList | Element[],
  options: ProgressOptions = {},
): () => void {
  const {
    start = 0.82,
    end = 0.2,
    fillSelector = '.sc-fill',
  } = options

  const steps = resolveElements(target)
  if (!steps.length) return () => {}

  const fills = steps.map((step) => step.querySelector(fillSelector) as HTMLElement | null)

  function update() {
    const winH = window.innerHeight
    steps.forEach((step, i) => {
      const fill = fills[i]
      if (!fill) return
      const rect = step.getBoundingClientRect()
      const startPx = winH * start
      const endPx = winH * end
      const prog = Math.min(1, Math.max(0, (startPx - rect.top) / (startPx - endPx)))
      fill.style.clipPath = `inset(0 ${Math.round((1 - prog) * 100)}% 0 0)`
    })
  }

  window.addEventListener('scroll', update, { passive: true })
  update()

  return () => window.removeEventListener('scroll', update)
}
