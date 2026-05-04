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

export interface ScrollProgressOptions {
  /** Scroll axis to track. Default: 'x' */
  axis?: 'x' | 'y'
  /** CSS property strategy used to display progress. Default: 'scale' */
  property?: 'scale' | 'width' | 'height'
  /** Scroll container to track. Default: window */
  container?: Element | Window
}

export type SceneValues = {
  opacity?: number
  x?: number
  y?: number
  scale?: number
  rotate?: number
}

export interface SceneStep {
  /** Selector resolved inside each scene section, or direct target element(s). */
  target: string | Element | NodeList | Element[]
  /** Values at progress 0. */
  from: SceneValues
  /** Values at progress 1. */
  to: SceneValues
  /** Scene progress where this step starts. Default: 0 */
  start?: number
  /** Scene progress where this step ends. Default: 1 */
  end?: number
  /** Step-specific easing. Defaults to SceneOptions.ease */
  ease?: EaseName | EaseFn
}

export interface SceneOptions {
  /**
   * Viewport fraction (0–1) where timeline progress starts.
   * 0.9 means "when the section top hits 90% down the viewport". Default: 0.9
   */
  start?: number
  /**
   * Viewport fraction (0–1) where timeline progress ends.
   * 0.1 means "when the section top hits 10% down the viewport". Default: 0.1
   */
  end?: number
  /** Easing function name or custom fn. Default: 'linear' */
  ease?: EaseName | EaseFn
}

export interface TextRevealOptions {
  /** Split animation by words or individual letters. Default: 'words' */
  type?: 'words' | 'letters'
  /** Delay between each word/letter animation in ms. Default: 40 */
  stagger?: number
  /** Animation duration for each word/letter in ms. Default: 600 */
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

export interface StaggerOptions {
  /** Selector for child elements to animate inside each target. Default: ':scope > *' */
  children?: string
  /** Which direction children enter from. Default: 'up' */
  direction?: Direction
  /** How far each child travels before settling. Default: '24px' */
  distance?: string
  /** Delay between each child animation in ms. Default: 80 */
  stagger?: number
  /** Animation duration for each child in ms. Default: 600 */
  duration?: number
  /** Easing function name or custom fn. Default: 'cubicOut' */
  ease?: EaseName | EaseFn
  /** Fraction of parent visible before triggering. Default: 0.12 */
  threshold?: number
  /** Viewport margin to shrink trigger zone (CSS shorthand). Default: '0px 0px -10% 0px' */
  rootMargin?: string
  /** Whether to unobserve after first reveal. Default: true */
  once?: boolean
  /** CSS class added to the parent when in view. Default: 'sc-in' */
  inClass?: string
}

export interface BlurRevealOptions {
  /** Initial blur amount before reveal. Default: '12px' */
  blur?: string
  /** Initial vertical travel distance. Default: '16px' */
  distance?: string
  /** Animation duration in ms. Default: 700 */
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

export interface ZoomOptions {
  /** Initial scale before reveal. Default: 0.94 */
  from?: number
  /** Final scale after reveal. Default: 1 */
  to?: number
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

export interface ParallaxOptions {
  /** Scroll movement multiplier. Default: 0.25 */
  speed?: number
  /** Axis to move on. Default: 'y' */
  axis?: 'y' | 'x'
  /** Invert movement direction. Default: false */
  reverse?: boolean
  /** Maximum absolute translation in px. Default: 120 */
  clamp?: number
  /** Viewport margin for relevance tracking. Default: '0px' */
  rootMargin?: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function resolveElements(target: string | Element | NodeList | Element[]): Element[] {
  if (typeof target === 'string') return Array.from(document.querySelectorAll(target))
  if (target instanceof Element) return [target]
  return Array.from(target as NodeList) as Element[]
}

function resolveChildElements(parent: Element, selector: string): HTMLElement[] {
  try {
    return Array.from(parent.querySelectorAll(selector)) as HTMLElement[]
  } catch {
    return selector === ':scope > *'
      ? Array.from(parent.children) as HTMLElement[]
      : []
  }
}

function directionToTransform(direction: Direction, distance: string): string {
  switch (direction) {
    case 'up':    return `translateY(${distance})`
    case 'down':  return `translateY(-${distance})`
    case 'left':  return `translateX(${distance})`
    case 'right': return `translateX(-${distance})`
  }
}

function transformForProgress(direction: Direction, distance: string, progress: number): string {
  const value = parseFloat(distance)
  const unit = distance.replace(/[\d.-]/g, '') || 'px'
  const offset = value * (1 - progress)

  switch (direction) {
    case 'left':  return `translateX(${offset}${unit})`
    case 'right': return `translateX(${-offset}${unit})`
    case 'down':  return `translateY(${-offset}${unit})`
    case 'up':    return `translateY(${offset}${unit})`
  }
}

function resolveSceneStepElements(section: Element, target: SceneStep['target']): HTMLElement[] {
  if (typeof target === 'string') return Array.from(section.querySelectorAll(target)) as HTMLElement[]
  if (target instanceof Element) return [target as HTMLElement]
  if (Array.isArray(target)) return target as HTMLElement[]
  return Array.from(target as NodeList) as HTMLElement[]
}

function sceneDefaultValue(property: keyof SceneValues): number {
  if (property === 'opacity' || property === 'scale') return 1
  return 0
}

function normalizeSceneValues(from: SceneValues, to: SceneValues): { from: Required<SceneValues>, to: Required<SceneValues> } {
  const properties: Array<keyof SceneValues> = ['opacity', 'x', 'y', 'scale', 'rotate']
  const normalizedFrom = {} as Required<SceneValues>
  const normalizedTo = {} as Required<SceneValues>

  properties.forEach((property) => {
    const fallback = sceneDefaultValue(property)
    const fromValue = from[property]
    const toValue = to[property]
    normalizedFrom[property] = fromValue ?? toValue ?? fallback
    normalizedTo[property] = toValue ?? fromValue ?? fallback
  })

  return { from: normalizedFrom, to: normalizedTo }
}

function interpolate(from: number, to: number, progress: number): number {
  return from + ((to - from) * progress)
}

function sceneTransform(values: Required<SceneValues>): string {
  return `translate3d(${values.x}px, ${values.y}px, 0) scale(${values.scale}) rotate(${values.rotate}deg)`
}

type StaggerChildState = {
  element: HTMLElement
  opacity: string
  transform: string
  willChange: string
}

type StaggerElementState = {
  parent: HTMLElement
  children: StaggerChildState[]
  parentHadInClass: boolean
  running: boolean
  token: number
}

type BlurRevealElementState = {
  element: HTMLElement
  opacity: string
  filter: string
  transform: string
  willChange: string
  hadInClass: boolean
  running: boolean
  token: number
}

type ZoomElementState = {
  element: HTMLElement
  opacity: string
  transform: string
  transformOrigin: string
  willChange: string
  hadInClass: boolean
  running: boolean
  token: number
}

type ParallaxElementState = {
  element: HTMLElement
  transform: string
  willChange: string
  top: number
  left: number
  width: number
  height: number
  visible: boolean
}

type ScrollProgressElementState = {
  element: HTMLElement
  transform: string
  transformOrigin: string
  width: string
  height: string
  willChange: string
}

type SceneStepElementState = {
  element: HTMLElement
  opacity: string
  transform: string
  willChange: string
  from: Required<SceneValues>
  to: Required<SceneValues>
  start: number
  end: number
  easeFn: EaseFn
}

type SceneElementState = {
  section: HTMLElement
  top: number
  visible: boolean
  steps: SceneStepElementState[]
}

type LegacyMediaQueryList = MediaQueryList & {
  addListener?: (listener: (event: MediaQueryListEvent) => void) => void
  removeListener?: (listener: (event: MediaQueryListEvent) => void) => void
}

type TextRevealSplit = {
  parent: Node
  original: Text
  nodes: Node[]
}

type TextRevealElementState = {
  element: HTMLElement
  spans: HTMLElement[]
  splits: TextRevealSplit[]
  originalAriaLabel: string | null
  hadAriaLabel: boolean
  addedAriaLabel: boolean
  restored: boolean
}

function isSkippableTextParent(parent: Node | null): boolean {
  if (!(parent instanceof Element)) return false
  return ['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'SELECT', 'OPTION'].includes(parent.tagName)
}

function createTextRevealSpan(text: string, hidden: boolean): HTMLElement {
  const span = document.createElement('span')
  span.textContent = text
  span.style.display = 'inline-block'
  span.style.opacity = '0'
  span.style.transform = 'translateY(0.75em)'
  span.style.willChange = 'opacity, transform'
  if (hidden) span.setAttribute('aria-hidden', 'true')
  return span
}

function splitTextNode(textNode: Text, type: TextRevealOptions['type'], hidden: boolean): TextRevealSplit | null {
  const text = textNode.data
  if (!/\S/.test(text)) return null

  const fragment = document.createDocumentFragment()
  const nodes: Node[] = []
  const parts = type === 'letters'
    ? Array.from(text)
    : text.match(/\S+|\s+/g) ?? []

  parts.forEach((part) => {
    const node = /\s/.test(part)
      ? document.createTextNode(part)
      : createTextRevealSpan(part, hidden)
    fragment.appendChild(node)
    nodes.push(node)
  })

  const parent = textNode.parentNode
  if (!parent) return null

  parent.replaceChild(fragment, textNode)
  return { parent, original: textNode, nodes }
}

function splitElementText(element: HTMLElement, type: TextRevealOptions['type']): TextRevealElementState {
  const hasNestedElements = Array.from(element.children).length > 0
  const originalAriaLabel = element.getAttribute('aria-label')
  const hadAriaLabel = element.hasAttribute('aria-label')
  const addedAriaLabel = !hasNestedElements && !hadAriaLabel

  if (addedAriaLabel) element.setAttribute('aria-label', element.textContent ?? '')

  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      if (isSkippableTextParent(node.parentNode)) return NodeFilter.FILTER_REJECT
      return /\S/.test(node.textContent ?? '') ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
    },
  })
  const textNodes: Text[] = []
  let current = walker.nextNode()
  while (current) {
    textNodes.push(current as Text)
    current = walker.nextNode()
  }

