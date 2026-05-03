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
