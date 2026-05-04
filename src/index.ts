import {
  blurReveal as _blurReveal,
  reveal as _reveal,
  counter as _counter,
  parallax as _parallax,
  progress as _progress,
  scene as _scene,
  scrollProgress as _scrollProgress,
  stagger as _stagger,
  textReveal as _textReveal,
  zoom as _zoom,
  liquidSwipe as _liquidSwipe,
  type BlurRevealOptions,
  type RevealOptions,
  type CounterOptions,
  type ParallaxOptions,
  type ProgressOptions,
  type SceneOptions,
  type SceneStep,
  type SceneValues,
  type ScrollProgressOptions,
  type StaggerOptions,
  type TextRevealOptions,
  type ZoomOptions,
  type LiquidSwipeOptions,
  type LiquidSwipeDirection,
} from './effects'

export type { BlurRevealOptions, RevealOptions, CounterOptions, ParallaxOptions, ProgressOptions, SceneOptions, SceneStep, SceneValues, ScrollProgressOptions, StaggerOptions, TextRevealOptions, ZoomOptions, Direction, LiquidSwipeOptions, LiquidSwipeDirection } from './effects'
export type { EaseName, EaseFn } from './easing'
export { easings, resolveEase } from './easing'
export { blurReveal, reveal, counter, parallax, progress, scene, scrollProgress, stagger, textReveal, zoom, liquidSwipe } from './effects'

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
 *   .parallax('.hero-orb')
 *   .progress('#timeline .step')
 *   .scene('.story', [{ target: '.title', from: { opacity: 0 }, to: { opacity: 1 } }])
 *   .scrollProgress('.scroll-progress')
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

  parallax(target: Target, options?: ParallaxOptions): this {
    this.cleanups.push(_parallax(target, options))
    return this
  }

  progress(target: Target, options?: ProgressOptions): this {
    this.cleanups.push(_progress(target, options))
    return this
  }

  scene(target: Target, steps: SceneStep[], options?: SceneOptions): this {
    this.cleanups.push(_scene(target, steps, options))
    return this
  }

  scrollProgress(target: Target, options?: ScrollProgressOptions): this {
    this.cleanups.push(_scrollProgress(target, options))
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

  liquidSwipe(target: Target, options?: LiquidSwipeOptions): this {
    this.cleanups.push(_liquidSwipe(target, options))
    return this
  }

  /** Disconnect all observers and remove all scroll listeners. */
  destroy(): void {
    this.cleanups.forEach((fn) => fn())
    this.cleanups = []
  }
}