  const splits: TextRevealSplit[] = []
  textNodes.forEach((textNode) => {
    const split = splitTextNode(textNode, type, addedAriaLabel)
    if (split) splits.push(split)
  })

  const spans = splits.reduce<HTMLElement[]>((acc, split) => {
    split.nodes.forEach((node) => {
      if (node instanceof HTMLElement) acc.push(node)
    })
    return acc
  }, [])

  return {
    element,
    spans,
    splits,
    originalAriaLabel,
    hadAriaLabel,
    addedAriaLabel,
    restored: false,
  }
}

function restoreTextRevealState(state: TextRevealElementState): void {
  if (state.restored) return
  state.restored = true

  state.splits.forEach((split) => {
    if (!split.nodes.length || !split.parent.isConnected || split.nodes[0].parentNode !== split.parent) return
    split.parent.insertBefore(split.original, split.nodes[0])
    split.nodes.forEach((node) => {
      if (node.parentNode === split.parent) split.parent.removeChild(node)
    })
  })

  if (state.addedAriaLabel) {
    state.element.removeAttribute('aria-label')
  } else if (state.hadAriaLabel && state.originalAriaLabel !== null) {
    state.element.setAttribute('aria-label', state.originalAriaLabel)
  }
}

function resetTextRevealSpans(spans: HTMLElement[]): void {
  spans.forEach((span) => {
    span.style.opacity = '0'
    span.style.transform = 'translateY(0.75em)'
    span.style.willChange = 'opacity, transform'
  })
}

function finishTextRevealSpans(spans: HTMLElement[]): void {
  spans.forEach((span) => {
    span.style.opacity = '1'
    span.style.transform = 'none'
    span.style.willChange = 'auto'
  })
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

// ─── scrollProgress ──────────────────────────────────────────────────────────

/**
 * Updates targets to represent page or container scroll progress from 0 to 1.
 * Returns a cleanup function that removes listeners and restores inline styles.
 *
 * @example
 * const stop = scrollProgress('.progress-bar', { axis: 'x', property: 'scale' })
 */
export function scrollProgress(
  target: string | Element | NodeList | Element[],
  options: ScrollProgressOptions = {},
): () => void {
  const {
    axis = 'x',
    property = 'scale',
    container = window,
  } = options

  const elements = resolveElements(target) as HTMLElement[]
  if (!elements.length) return () => {}

  const states = elements.map<ScrollProgressElementState>((element) => ({
    element,
    transform: element.style.transform,
    transformOrigin: element.style.transformOrigin,
    width: element.style.width,
    height: element.style.height,
    willChange: element.style.willChange,
  }))
  const scrollContainer = container === window ? window : container as Element
  let rafId: number | null = null

  function getProgress(): number {
    if (scrollContainer === window) {
      const root = document.documentElement
      const body = document.body
      const scrollLeft = window.scrollX || window.pageXOffset
      const scrollTop = window.scrollY || window.pageYOffset
      const scrollWidth = Math.max(root.scrollWidth, body?.scrollWidth ?? 0)
      const scrollHeight = Math.max(root.scrollHeight, body?.scrollHeight ?? 0)
      const max = axis === 'x'
        ? scrollWidth - window.innerWidth
        : scrollHeight - window.innerHeight
      const current = axis === 'x' ? scrollLeft : scrollTop
      return max <= 0 ? 1 : Math.min(1, Math.max(0, current / max))
    }

    const element = scrollContainer as Element
    const max = axis === 'x'
      ? element.scrollWidth - element.clientWidth
      : element.scrollHeight - element.clientHeight
    const current = axis === 'x' ? element.scrollLeft : element.scrollTop
    return max <= 0 ? 1 : Math.min(1, Math.max(0, current / max))
  }

  function write(): void {
    rafId = null
    const value = getProgress()

    states.forEach((state) => {
      if (property === 'scale') {
        const scale = axis === 'x' ? `scaleX(${value})` : `scaleY(${value})`
        state.element.style.transform = state.transform ? `${state.transform} ${scale}` : scale
        state.element.style.transformOrigin = axis === 'x' ? 'left center' : 'center top'
        state.element.style.willChange = 'transform'
        return
      }

      if (property === 'width') {
        state.element.style.width = `${value * 100}%`
        state.element.style.willChange = 'width'
        return
      }

      state.element.style.height = `${value * 100}%`
      state.element.style.willChange = 'height'
    })
  }

  function schedule(): void {
    if (rafId !== null) return
    rafId = requestAnimationFrame(write)
  }

  schedule()
  scrollContainer.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule)

  return () => {
    if (rafId !== null) cancelAnimationFrame(rafId)
    rafId = null
    scrollContainer.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
    states.forEach((state) => {
      state.element.style.transform = state.transform
      state.element.style.transformOrigin = state.transformOrigin
      state.element.style.width = state.width
      state.element.style.height = state.height
      state.element.style.willChange = state.willChange
    })
  }
}

// ─── scene ───────────────────────────────────────────────────────────────────

/**
 * Creates a scroll-driven scene timeline for each section.
 * Step selectors are resolved inside each scene section.
 *
 * @example
 * const stop = scene('.story', [
 *   { target: '.title', from: { opacity: 0 }, to: { opacity: 1 } },
 *   { target: '.image', from: { y: 80 }, to: { y: 0 } },
 * ])
 */
export function scene(
  target: string | Element | NodeList | Element[],
  steps: SceneStep[],
  options: SceneOptions = {},
): () => void {
  const {
    start = 0.9,
    end = 0.1,
    ease = 'linear',
  } = options

  const sections = resolveElements(target) as HTMLElement[]
  if (!sections.length || !steps.length) return () => {}

  const reduceMotion = typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null
  let rafId: number | null = null
  let observer: IntersectionObserver | null = null

  const states = sections.map<SceneElementState>((section) => {
    const stepStates = steps.reduce<SceneStepElementState[]>((acc, step) => {
      const normalized = normalizeSceneValues(step.from, step.to)
      const stepEaseFn = resolveEase(step.ease ?? ease)
      const targetStates = resolveSceneStepElements(section, step.target).map<SceneStepElementState>((element) => ({
        element,
        opacity: element.style.opacity,
        transform: element.style.transform,
        willChange: element.style.willChange,
        from: normalized.from,
        to: normalized.to,
        start: step.start ?? 0,
        end: step.end ?? 1,
        easeFn: stepEaseFn,
      }))
      acc.push(...targetStates)
      return acc
    }, [])

    return {
      section,
      top: 0,
      visible: !('IntersectionObserver' in window),
      steps: stepStates,
    }
  }).filter((state) => state.steps.length > 0)

  if (!states.length) return () => {}

  function progressForTop(top: number): number {
    const startPx = window.innerHeight * start
    const endPx = window.innerHeight * end
    if (startPx === endPx) return top <= endPx ? 1 : 0
    return Math.min(1, Math.max(0, (startPx - top) / (startPx - endPx)))
  }

  function localProgress(step: SceneStepElementState, progress: number): number {
    if (step.start === step.end) return progress >= step.end ? 1 : 0
    return Math.min(1, Math.max(0, (progress - step.start) / (step.end - step.start)))
  }

  function applyStep(state: SceneStepElementState, progress: number): void {
    const eased = state.easeFn(localProgress(state, progress))
    const values: Required<SceneValues> = {
      opacity: interpolate(state.from.opacity, state.to.opacity, eased),
      x: interpolate(state.from.x, state.to.x, eased),
      y: interpolate(state.from.y, state.to.y, eased),
      scale: interpolate(state.from.scale, state.to.scale, eased),
      rotate: interpolate(state.from.rotate, state.to.rotate, eased),
    }

    state.element.style.opacity = String(values.opacity)
    state.element.style.transform = sceneTransform(values)
  }

  function restoreStepWillChange(step: SceneStepElementState): void {
    step.element.style.willChange = step.willChange
  }

  function applyProgress(progress: number): void {
    states.forEach((state) => {
      state.steps.forEach((step) => applyStep(step, progress))
    })
  }

  function measure(): void {
    const scrollY = window.scrollY || window.pageYOffset
    states.forEach((state) => {
      const rect = state.section.getBoundingClientRect()
      state.top = rect.top
      if (!observer) state.visible = rect.bottom >= 0 && rect.top <= window.innerHeight
      if (scrollY === 0 && rect.top > window.innerHeight) state.visible = true
    })
  }

  function write(): void {
    rafId = null

    if (reduceMotion?.matches) {
      applyProgress(1)
      states.forEach((state) => {
        state.steps.forEach(restoreStepWillChange)
      })
      return
    }

    states.forEach((state) => {
      const progress = progressForTop(state.top)
      const isRelevant = state.visible || progress === 0 || progress === 1
      if (!isRelevant) {
        state.steps.forEach(restoreStepWillChange)
        return
      }
      state.steps.forEach((step) => {
        const isActive = state.visible || (progress > step.start && progress < step.end)
        if (isActive) {
          step.element.style.willChange = 'opacity, transform'
        } else {
          restoreStepWillChange(step)
        }
        applyStep(step, progress)
      })
    })
  }

  function schedule(): void {
    if (rafId !== null) return
    rafId = requestAnimationFrame(() => {
      measure()
      write()
    })
  }

  function handleMotionChange(): void {
    schedule()
  }

  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const state = states.find((item) => item.section === entry.target)
        if (!state) return
        state.visible = entry.isIntersecting
      })
      schedule()
    })
    states.forEach((state) => observer?.observe(state.section))
  }

  schedule()
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule)

  if (reduceMotion) {
    if ('addEventListener' in reduceMotion) {
      reduceMotion.addEventListener('change', handleMotionChange)
    } else {
      const legacyReduceMotion = reduceMotion as LegacyMediaQueryList
      legacyReduceMotion.addListener?.(handleMotionChange)
    }
  }

  return () => {
    if (rafId !== null) cancelAnimationFrame(rafId)
    rafId = null
    observer?.disconnect()
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)

    if (reduceMotion) {
      if ('removeEventListener' in reduceMotion) {
        reduceMotion.removeEventListener('change', handleMotionChange)
      } else {
        const legacyReduceMotion = reduceMotion as LegacyMediaQueryList
        legacyReduceMotion.removeListener?.(handleMotionChange)
      }
    }

    states.forEach((state) => {
      state.steps.forEach((step) => {
        step.element.style.opacity = step.opacity
        step.element.style.transform = step.transform
        step.element.style.willChange = step.willChange
      })
    })
  }
}

