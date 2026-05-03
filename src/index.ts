import {
  blurReveal as _blurReveal,
  reveal as _reveal,
  counter as _counter,
  progress as _progress,
  stagger as _stagger,
  textReveal as _textReveal,
  zoom as _zoom,
  type BlurRevealOptions,
  type RevealOptions,
  type CounterOptions,
  type ProgressOptions,
  type StaggerOptions,
  type TextRevealOptions,
  type ZoomOptions,
} from './effects'

export type { BlurRevealOptions, RevealOptions, CounterOptions, ProgressOptions, StaggerOptions, TextRevealOptions, ZoomOptions, Direction } from './effects'
export type { EaseName, EaseFn } from './easing'
export { easings, resolveEase } from './easing'
export { blurReveal, reveal, counter, progress, stagger, textReveal, zoom } from './effects'

// ─── Class API ────────────────────────────────────────────────────────────────

type Target = string | Element | NodeList | Element[]

/**
 * Chainable class wrapping all scroll-craft effects.
 *
 * @example
 * const sc = new ScrollCraft()
 * sc.reveal('.hero-text', { delay: 100 })
 *   .blurReveal('.panel')
 *   .counter('[data-count]', { duration: 1200 })
 *   .progress('#timeline .step')
 *   .stagger('.feature-grid')
 *   .textReveal('.headline')
 *   .zoom('.product-card')
 */
export class ScrollCraft {
  private cleanups: Array<() => void> = []

  blurReveal(target: Target, options?: BlurRevealOptions): this {
    this.cleanups.push(_blurReveal(target, options))
    return this
  }

  reveal(target: Target, options?: RevealOptions): this {
    this.cleanups.push(_reveal(target, options))
    return this
  }

  counter(target: Target, options?: CounterOptions): this {
    this.cleanups.push(_counter(target, options))
    return this
  }

  progress(target: Target, options?: ProgressOptions): this {
    this.cleanups.push(_progress(target, options))
    return this
  }

  stagger(target: Target, options?: StaggerOptions): this {
    this.cleanups.push(_stagger(target, options))
    return this
  }

  textReveal(target: Target, options?: TextRevealOptions): this {
    this.cleanups.push(_textReveal(target, options))
    return this
  }

  zoom(target: Target, options?: ZoomOptions): this {
    this.cleanups.push(_zoom(target, options))
    return this
  }

  /** Disconnect all observers and remove all scroll listeners. */
  destroy(): void {
    this.cleanups.forEach((fn) => fn())
    this.cleanups = []
  }
}
