import {
  reveal as _reveal,
  counter as _counter,
  progress as _progress,
  type RevealOptions,
  type CounterOptions,
  type ProgressOptions,
} from './effects'

export type { RevealOptions, CounterOptions, ProgressOptions, Direction } from './effects'
export type { EaseName, EaseFn } from './easing'
export { easings, resolveEase } from './easing'
export { reveal, counter, progress } from './effects'

// ─── Class API ────────────────────────────────────────────────────────────────

type Target = string | Element | NodeList | Element[]

/**
 * Chainable class wrapping all scroll-craft effects.
 *
 * @example
 * const sc = new ScrollCraft()
 * sc.reveal('.hero-text', { delay: 100 })
 *   .counter('[data-count]', { duration: 1200 })
 *   .progress('#timeline .step')
 */
export class ScrollCraft {
  private cleanups: Array<() => void> = []

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

  /** Disconnect all observers and remove all scroll listeners. */
  destroy(): void {
    this.cleanups.forEach((fn) => fn())
    this.cleanups = []
  }
}