// ─── parallax ────────────────────────────────────────────────────────────────

/**
 * Moves elements based on scroll position using translate3d.
 * Returns a cleanup function that removes listeners, disconnects observers, and restores inline transforms.
 *
 * @example
 * const stop = parallax('.hero-orb', { speed: 0.2, clamp: 90 })
 */
export function parallax(
  target: string | Element | NodeList | Element[],
  options: ParallaxOptions = {},
): () => void {
  const {
    speed = 0.25,
    axis = 'y',
    reverse = false,
    clamp = 120,
    rootMargin = '0px',
  } = options

  const elements = resolveElements(target) as HTMLElement[]
  if (!elements.length) return () => {}

  const states = elements.map<ParallaxElementState>((element) => ({
    element,
    transform: element.style.transform,
    willChange: element.style.willChange,
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    visible: !('IntersectionObserver' in window),
  }))

  const reduceMotion = typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null
  let rafId: number | null = null
  let observer: IntersectionObserver | null = null

  function restore(): void {
    states.forEach((state) => {
      state.element.style.transform = state.transform
      state.element.style.willChange = state.willChange
    })
  }

  function measure(): void {
    const scrollX = window.scrollX || window.pageXOffset
    const scrollY = window.scrollY || window.pageYOffset

    states.forEach((state) => {
      const rect = state.element.getBoundingClientRect()
      state.top = rect.top + scrollY
      state.left = rect.left + scrollX
      state.width = rect.width
      state.height = rect.height
    })
  }

  function write(): void {
    rafId = null

    if (reduceMotion?.matches) {
      restore()
      return
    }

    const scrollX = window.scrollX || window.pageXOffset
    const scrollY = window.scrollY || window.pageYOffset
    const viewportCenterX = scrollX + (window.innerWidth / 2)
    const viewportCenterY = scrollY + (window.innerHeight / 2)
    const direction = reverse ? -1 : 1

    states.forEach((state) => {
      if (!state.visible) return

      const elementCenter = axis === 'y'
        ? state.top + (state.height / 2)
        : state.left + (state.width / 2)
      const viewportCenter = axis === 'y' ? viewportCenterY : viewportCenterX
      const raw = (viewportCenter - elementCenter) * speed * direction
      const offset = Math.max(-clamp, Math.min(clamp, raw))
      const x = axis === 'x' ? offset : 0
      const y = axis === 'y' ? offset : 0

      state.element.style.transform = `translate3d(${x}px, ${y}px, 0)`
      state.element.style.willChange = 'transform'
    })
  }

  function schedule(): void {
    if (rafId !== null) return
    rafId = requestAnimationFrame(write)
  }

  function handleResize(): void {
    measure()
    schedule()
  }

  function handleMotionChange(): void {
    if (reduceMotion?.matches) {
      restore()
      return
    }

    measure()
    schedule()
  }

  measure()

  if (reduceMotion?.matches) {
    restore()
  } else {
    states.forEach((state) => {
      state.element.style.willChange = 'transform'
    })
    schedule()
  }

  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const state = states.find((item) => item.element === entry.target)
          if (!state) return
          state.visible = entry.isIntersecting
        })
        schedule()
      },
      { rootMargin },
    )
    states.forEach((state) => observer?.observe(state.element))
  }

  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', handleResize)

  if (reduceMotion) {
    if ('addEventListener' in reduceMotion) {
      reduceMotion.addEventListener('change', handleMotionChange)
    } else {
      const legacyReduceMotion = reduceMotion as LegacyMediaQueryList
      legacyReduceMotion.addListener?.(handleMotionChange)
    }
  }

  return () => {
    if (rafId !== null) cancelAnimationFrame(rafId)
    rafId = null
    observer?.disconnect()
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', handleResize)

    if (reduceMotion) {
      if ('removeEventListener' in reduceMotion) {
        reduceMotion.removeEventListener('change', handleMotionChange)
      } else {
        const legacyReduceMotion = reduceMotion as LegacyMediaQueryList
        legacyReduceMotion.removeListener?.(handleMotionChange)
      }
    }

    restore()
  }
}

// ─── stagger ─────────────────────────────────────────────────────────────────

/**
 * Watches parent elements and animates their children sequentially when the parent enters the viewport.
 * Returns a cleanup function that disconnects the observer and restores child inline styles.
 *
 * @example
 * const stop = stagger('.feature-grid', { children: '.card', stagger: 90 })
 */
export function stagger(
  target: string | Element | NodeList | Element[],
  options: StaggerOptions = {},
): () => void {
  const {
    children = ':scope > *',
    direction = 'up',
    distance = '24px',
    stagger = 80,
    duration = 600,
    ease = 'cubicOut',
    threshold = 0.12,
    rootMargin = '0px 0px -10% 0px',
    once = true,
    inClass = 'sc-in',
  } = options

  const easeFn = resolveEase(ease)
  const parents = resolveElements(target) as HTMLElement[]
  if (!parents.length) return () => {}

  const states = parents.map<StaggerElementState>((parent) => {
    const childElements = resolveChildElements(parent, children)
    const childStates = childElements.map((element) => ({
      element,
      opacity: element.style.opacity,
      transform: element.style.transform,
      willChange: element.style.willChange,
    }))

    childStates.forEach(({ element }) => {
      element.style.opacity = '0'
      element.style.transform = directionToTransform(direction, distance)
      element.style.willChange = 'opacity, transform'
    })

    return {
      parent,
      children: childStates,
      parentHadInClass: parent.classList.contains(inClass),
      running: false,
      token: 0,
    }
  }).filter((state) => state.children.length > 0)

  const rafIds = new Set<number>()
  if (!states.length) return () => {}

  function resetChildren(state: StaggerElementState): void {
    state.children.forEach(({ element }) => {
      element.style.opacity = '0'
      element.style.transform = directionToTransform(direction, distance)
      element.style.willChange = 'opacity, transform'
    })
  }

  function finishChildren(state: StaggerElementState): void {
    state.children.forEach(({ element }) => {
      element.style.opacity = '1'
      element.style.transform = 'none'
      element.style.willChange = 'auto'
    })
  }

  function restoreChildren(state: StaggerElementState): void {
    state.children.forEach(({ element, opacity, transform, willChange }) => {
      element.style.opacity = opacity
      element.style.transform = transform
      element.style.willChange = willChange
    })
  }

  if (!('IntersectionObserver' in window)) {
    states.forEach((state) => {
      finishChildren(state)
      state.parent.classList.add(inClass)
    })
    return () => {
      states.forEach((state) => {
        if (!state.parentHadInClass) state.parent.classList.remove(inClass)
        restoreChildren(state)
      })
    }
  }

  const stateByParent = new Map<Element, StaggerElementState>(
    states.map((state) => [state.parent, state]),
  )

  function animateChild(
    child: HTMLElement,
    delay: number,
    state: StaggerElementState,
    token: number,
    onDone: () => void,
  ): void {
    const start = performance.now() + delay

    function step(now: number) {
      if (token !== state.token) return

      if (now < start) {
        const rafId = requestAnimationFrame(step)
        rafIds.add(rafId)
        return
      }

      const progress = Math.min(1, (now - start) / duration)
      const eased = easeFn(progress)
      child.style.opacity = String(eased)
      child.style.transform = transformForProgress(direction, distance, eased)

      if (progress < 1) {
        const rafId = requestAnimationFrame(step)
        rafIds.add(rafId)
      } else {
        child.style.opacity = '1'
        child.style.transform = 'none'
        child.style.willChange = 'auto'
        onDone()
      }
    }

    const rafId = requestAnimationFrame(step)
    rafIds.add(rafId)
  }

  function animateState(state: StaggerElementState): void {
    if (state.running) return
    state.running = true
    state.token += 1
    const token = state.token
    let remaining = state.children.length

    state.children.forEach(({ element }, index) => {
      animateChild(element, index * stagger, state, token, () => {
        if (token !== state.token) return
        remaining -= 1
        if (remaining === 0) state.running = false
      })
    })
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const state = stateByParent.get(entry.target)
        if (!state) return

        if (!entry.isIntersecting) {
          if (!once) {
            state.running = false
            state.token += 1
            if (!state.parentHadInClass) state.parent.classList.remove(inClass)
            resetChildren(state)
          }
          return
        }

        state.parent.classList.add(inClass)
        animateState(state)
        if (once) observer.unobserve(entry.target)
      })
    },
    { threshold, rootMargin },
  )

  states.forEach((state) => observer.observe(state.parent))

  return () => {
    observer.disconnect()
    rafIds.forEach((rafId) => cancelAnimationFrame(rafId))
    rafIds.clear()
    states.forEach((state) => {
      state.running = false
      state.token += 1
      if (!state.parentHadInClass) state.parent.classList.remove(inClass)
      restoreChildren(state)
    })
  }
}

// ─── blurReveal ──────────────────────────────────────────────────────────────

/**
 * Reveals elements by animating opacity, blur, and vertical movement.
 * Returns a cleanup function that disconnects the observer and restores inline styles.
 *
 * @example
 * const stop = blurReveal('.panel', { blur: '16px', distance: '20px' })
 */
export function blurReveal(
  target: string | Element | NodeList | Element[],
  options: BlurRevealOptions = {},
): () => void {
  const {
    blur = '12px',
    distance = '16px',
    duration = 700,
    ease = 'cubicOut',
    threshold = 0.12,
    rootMargin = '0px 0px -10% 0px',
    once = true,
    inClass = 'sc-in',
  } = options

  const easeFn = resolveEase(ease)
  const elements = resolveElements(target) as HTMLElement[]
  if (!elements.length) return () => {}

  const states = elements.map<BlurRevealElementState>((element) => {
    const state = {
      element,
      opacity: element.style.opacity,
      filter: element.style.filter,
      transform: element.style.transform,
      willChange: element.style.willChange,
      hadInClass: element.classList.contains(inClass),
      running: false,
      token: 0,
    }

    element.style.opacity = '0'
    element.style.filter = `blur(${blur})`
    element.style.transform = `translateY(${distance})`
    element.style.willChange = 'opacity, filter, transform'

    return state
  })
  const rafIds = new Set<number>()

  function resetState(state: BlurRevealElementState): void {
    state.element.style.opacity = '0'
    state.element.style.filter = `blur(${blur})`
    state.element.style.transform = `translateY(${distance})`
    state.element.style.willChange = 'opacity, filter, transform'
  }

  function finishState(state: BlurRevealElementState): void {
    state.element.style.opacity = '1'
    state.element.style.filter = 'blur(0)'
    state.element.style.transform = 'translateY(0)'
    state.element.style.willChange = 'auto'
  }

  function restoreState(state: BlurRevealElementState): void {
    state.element.style.opacity = state.opacity
    state.element.style.filter = state.filter
    state.element.style.transform = state.transform
    state.element.style.willChange = state.willChange
  }

  if (!('IntersectionObserver' in window)) {
    states.forEach((state) => {
      finishState(state)
      state.element.classList.add(inClass)
    })
    return () => {
      states.forEach((state) => {
        if (!state.hadInClass) state.element.classList.remove(inClass)
        restoreState(state)
      })
    }
  }

  const stateByElement = new Map<Element, BlurRevealElementState>(
    states.map((state) => [state.element, state]),
  )
  const blurValue = parseFloat(blur)
  const blurUnit = blur.replace(/[\d.-]/g, '') || 'px'
  const distanceValue = parseFloat(distance)
  const distanceUnit = distance.replace(/[\d.-]/g, '') || 'px'

  function animateState(state: BlurRevealElementState): void {
    if (state.running) return
    state.running = true
    state.token += 1
    const token = state.token
    const start = performance.now()

    function step(now: number) {
      if (token !== state.token) return

      const progress = Math.min(1, (now - start) / duration)
      const eased = easeFn(progress)
      state.element.style.opacity = String(eased)
      state.element.style.filter = `blur(${blurValue * (1 - eased)}${blurUnit})`
      state.element.style.transform = `translateY(${distanceValue * (1 - eased)}${distanceUnit})`

      if (progress < 1) {
        const rafId = requestAnimationFrame(step)
        rafIds.add(rafId)
      } else {
        finishState(state)
        state.running = false
      }
    }

    const rafId = requestAnimationFrame(step)
    rafIds.add(rafId)
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const state = stateByElement.get(entry.target)
        if (!state) return

        if (!entry.isIntersecting) {
          if (!once) {
            state.running = false
            state.token += 1
            if (!state.hadInClass) state.element.classList.remove(inClass)
            resetState(state)
          }
          return
        }

        state.element.classList.add(inClass)
        animateState(state)
        if (once) observer.unobserve(entry.target)
      })
    },
    { threshold, rootMargin },
  )

  states.forEach((state) => observer.observe(state.element))

  return () => {
    observer.disconnect()
    rafIds.forEach((rafId) => cancelAnimationFrame(rafId))
    rafIds.clear()
    states.forEach((state) => {
      state.running = false
      state.token += 1
      if (!state.hadInClass) state.element.classList.remove(inClass)
      restoreState(state)
    })
  }
}

// ─── zoom ────────────────────────────────────────────────────────────────────

/**
 * Reveals elements by animating opacity and transform scale.
 * Returns a cleanup function that disconnects the observer and restores inline styles.
 *
 * @example
 * const stop = zoom('.product-card', { from: 0.92, duration: 700 })
 */
export function zoom(
  target: string | Element | NodeList | Element[],
  options: ZoomOptions = {},
): () => void {
  const {
    from = 0.94,
    to = 1,
    duration = 600,
    ease = 'cubicOut',
    threshold = 0.12,
    rootMargin = '0px 0px -10% 0px',
    once = true,
    inClass = 'sc-in',
  } = options

  const easeFn = resolveEase(ease)
  const elements = resolveElements(target) as HTMLElement[]
  if (!elements.length) return () => {}

  const states = elements.map<ZoomElementState>((element) => {
    const state = {
      element,
      opacity: element.style.opacity,
      transform: element.style.transform,
      transformOrigin: element.style.transformOrigin,
      willChange: element.style.willChange,
      hadInClass: element.classList.contains(inClass),
      running: false,
      token: 0,
    }

    element.style.opacity = '0'
    element.style.transform = `scale(${from})`
    element.style.transformOrigin = 'center'
    element.style.willChange = 'opacity, transform'

    return state
  })
  const rafIds = new Set<number>()

  function resetState(state: ZoomElementState): void {
    state.element.style.opacity = '0'
    state.element.style.transform = `scale(${from})`
    state.element.style.transformOrigin = 'center'
    state.element.style.willChange = 'opacity, transform'
  }

  function finishState(state: ZoomElementState): void {
    state.element.style.opacity = '1'
    state.element.style.transform = `scale(${to})`
    state.element.style.transformOrigin = 'center'
    state.element.style.willChange = 'auto'
  }

  function restoreState(state: ZoomElementState): void {
    state.element.style.opacity = state.opacity
    state.element.style.transform = state.transform
    state.element.style.transformOrigin = state.transformOrigin
    state.element.style.willChange = state.willChange
  }

  if (!('IntersectionObserver' in window)) {
    states.forEach((state) => {
      finishState(state)
      state.element.classList.add(inClass)
    })
    return () => {
      states.forEach((state) => {
        if (!state.hadInClass) state.element.classList.remove(inClass)
        restoreState(state)
      })
    }
  }

  const stateByElement = new Map<Element, ZoomElementState>(
    states.map((state) => [state.element, state]),
  )

  function animateState(state: ZoomElementState): void {
    if (state.running) return
    state.running = true
    state.token += 1
    const token = state.token
    const start = performance.now()

    function step(now: number) {
      if (token !== state.token) return

      const progress = Math.min(1, (now - start) / duration)
      const eased = easeFn(progress)
      const scale = from + ((to - from) * eased)
      state.element.style.opacity = String(eased)
      state.element.style.transform = `scale(${scale})`

      if (progress < 1) {
        const rafId = requestAnimationFrame(step)
        rafIds.add(rafId)
      } else {
        finishState(state)
        state.running = false
      }
    }

    const rafId = requestAnimationFrame(step)
    rafIds.add(rafId)
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const state = stateByElement.get(entry.target)
        if (!state) return

        if (!entry.isIntersecting) {
          if (!once) {
            state.running = false
            state.token += 1
            if (!state.hadInClass) state.element.classList.remove(inClass)
            resetState(state)
          }
          return
        }

        state.element.classList.add(inClass)
        animateState(state)
        if (once) observer.unobserve(entry.target)
      })
    },
    { threshold, rootMargin },
  )

  states.forEach((state) => observer.observe(state.element))

  return () => {
    observer.disconnect()
    rafIds.forEach((rafId) => cancelAnimationFrame(rafId))
    rafIds.clear()
    states.forEach((state) => {
      state.running = false
      state.token += 1
      if (!state.hadInClass) state.element.classList.remove(inClass)
      restoreState(state)
    })
  }
}

// ─── liquidSwipe ─────────────────────────────────────────────────────────────

export type LiquidSwipeDirection = 'up' | 'down'

export interface LiquidSwipeOptions {
  /** Drag direction that increases reveal progress. Default: 'up' */
  direction?: LiquidSwipeDirection
  /** Selector for the drag handle element. Default: '.sc-liquid-handle' */
  handle?: string
  /** Selector for the element to reveal. Default: '.sc-liquid-reveal' */
  reveal?: string
  /** Progress threshold (0–1) at which a released drag snaps to 1. Default: 0.65 */
  threshold?: number
  /** Controls the curve depth of the elastic edge. Default: 0.35 */
  tension?: number
  /** Snap to 0 or 1 on release. Default: true */
  snap?: boolean
  /** Disable all interaction. Default: false */
  disabled?: boolean
  /** Called on every progress update. */
  onProgress?: (progress: number) => void
  /** Called once when progress snaps/reaches 1. */
  onComplete?: () => void
  /** Called once when progress snaps/resets to 0 after being completed. */
  onReset?: () => void
}

type LiquidSwipeState = {
  root: HTMLElement
  revealEl: HTMLElement | null
  handleEl: HTMLElement | null
  svgEl: SVGSVGElement
  pathEl: SVGPathElement
  clipId: string
  progress: number
  curveStretch: number
  dragging: boolean
  dragStartY: number
  dragStartProgress: number
  rect: DOMRect
  rafId: number | null
  snapRafId: number | null
  animating: boolean
  completed: boolean
  addedPosition: boolean
  origRevealClip: string
  origRevealWillChange: string
  origHandleTransform: string
  addedAriaAttrs: boolean
}

let _lsIdCounter = 0

/**
 * Interactive liquid-swipe reveal driven by pointer drag.
 * Uses an inline SVG clipPath with a quadratic-bezier elastic edge.
 * Returns a cleanup function that removes all listeners and restores styles.
 *
 * @example
 * const stop = liquidSwipe('.sc-liquid', {
 *   direction: 'up',
 *   threshold: 0.65,
 *   tension: 0.35,
 * })
 */
export function liquidSwipe(
  target: string | Element | NodeList | Element[],
  options: LiquidSwipeOptions = {},
): () => void {
  const {
    direction = 'up',
    handle: handleSel = '.sc-liquid-handle',
    reveal: revealSel = '.sc-liquid-reveal',
    threshold = 0.65,
    tension = 0.35,
    snap = true,
    disabled = false,
    onProgress,
    onComplete,
    onReset,
  } = options

  if (disabled) return () => {}

  const roots = resolveElements(target) as HTMLElement[]
  if (!roots.length) return () => {}

  const reduceMotion = typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null

  const states: LiquidSwipeState[] = []
  const eventCleanups: Array<() => void> = []

  function lsEaseOut(t: number): number {
    return 1 - (1 - t) ** 3
  }

  function buildClipPath(state: LiquidSwipeState): void {
    const { width, height } = state.rect
    if (!width || !height) return

    const maxCurve = Math.min(tension * height * 0.4, height * 0.28)
    const curve = maxCurve * state.curveStretch
    const p = state.progress

    let d: string
    if (direction === 'up') {
      // Reveal grows from bottom; top edge has elastic curve
      const edgeY = height * (1 - p)
      d = `M 0 ${edgeY} Q ${width / 2} ${edgeY - curve} ${width} ${edgeY} L ${width} ${height} L 0 ${height} Z`
    } else {
      // Reveal grows from top; bottom edge has elastic curve
      const edgeY = height * p
      d = `M 0 0 L ${width} 0 L ${width} ${edgeY} Q ${width / 2} ${edgeY + curve} 0 ${edgeY} Z`
    }

    state.pathEl.setAttribute('d', d)
  }

  function applyHandleTransform(state: LiquidSwipeState): void {
    if (!state.handleEl) return
    const { height } = state.rect
    const edgeY = direction === 'up' ? height * (1 - state.progress) : height * state.progress
    const handleH = state.handleEl.offsetHeight
    state.handleEl.style.transform = `translate3d(0, ${edgeY - handleH * 0.5}px, 0)`
    if (state.addedAriaAttrs) {
      state.handleEl.setAttribute('aria-valuenow', String(Math.round(state.progress * 100)))
    }
  }

  function applyCSSVars(state: LiquidSwipeState): void {
    const { height } = state.rect
    const edgeY = direction === 'up' ? height * (1 - state.progress) : height * state.progress
    state.root.style.setProperty('--sc-liquid-progress', state.progress.toFixed(4))
    state.root.style.setProperty('--sc-liquid-edge', `${edgeY.toFixed(2)}px`)
  }

  function render(state: LiquidSwipeState): void {
    buildClipPath(state)
    applyHandleTransform(state)
    applyCSSVars(state)
    onProgress?.(state.progress)
  }

  function notifyCompletion(state: LiquidSwipeState, toProgress: number): void {
    if (toProgress === 1 && !state.completed) {
      state.completed = true
      onComplete?.()
    } else if (toProgress === 0 && state.completed) {
      state.completed = false
      onReset?.()
    }
  }

  function snapTo(state: LiquidSwipeState, toProgress: number, duration: number): void {
    if (state.snapRafId !== null) {
      cancelAnimationFrame(state.snapRafId)
      state.snapRafId = null
    }

    if (reduceMotion?.matches) {
      state.progress = toProgress
      state.curveStretch = 0
      state.animating = false
      render(state)
      notifyCompletion(state, toProgress)
      return
    }

    const fromProgress = state.progress
    const fromCurve = state.curveStretch
    const start = performance.now()
    state.animating = true

    function step(now: number): void {
      const t = Math.min(1, (now - start) / duration)
      const e = lsEaseOut(t)
      state.progress = fromProgress + (toProgress - fromProgress) * e
      state.curveStretch = fromCurve * (1 - e)
      render(state)

      if (t < 1) {
        state.snapRafId = requestAnimationFrame(step)
      } else {
        state.progress = toProgress
        state.curveStretch = 0
        state.animating = false
        state.snapRafId = null
        render(state)
        notifyCompletion(state, toProgress)
      }
    }

    state.snapRafId = requestAnimationFrame(step)
  }

  roots.forEach((root) => {
    const revealEl = root.querySelector(revealSel) as HTMLElement | null
    const handleEl = root.querySelector(handleSel) as HTMLElement | null
    const clipId = `sc-lq-${++_lsIdCounter}`

    // Inline SVG that hosts the clipPath definition
    const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg') as SVGSVGElement
    svgEl.setAttribute('aria-hidden', 'true')
    svgEl.setAttribute('focusable', 'false')
    svgEl.style.cssText = 'position:absolute;width:0;height:0;overflow:visible;pointer-events:none;top:0;left:0'

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
    const clipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath')
    clipPath.setAttribute('id', clipId)
    // userSpaceOnUse → coordinates match the clipped element's own coordinate space
    clipPath.setAttribute('clipPathUnits', 'userSpaceOnUse')
    const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path') as SVGPathElement
    clipPath.appendChild(pathEl)
    defs.appendChild(clipPath)
    svgEl.appendChild(defs)

    // Root must be positioned so absolute children work correctly
    const computedPos = getComputedStyle(root).position
    const addedPosition = computedPos === 'static'
    if (addedPosition) root.style.position = 'relative'

    root.appendChild(svgEl)

    const origRevealClip = revealEl?.style.clipPath ?? ''
    const origRevealWillChange = revealEl?.style.willChange ?? ''
    const origHandleTransform = handleEl?.style.transform ?? ''

    if (revealEl) {
      revealEl.style.clipPath = `url(#${clipId})`
      revealEl.style.willChange = 'clip-path'
    }

    // Accessibility: make handle a slider so screen readers report progress
    let addedAriaAttrs = false
    if (handleEl && !handleEl.hasAttribute('aria-valuenow')) {
      addedAriaAttrs = true
      handleEl.setAttribute('role', handleEl.getAttribute('role') ?? 'slider')
      handleEl.setAttribute('aria-valuenow', '0')
      handleEl.setAttribute('aria-valuemin', '0')
      handleEl.setAttribute('aria-valuemax', '100')
    }

    const state: LiquidSwipeState = {
      root,
      revealEl,
      handleEl,
      svgEl,
      pathEl,
      clipId,
      progress: 0,
      curveStretch: 0,
      dragging: false,
      dragStartY: 0,
      dragStartProgress: 0,
      rect: root.getBoundingClientRect(),
      rafId: null,
      snapRafId: null,
      animating: false,
      completed: false,
      addedPosition,
      origRevealClip,
      origRevealWillChange,
      origHandleTransform,
      addedAriaAttrs,
    }
    states.push(state)

    if (handleEl) {
      function onPointerDown(e: PointerEvent): void {
        // Allow interrupting an in-flight snap
        if (state.animating) {
          if (state.snapRafId !== null) {
            cancelAnimationFrame(state.snapRafId)
            state.snapRafId = null
            state.animating = false
          } else {
            return
          }
        }
        state.dragging = true
        state.dragStartY = e.clientY
        state.dragStartProgress = state.progress
        state.rect = state.root.getBoundingClientRect()
        ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
        e.preventDefault()
      }

      function onPointerMove(e: PointerEvent): void {
        if (!state.dragging) return
        const deltaY = e.clientY - state.dragStartY
        const { height } = state.rect
        if (!height) return
        const deltaProgress = direction === 'up' ? -deltaY / height : deltaY / height
        state.progress = Math.max(0, Math.min(1, state.dragStartProgress + deltaProgress))
        // Stretch curve proportionally to drag distance
        state.curveStretch = Math.min(1, Math.abs(deltaY) / (height * 0.25))
        if (state.rafId !== null) return
        state.rafId = requestAnimationFrame(() => {
          state.rafId = null
          render(state)
        })
      }

      function onPointerUp(_e: PointerEvent): void {
        if (!state.dragging) return
        state.dragging = false
        if (snap) {
          snapTo(state, state.progress >= threshold ? 1 : 0, 450)
        } else {
          state.curveStretch = 0
          render(state)
        }
      }

      function onKeyDown(e: KeyboardEvent): void {
        const step = 0.1
        let next = state.progress
        if (e.key === 'ArrowUp') {
          e.preventDefault()
          next = direction === 'up' ? Math.min(1, next + step) : Math.max(0, next - step)
        } else if (e.key === 'ArrowDown') {
          e.preventDefault()
          next = direction === 'up' ? Math.max(0, next - step) : Math.min(1, next + step)
        } else if (e.key === 'Home') {
          e.preventDefault()
          next = 0
        } else if (e.key === 'End') {
          e.preventDefault()
          next = 1
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          next = next > 0.5 ? 0 : 1
        } else {
          return
        }
        if (next !== state.progress) snapTo(state, next, 300)
      }

      handleEl.addEventListener('pointerdown', onPointerDown)
      handleEl.addEventListener('pointermove', onPointerMove)
      handleEl.addEventListener('pointerup', onPointerUp)
      handleEl.addEventListener('pointercancel', onPointerUp)
      handleEl.addEventListener('keydown', onKeyDown)

      eventCleanups.push(() => {
        handleEl.removeEventListener('pointerdown', onPointerDown)
        handleEl.removeEventListener('pointermove', onPointerMove)
        handleEl.removeEventListener('pointerup', onPointerUp)
        handleEl.removeEventListener('pointercancel', onPointerUp)
        handleEl.removeEventListener('keydown', onKeyDown)
      })
    }

    // Initial render (nothing revealed at start)
    render(state)
  })

  function onResize(): void {
    states.forEach((state) => {
      if (!state.dragging) {
        state.rect = state.root.getBoundingClientRect()
        render(state)
      }
    })
  }

  window.addEventListener('resize', onResize)

  return () => {
    window.removeEventListener('resize', onResize)
    eventCleanups.forEach((fn) => fn())

    states.forEach((state) => {
      if (state.rafId !== null) cancelAnimationFrame(state.rafId)
      if (state.snapRafId !== null) cancelAnimationFrame(state.snapRafId)

      state.svgEl.parentNode?.removeChild(state.svgEl)

      if (state.revealEl) {
        state.revealEl.style.clipPath = state.origRevealClip
        state.revealEl.style.willChange = state.origRevealWillChange
      }

      if (state.handleEl) {
        state.handleEl.style.transform = state.origHandleTransform
        if (state.addedAriaAttrs) {
          state.handleEl.removeAttribute('aria-valuenow')
          state.handleEl.removeAttribute('aria-valuemin')
          state.handleEl.removeAttribute('aria-valuemax')
        }
      }

      if (state.addedPosition) state.root.style.position = ''

      state.root.style.removeProperty('--sc-liquid-progress')
      state.root.style.removeProperty('--sc-liquid-edge')
    })
  }
}

// ─── textReveal ──────────────────────────────────────────────────────────────

/**
 * Splits text into word or letter spans and animates them into view.
 * Returns a cleanup function that disconnects the observer and restores the original text nodes.
 *
 * @example
 * const stop = textReveal('.headline', { type: 'letters', stagger: 24 })
 */
export function textReveal(
  target: string | Element | NodeList | Element[],
  options: TextRevealOptions = {},
): () => void {
  const {
    type = 'words',
    stagger = 40,
    duration = 600,
    ease = 'cubicOut',
    threshold = 0.12,
    rootMargin = '0px 0px -10% 0px',
    once = true,
    inClass = 'sc-in',
  } = options

  const easeFn = resolveEase(ease)
  const elements = resolveElements(target) as HTMLElement[]
  if (!elements.length) return () => {}

  const states = elements
    .map((element) => splitElementText(element, type))
    .filter((state) => state.spans.length > 0)
  const rafIds = new Set<number>()

  if (!states.length) return () => {}

  if (!('IntersectionObserver' in window)) {
    states.forEach((state) => {
      finishTextRevealSpans(state.spans)
      state.element.classList.add(inClass)
    })
    return () => {
      states.forEach((state) => {
        state.element.classList.remove(inClass)
        restoreTextRevealState(state)
      })
    }
  }

  const stateByElement = new Map<Element, TextRevealElementState>(
    states.map((state) => [state.element, state]),
  )

  function animateSpan(span: HTMLElement, delay: number): void {
    const start = performance.now() + delay

    function step(now: number) {
      if (now < start) {
        const rafId = requestAnimationFrame(step)
        rafIds.add(rafId)
        return
      }

      const progress = Math.min(1, (now - start) / duration)
      const eased = easeFn(progress)
      span.style.opacity = String(eased)
      span.style.transform = `translateY(${(1 - eased) * 0.75}em)`

      if (progress < 1) {
        const rafId = requestAnimationFrame(step)
        rafIds.add(rafId)
      } else {
        span.style.opacity = '1'
        span.style.transform = 'none'
        span.style.willChange = 'auto'
      }
    }

    const rafId = requestAnimationFrame(step)
    rafIds.add(rafId)
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const state = stateByElement.get(entry.target)
        if (!state) return

        if (!entry.isIntersecting) {
          if (!once) {
            state.element.classList.remove(inClass)
            resetTextRevealSpans(state.spans)
          }
          return
        }

        state.spans.forEach((span, index) => animateSpan(span, index * stagger))
        state.element.classList.add(inClass)
        if (once) observer.unobserve(entry.target)
      })
    },
    { threshold, rootMargin },
  )

  states.forEach((state) => observer.observe(state.element))

  return () => {
    observer.disconnect()
    rafIds.forEach((rafId) => cancelAnimationFrame(rafId))
    rafIds.clear()
    states.forEach((state) => {
      state.element.classList.remove(inClass)
      restoreTextRevealState(state)
    })
  }
}

// ─── joystick ─────────────────────────────────────────────────────────────────

export interface JoystickState {
  /** Normalized horizontal offset, -1 (left) to 1 (right). */
  x: number
  /** Normalized vertical offset, -1 (up) to 1 (down). */
  y: number
  /** Angle in degrees, 0 = top, increases clockwise. */
  angle: number
  /** Pixel distance from center. */
  distance: number
  /** distance / radius clamped 0–1. */
  progress: number
}

export interface JoystickOptions {
  /** Selector for the draggable knob element. Default: '.sc-joystick-knob' */
  knob?: string
  /** Selector for indicator dot elements. Default: '.sc-joystick-dot' */
  indicators?: string
  /** Maximum travel radius in pixels. Default: 80 */
  radius?: number
  /** Animate knob back to center on release. Default: true */
  returnToCenter?: boolean
  /** Use spring-like overshoot on the return animation. Default: true */
  spring?: boolean
  /** Disable all interaction. Default: false */
  disabled?: boolean
  /** Called every frame while dragging or animating. */
  onMove?: (state: JoystickState) => void
  /** Called when interaction ends (after return animation if returnToCenter). */
  onRelease?: (state: JoystickState) => void
}

type JoystickInternalState = {
  root: HTMLElement
  knobEl: HTMLElement | null
  indicatorEls: HTMLElement[]
  cx: number
  cy: number
  knobX: number
  knobY: number
  dragging: boolean
  rafId: number | null
  returnRafId: number | null
  origKnobTransform: string
  addedRootPosition: boolean
}

/**
 * Neumorphic joystick with a draggable knob constrained to a circular area.
 * Returns a cleanup function that removes all listeners and restores styles.
 *
 * @example
 * const stop = joystick('.sc-joystick-base', {
 *   radius: 80,
 *   onMove: ({ x, y, angle, progress }) => console.log(x, y),
 * })
 */
export function joystick(
  target: string | Element | NodeList | Element[],
  options: JoystickOptions = {},
): () => void {
  const {
    knob: knobSel = '.sc-joystick-knob',
    indicators: indicatorSel = '.sc-joystick-dot',
    radius = 80,
    returnToCenter = true,
    spring = true,
    disabled = false,
    onMove,
    onRelease,
  } = options

  if (disabled) return () => {}

  const roots = resolveElements(target) as HTMLElement[]
  if (!roots.length) return () => {}

  const reduceMotion = typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null

  const states: JoystickInternalState[] = []
  const eventCleanups: Array<() => void> = []

  function computeCenter(root: HTMLElement): { cx: number; cy: number } {
    const rect = root.getBoundingClientRect()
    return { cx: rect.left + rect.width / 2, cy: rect.top + rect.height / 2 }
  }

  function buildJoystickState(knobX: number, knobY: number): JoystickState {
    const distance = Math.sqrt(knobX * knobX + knobY * knobY)
    const progress = Math.min(1, distance / radius)
    const angle = distance < 0.5
      ? 0
      : (Math.atan2(knobX, -knobY) * 180 / Math.PI + 360) % 360
    return {
      x: knobX / radius,
      y: knobY / radius,
      angle,
      distance,
      progress,
    }
  }

  function joySpringEase(t: number): number {
    // Decaying cosine — subtle overshoot then settles
    return 1 - Math.cos(t * Math.PI * 1.5) * Math.pow(2, -10 * t)
  }

  function joyEaseOut(t: number): number {
    return 1 - (1 - t) ** 3
  }

  function updateIndicators(state: JoystickInternalState, js: JoystickState): void {
    const { indicatorEls } = state
    if (!indicatorEls.length) return

    const n = indicatorEls.length
    const step = 360 / n
    // Number of active dots scales with progress (0 → 0 dots, 1 → up to 5 dots)
    const activeDotCount = Math.round(js.progress * Math.min(5, Math.ceil(n / 2.4)))

    indicatorEls.forEach((dot, i) => {
      const dotAngle = i * step
      let diff = Math.abs(js.angle - dotAngle)
      if (diff > 180) diff = 360 - diff
      // Spread: one dot at center, add more on each side
      const active = activeDotCount > 0 && diff < step * (activeDotCount + 0.5)
      dot.classList.toggle('sc-active', active)
    })
  }

  function applyKnobAndVars(state: JoystickInternalState): void {
    const js = buildJoystickState(state.knobX, state.knobY)

    if (state.knobEl) {
      state.knobEl.style.transform = `translate3d(${state.knobX}px, ${state.knobY}px, 0) rotateX(calc(var(--sc-joystick-y) * -10deg)) rotateY(calc(var(--sc-joystick-x) * 10deg))`
      state.knobEl.setAttribute(
        'aria-valuetext',
        `x ${js.x.toFixed(2)}, y ${js.y.toFixed(2)}, angle ${Math.round(js.angle)} degrees`,
      )
    }

    state.root.style.setProperty('--sc-joystick-x', js.x.toFixed(4))
    state.root.style.setProperty('--sc-joystick-y', js.y.toFixed(4))
    state.root.style.setProperty('--sc-joystick-angle', js.angle.toFixed(1))
    state.root.style.setProperty('--sc-joystick-progress', js.progress.toFixed(4))

    updateIndicators(state, js)
    onMove?.(js)
  }

  function animateReturn(state: JoystickInternalState, afterReturn?: () => void): void {
    if (state.returnRafId !== null) {
      cancelAnimationFrame(state.returnRafId)
      state.returnRafId = null
    }

    if (reduceMotion?.matches) {
      state.knobX = 0
      state.knobY = 0
      applyKnobAndVars(state)
      afterReturn?.()
      return
    }

    const fromX = state.knobX
    const fromY = state.knobY
    const start = performance.now()
    const duration = 420
    const easeFn = spring ? joySpringEase : joyEaseOut

    function step(now: number): void {
      const t = Math.min(1, (now - start) / duration)
      const e = easeFn(t)
      state.knobX = fromX * (1 - e)
      state.knobY = fromY * (1 - e)
      applyKnobAndVars(state)

      if (t < 1) {
        state.returnRafId = requestAnimationFrame(step)
      } else {
        state.knobX = 0
        state.knobY = 0
        state.returnRafId = null
        applyKnobAndVars(state)
        afterReturn?.()
      }
    }

    state.returnRafId = requestAnimationFrame(step)
  }

  function clampToCircle(x: number, y: number): { x: number; y: number } {
    const dist = Math.sqrt(x * x + y * y)
    if (dist > radius) {
      const scale = radius / dist
      return { x: x * scale, y: y * scale }
    }
    return { x, y }
  }

  roots.forEach((root) => {
    const knobEl = root.querySelector(knobSel) as HTMLElement | null
    const indicatorEls = Array.from(root.querySelectorAll(indicatorSel)) as HTMLElement[]

    const computedPos = getComputedStyle(root).position
    const addedRootPosition = computedPos === 'static'
    if (addedRootPosition) root.style.position = 'relative'

    const origKnobTransform = knobEl?.style.transform ?? ''

    const { cx, cy } = computeCenter(root)

    const state: JoystickInternalState = {
      root,
      knobEl,
      indicatorEls,
      cx,
      cy,
      knobX: 0,
      knobY: 0,
      dragging: false,
      rafId: null,
      returnRafId: null,
      origKnobTransform,
      addedRootPosition,
    }
    states.push(state)

    if (knobEl) {
      knobEl.setAttribute('role', knobEl.getAttribute('role') ?? 'slider')
      knobEl.setAttribute('aria-valuetext', 'center')
      if (!knobEl.getAttribute('aria-label')) {
        knobEl.setAttribute('aria-label', 'Joystick control')
      }

      function onPointerDown(e: PointerEvent): void {
        // Cancel in-flight return
        if (state.returnRafId !== null) {
          cancelAnimationFrame(state.returnRafId)
          state.returnRafId = null
        }
        state.dragging = true
        state.root.classList.add('sc-dragging')
        const c = computeCenter(root)
        state.cx = c.cx
        state.cy = c.cy
        ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
        e.preventDefault()
      }

      function onPointerMove(e: PointerEvent): void {
        if (!state.dragging) return
        const clamped = clampToCircle(e.clientX - state.cx, e.clientY - state.cy)
        state.knobX = clamped.x
        state.knobY = clamped.y
        if (state.rafId !== null) return
        state.rafId = requestAnimationFrame(() => {
          state.rafId = null
          applyKnobAndVars(state)
        })
      }

      function onPointerUp(_e: PointerEvent): void {
        if (!state.dragging) return
        state.dragging = false
        state.root.classList.remove('sc-dragging')
        if (returnToCenter) {
          animateReturn(state, () => onRelease?.(buildJoystickState(0, 0)))
        } else {
          onRelease?.(buildJoystickState(state.knobX, state.knobY))
        }
      }

      function onKeyDown(e: KeyboardEvent): void {
        const step = radius * 0.15
        let nx = state.knobX
        let ny = state.knobY

        if (e.key === 'ArrowUp') {
          e.preventDefault(); ny = ny - step
        } else if (e.key === 'ArrowDown') {
          e.preventDefault(); ny = ny + step
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault(); nx = nx - step
        } else if (e.key === 'ArrowRight') {
          e.preventDefault(); nx = nx + step
        } else if (e.key === 'Home' || e.key === 'Escape') {
          e.preventDefault()
          if (returnToCenter) {
            animateReturn(state, () => onRelease?.(buildJoystickState(0, 0)))
          } else {
            state.knobX = 0; state.knobY = 0
            applyKnobAndVars(state)
            onRelease?.(buildJoystickState(0, 0))
          }
          return
        } else {
          return
        }

        const clamped = clampToCircle(nx, ny)
        state.knobX = clamped.x
        state.knobY = clamped.y
        applyKnobAndVars(state)
      }

      knobEl.addEventListener('pointerdown', onPointerDown)
      knobEl.addEventListener('pointermove', onPointerMove)
      knobEl.addEventListener('pointerup', onPointerUp)
      knobEl.addEventListener('pointercancel', onPointerUp)
      knobEl.addEventListener('keydown', onKeyDown)

      eventCleanups.push(() => {
        knobEl.removeEventListener('pointerdown', onPointerDown)
        knobEl.removeEventListener('pointermove', onPointerMove)
        knobEl.removeEventListener('pointerup', onPointerUp)
        knobEl.removeEventListener('pointercancel', onPointerUp)
        knobEl.removeEventListener('keydown', onKeyDown)
      })
    }

    applyKnobAndVars(state)
  })

  function onResize(): void {
    states.forEach((state) => {
      if (!state.dragging) {
        const c = computeCenter(state.root)
        state.cx = c.cx
        state.cy = c.cy
      }
    })
  }

  window.addEventListener('resize', onResize)

  return () => {
    window.removeEventListener('resize', onResize)
    eventCleanups.forEach((fn) => fn())

    states.forEach((state) => {
      if (state.rafId !== null) cancelAnimationFrame(state.rafId)
      if (state.returnRafId !== null) cancelAnimationFrame(state.returnRafId)

      if (state.knobEl) {
        state.knobEl.style.transform = state.origKnobTransform
        state.knobEl.removeAttribute('aria-valuetext')
      }

      state.indicatorEls.forEach((dot) => dot.classList.remove('sc-active'))

      state.root.classList.remove('sc-dragging')

      if (state.addedRootPosition) state.root.style.position = ''

      state.root.style.removeProperty('--sc-joystick-x')
      state.root.style.removeProperty('--sc-joystick-y')
      state.root.style.removeProperty('--sc-joystick-angle')
      state.root.style.removeProperty('--sc-joystick-progress')
    })
  }
}
