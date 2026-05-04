# ScrollCraft

![CI](https://github.com/Bilal-Studios/scroll-craft/actions/workflows/ci.yml/badge.svg)
![npm](https://img.shields.io/npm/v/scroll-craft?color=blue)
![size](https://img.shields.io/bundlephobia/minzip/scroll-craft)
![license](https://img.shields.io/npm/l/scroll-craft)
![stars](https://img.shields.io/github/stars/Bilal-Studios/scroll-craft?style=social)

✨ Lightweight scroll animation toolkit for modern websites  
⚡ Zero dependencies  
🎯 Built for performance, simplicity, and clean UI

---

## Links

- 🌐 **Live Demo** → https://scroll-craft.bilalstudio.io
- 📦 **NPM** → https://www.npmjs.com/package/scroll-craft
- 🐙 **GitHub** → https://github.com/Bilal-Studios/scroll-craft

---

## Why ScrollCraft?

Most scroll libraries are too heavy, too complex, and overkill for simple projects.

**ScrollCraft is different:**

| | |
|---|---|
| 🪶 | Tiny footprint (~3KB minified) |
| ⚡ | Smooth, rAF-based animations |
| 🧠 | Simple, intuitive API |
| 🔗 | Chainable methods |
| 🧩 | Zero dependencies |

---

## Installation

```bash
npm install scroll-craft
# or
yarn add scroll-craft
```

---

## Quick Start

```ts
import { ScrollCraft } from 'scroll-craft'

const sc = new ScrollCraft()

sc.reveal('.card')
  .blurReveal('.panel')
  .counter('[data-count]', { duration: 1400 })
  .parallax('.hero-orb')
  .progress('#timeline .step')
  .scene('.story', [
    { target: '.title', from: { opacity: 0 }, to: { opacity: 1 } },
    { target: '.image', from: { y: 80 }, to: { y: 0 } },
  ])
  .scrollProgress('.page-progress', { axis: 'y', property: 'width' })
  .stagger('.feature-grid', { children: '.card' })
  .textReveal('.headline')
  .zoom('.product-card')
```

---

## Core Effects

### Reveal

Animate elements into view as they enter the viewport.

```ts
import { reveal } from 'scroll-craft'

reveal('.card', {
  direction: 'up',     // 'up' | 'down' | 'left' | 'right'
  distance:  '24px',
  duration:  600,
  ease:      'cubicOut',
  delay:     0,
  threshold: 0.12,
  once:      true,
})
```

### Blur Reveal

Reveal elements by fading them in while reducing blur and vertical movement.

```ts
import { blurReveal } from 'scroll-craft'

blurReveal('.panel', {
  blur: '12px',
  distance: '16px',
  duration: 700,
  ease: 'cubicOut',
  threshold: 0.12,
  rootMargin: '0px 0px -10% 0px',
  once: true,
  inClass: 'sc-in',
})
```

### Counter

Count up from zero to the value in `data-count` when the element scrolls into view.

```ts
import { counter } from 'scroll-craft'

counter('[data-count]', {
  duration:  1400,
  ease:      'cubicOut',
  threshold: 0.45,
  formatter: (n) => n.toLocaleString('en-US'),
  attribute: 'data-count',  // custom attribute name
})
```

```html
<span data-count="94">0</span>
```

### Progress

Fill elements using `clip-path` as each step scrolls through the viewport. The fill element can be anything — text, a bar, an SVG shape.

```ts
import { progress } from 'scroll-craft'

progress('#timeline .step', {
  start:        0.82,     // fill starts when top hits 82% down the viewport
  end:          0.2,      // fill ends when top hits 20% down the viewport
  fillSelector: '.sc-fill',
})
```

```html
<div class="step">
  <span class="step-num-wrap">
    <span class="step-num-ghost">01</span>
    <span class="sc-fill">01</span>  <!-- this gets clip-path animated -->
  </span>
  <p>Step content</p>
</div>
```

### Parallax

Move elements based on scroll position using `translate3d(...)`.

```ts
import { parallax } from 'scroll-craft'

parallax('.hero-orb', {
  speed: 0.25,
  axis: 'y',
  reverse: false,
  clamp: 120,
  rootMargin: '0px',
})
```

The effect batches layout reads, writes transforms in `requestAnimationFrame`, and disables movement for users with `prefers-reduced-motion: reduce`.

### Scroll Progress

Represent page or container scroll progress from 0 to 1.

```ts
import { scrollProgress } from 'scroll-craft'

scrollProgress('.page-progress', {
  axis: 'y',
  property: 'width',
  container: window,
})
```

```html
<div class="page-progress"></div>
```

```css
.page-progress {
  position: fixed;
  inset: 0 auto auto 0;
  height: 4px;
  width: 0;
}
```

Use `property: 'scale'` for transform-based indicators. With `axis: 'x'`, ScrollCraft writes `scaleX(...)`; with `axis: 'y'`, it writes `scaleY(...)`.

### Scene

Create a scroll-driven timeline for a section, similar to a scrubbed ScrollTrigger scene.

```ts
import { scene } from 'scroll-craft'

scene('.story', [
  { target: '.title', start: 0, end: 0.3, from: { opacity: 0 }, to: { opacity: 1 } },
  { target: '.image', start: 0.2, end: 0.7, from: { y: 80 }, to: { y: 0 } },
  { target: '.card', start: 0.5, end: 1, from: { rotate: -8 }, to: { rotate: 0 } },
], {
  start: 0.9,
  end: 0.1,
  ease: 'cubicOut',
})
```

Progress is based on the section top:

```txt
progress 0 = section top hits start * viewport height
progress 1 = section top hits end * viewport height
```

With the defaults, the timeline starts when the section top reaches 90% down the viewport and finishes when it reaches 10% down the viewport. Step selectors are resolved inside each matching section, so the same scene definition can be reused across multiple sections.

Each step can run across its own slice of the scene timeline:

```ts
scene('.story', [
  { target: '.title', start: 0, end: 0.3, from: { opacity: 0 }, to: { opacity: 1 } },
  { target: '.image', start: 0.2, end: 0.7, from: { y: 80 }, to: { y: 0 } },
  { target: '.card', start: 0.5, end: 1, from: { rotate: -8 }, to: { rotate: 0 } },
])
```

For each step, local progress is calculated as:

```txt
local = clamp((sceneProgress - step.start) / (step.end - step.start), 0, 1)
```

Step `start` defaults to `0`, step `end` defaults to `1`, and step `ease` defaults to the parent scene `ease`.

Supported animated values:

| Value | Output |
|---|---|
| `opacity` | Inline opacity |
| `x` | `translate3d(x, y, 0)` in px |
| `y` | `translate3d(x, y, 0)` in px |
| `scale` | `scale(...)` |
| `rotate` | `rotate(...deg)` |

Transforms are combined into one string: `translate3d(x, y, 0) scale(...) rotate(...)`.

### Text Reveal

Split text into word or letter spans and reveal each piece with a staggered scroll animation.

```ts
import { textReveal } from 'scroll-craft'

textReveal('.headline', {
  type: 'words',
  stagger: 40,
  duration: 600,
  ease: 'cubicOut',
  threshold: 0.12,
  rootMargin: '0px 0px -10% 0px',
  once: true,
  inClass: 'sc-in',
})
```

```ts
textReveal('.eyebrow', {
  type: 'letters',
  stagger: 18,
})
```

The effect splits text nodes instead of replacing nested elements wholesale, so inline semantics such as links and emphasis stay in place where possible. Plain-text targets get an accessible label while animation spans are hidden from assistive technology.

### Stagger

Animate child elements sequentially when their parent enters the viewport.

```ts
import { stagger } from 'scroll-craft'

stagger('.feature-grid', {
  children: ':scope > *',
  direction: 'up',
  distance: '24px',
  stagger: 80,
  duration: 600,
  ease: 'cubicOut',
  threshold: 0.12,
  rootMargin: '0px 0px -10% 0px',
  once: true,
  inClass: 'sc-in',
})
```

```html
<div class="feature-grid">
  <article>First card</article>
  <article>Second card</article>
  <article>Third card</article>
</div>
```

### Zoom

Reveal elements by fading them in while scaling from a smaller starting point.

```ts
import { zoom } from 'scroll-craft'

zoom('.product-card', {
  from: 0.94,
  to: 1,
  duration: 600,
  ease: 'cubicOut',
  threshold: 0.12,
  rootMargin: '0px 0px -10% 0px',
  once: true,
  inClass: 'sc-in',
})
```

### Liquid Swipe

> **Implementation:** CSS/SVG `clipPath` with a quadratic-bezier elastic edge — no WebGL or shaders.

Drag a handle to reveal hidden content behind a curved, elastic edge. Supports snap-to-complete, keyboard control, and `prefers-reduced-motion`.

```ts
import { liquidSwipe } from 'scroll-craft'

const stop = liquidSwipe('#liquid-demo', {
  direction:  'up',
  threshold:  0.65,
  tension:    0.35,
  snap:       true,
  onComplete: () => console.log('revealed!'),
  onReset:    () => console.log('reset'),
})

// Clean up
stop()
```

**Required HTML structure:**

```html
<div class="sc-liquid" id="liquid-demo">
  <!-- Base layer (always visible underneath) -->
  <div class="sc-liquid-base">
    <img src="before.jpg" alt="Before" />
  </div>

  <!-- Reveal layer (clipped by the liquid mask) -->
  <div class="sc-liquid-reveal">
    <img src="after.jpg" alt="After" />
  </div>

  <!-- Drag handle -->
  <button class="sc-liquid-handle" type="button" aria-label="Swipe to reveal">
    Swipe up
  </button>
</div>
```

**Minimum CSS:**

```css
.sc-liquid          { position: relative; overflow: hidden; }
.sc-liquid-base,
.sc-liquid-reveal   { position: absolute; inset: 0; }
.sc-liquid-handle   { position: absolute; top: 0; touch-action: none; }
/* centre horizontally without conflicting with JS transform */
.sc-liquid-handle   { left: 50%; margin-left: -70px; width: 140px; }
```

The effect sets two CSS custom properties on the root element you can use for styling:

| Property | Value |
|---|---|
| `--sc-liquid-progress` | Current progress `0`–`1` |
| `--sc-liquid-edge` | Edge position from top in `px` |

**Keyboard support** (when focus is on the handle):

| Key | Action |
|---|---|
| `ArrowUp` / `ArrowDown` | Adjust progress ±0.1 |
| `Home` | Reset to 0 |
| `End` | Complete to 1 |
| `Enter` / `Space` | Toggle between 0 and 1 |

### Joystick

A neumorphic draggable knob constrained to a circular area. Returns normalized `x`/`y` values, angle, and progress on every frame.

```ts
import { joystick } from 'scroll-craft'

const stop = joystick('.sc-joystick-base', {
  radius: 80,
  returnToCenter: true,
  spring: true,
  onMove: ({ x, y, angle, progress }) => {
    console.log(x, y, angle, progress)
  },
  onRelease: (state) => console.log('released', state),
})

stop() // cleanup
```

**Required HTML structure:**

```html
<div class="sc-joystick" id="joystick-demo">
  <div class="sc-joystick-base">

    <button class="sc-joystick-knob" type="button" aria-label="Joystick control"></button>

    <!-- 12 indicator dots — JS positions them in a ring -->
    <span class="sc-joystick-dot"></span>
    <!-- × 12 -->

  </div>
</div>
```

**Minimum CSS:**

```css
/* Pass the sc-joystick-base as the joystick() target so its center is used */
.sc-joystick-base  { position: relative; border-radius: 50%; }
.sc-joystick-knob  { position: absolute; top: 50%; left: 50%;
                     margin-top: -28px; margin-left: -28px;  /* half knob size */
                     touch-action: none; }
.sc-joystick-dot   { position: absolute; border-radius: 50%; }
```

The effect sets four CSS custom properties on the target root:

| Property | Value |
|---|---|
| `--sc-joystick-x` | Normalized x, `-1`–`1` |
| `--sc-joystick-y` | Normalized y, `-1`–`1` |
| `--sc-joystick-angle` | Degrees, `0`=top, clockwise |
| `--sc-joystick-progress` | `0`–`1` (distance / radius) |

**`JoystickState` object** (passed to `onMove` and `onRelease`):

| Field | Type | Description |
|---|---|---|
| `x` | `number` | Normalized horizontal offset, `-1`–`1` |
| `y` | `number` | Normalized vertical offset, `-1`–`1` |
| `angle` | `number` | Degrees from top, 0–360, clockwise |
| `distance` | `number` | Pixel distance from center |
| `progress` | `number` | `distance / radius`, clamped 0–1 |

**Keyboard support** (when focus is on the knob):

| Key | Action |
|---|---|
| `ArrowUp` / `Down` / `Left` / `Right` | Move knob by 15% of radius |
| `Home` / `Escape` | Return to center |

---

## Chainable API

All effects are available on a single `ScrollCraft` instance. Call `.destroy()` to disconnect all observers and listeners.

```ts
import { ScrollCraft } from 'scroll-craft'

const sc = new ScrollCraft()

sc.reveal('.hero-text', { delay: 100, direction: 'up' })
  .blurReveal('.panel', { blur: '12px' })
  .counter('[data-count]', { duration: 1200 })
  .parallax('.hero-orb', { speed: 0.2 })
  .progress('#timeline .step')
  .scene('.story', [
    { target: '.title', from: { opacity: 0 }, to: { opacity: 1 } },
    { target: '.image', from: { y: 80 }, to: { y: 0 } },
  ])
  .scrollProgress('.page-progress', { axis: 'y', property: 'width' })
  .stagger('.feature-grid', { children: '.card' })
  .textReveal('.headline', { type: 'words' })
  .zoom('.product-card', { from: 0.94 })
  .liquidSwipe('#liquid-demo', { direction: 'up', threshold: 0.65 })
  .joystick('.sc-joystick-base', { radius: 80, spring: true })

// Clean up
sc.destroy()
```

---

## Options Reference

### `reveal(target, options?)`

| Option | Type | Default | Description |
|---|---|---|---|
| `direction` | `'up' \| 'down' \| 'left' \| 'right'` | `'up'` | Entry direction |
| `distance` | `string` | `'24px'` | Travel distance |
| `duration` | `number` | `600` | Animation duration (ms) |
| `ease` | `EaseName \| EaseFn` | `'cubicOut'` | Easing function |
| `delay` | `number` | `0` | Delay before animating (ms) |
| `threshold` | `number` | `0.12` | Visible fraction before trigger |
| `rootMargin` | `string` | `'0px 0px -10% 0px'` | Observer root margin |
| `once` | `boolean` | `true` | Unobserve after first reveal |
| `inClass` | `string` | `'sc-in'` | Class added when in view |

### `blurReveal(target, options?)`

| Option | Type | Default | Description |
|---|---|---|---|
| `blur` | `string` | `'12px'` | Initial blur amount |
| `distance` | `string` | `'16px'` | Initial vertical travel distance |
| `duration` | `number` | `700` | Animation duration (ms) |
| `ease` | `EaseName \| EaseFn` | `'cubicOut'` | Easing function |
| `threshold` | `number` | `0.12` | Visible fraction before trigger |
| `rootMargin` | `string` | `'0px 0px -10% 0px'` | Observer root margin |
| `once` | `boolean` | `true` | Unobserve after first reveal |
| `inClass` | `string` | `'sc-in'` | Class added when in view |

### `counter(target, options?)`

| Option | Type | Default | Description |
|---|---|---|---|
| `duration` | `number` | `1400` | Animation duration (ms) |
| `ease` | `EaseName \| EaseFn` | `'cubicOut'` | Easing function |
| `threshold` | `number` | `0.45` | Visible fraction before trigger |
| `formatter` | `(n: number) => string` | `toLocaleString` | Number format function |
| `attribute` | `string` | `'data-count'` | Target value attribute |

### `progress(target, options?)`

| Option | Type | Default | Description |
|---|---|---|---|
| `start` | `number` | `0.82` | Viewport fraction where fill begins |
| `end` | `number` | `0.2` | Viewport fraction where fill ends |
| `fillSelector` | `string` | `'.sc-fill'` | Child element to animate |

### `parallax(target, options?)`

| Option | Type | Default | Description |
|---|---|---|---|
| `speed` | `number` | `0.25` | Scroll movement multiplier |
| `axis` | `'y' \| 'x'` | `'y'` | Axis to move on |
| `reverse` | `boolean` | `false` | Invert movement direction |
| `clamp` | `number` | `120` | Maximum absolute translation in px |
| `rootMargin` | `string` | `'0px'` | Observer root margin for relevance tracking |

### `scrollProgress(target, options?)`

| Option | Type | Default | Description |
|---|---|---|---|
| `axis` | `'x' \| 'y'` | `'x'` | Scroll axis to track |
| `property` | `'scale' \| 'width' \| 'height'` | `'scale'` | Style strategy used to display progress |
| `container` | `Element \| Window` | `window` | Scroll container to read from |

### `scene(target, steps, options?)`

| Option | Type | Default | Description |
|---|---|---|---|
| `start` | `number` | `0.9` | Viewport fraction where timeline progress begins |
| `end` | `number` | `0.1` | Viewport fraction where timeline progress completes |
| `ease` | `EaseName \| EaseFn` | `'linear'` | Easing applied to scroll progress before interpolation |

Each step accepts:

| Field | Type | Description |
|---|---|---|
| `target` | `string \| Element \| NodeList \| Element[]` | Element(s) to animate; string selectors are section-relative |
| `from` | `SceneValues` | Values at progress 0 |
| `to` | `SceneValues` | Values at progress 1 |
| `start` | `number` | Scene progress where this step starts. Default: `0` |
| `end` | `number` | Scene progress where this step ends. Default: `1` |
| `ease` | `EaseName \| EaseFn` | Step easing. Default: inherited scene `ease` |

`SceneValues` supports `opacity`, `x`, `y`, `scale`, and `rotate`.

### `textReveal(target, options?)`

| Option | Type | Default | Description |
|---|---|---|---|
| `type` | `'words' \| 'letters'` | `'words'` | Split text by words or letters |
| `stagger` | `number` | `40` | Delay between each word/letter animation (ms) |
| `duration` | `number` | `600` | Animation duration per word/letter (ms) |
| `ease` | `EaseName \| EaseFn` | `'cubicOut'` | Easing function |
| `threshold` | `number` | `0.12` | Visible fraction before trigger |
| `rootMargin` | `string` | `'0px 0px -10% 0px'` | Observer root margin |
| `once` | `boolean` | `true` | Unobserve after first reveal |
| `inClass` | `string` | `'sc-in'` | Class added when in view |

### `stagger(target, options?)`

| Option | Type | Default | Description |
|---|---|---|---|
| `children` | `string` | `':scope > *'` | Child selector resolved inside each target |
| `direction` | `'up' \| 'down' \| 'left' \| 'right'` | `'up'` | Entry direction for each child |
| `distance` | `string` | `'24px'` | Travel distance for each child |
| `stagger` | `number` | `80` | Delay between each child animation (ms) |
| `duration` | `number` | `600` | Animation duration per child (ms) |
| `ease` | `EaseName \| EaseFn` | `'cubicOut'` | Easing function |
| `threshold` | `number` | `0.12` | Parent visible fraction before trigger |
| `rootMargin` | `string` | `'0px 0px -10% 0px'` | Observer root margin |
| `once` | `boolean` | `true` | Unobserve after first reveal |
| `inClass` | `string` | `'sc-in'` | Class added to the parent when in view |

### `zoom(target, options?)`

| Option | Type | Default | Description |
|---|---|---|---|
| `from` | `number` | `0.94` | Initial scale before reveal |
| `to` | `number` | `1` | Final scale after reveal |
| `duration` | `number` | `600` | Animation duration (ms) |
| `ease` | `EaseName \| EaseFn` | `'cubicOut'` | Easing function |
| `threshold` | `number` | `0.12` | Visible fraction before trigger |
| `rootMargin` | `string` | `'0px 0px -10% 0px'` | Observer root margin |
| `once` | `boolean` | `true` | Unobserve after first reveal |
| `inClass` | `string` | `'sc-in'` | Class added when in view |

### `joystick(target, options?)`

| Option | Type | Default | Description |
|---|---|---|---|
| `knob` | `string` | `'.sc-joystick-knob'` | Selector for the draggable knob |
| `indicators` | `string` | `'.sc-joystick-dot'` | Selector for indicator dot elements |
| `radius` | `number` | `80` | Maximum travel radius in pixels |
| `returnToCenter` | `boolean` | `true` | Animate knob back to center on release |
| `spring` | `boolean` | `true` | Use spring-overshoot on return animation |
| `disabled` | `boolean` | `false` | Disable all interaction |
| `onMove` | `(state: JoystickState) => void` | — | Called every frame while dragging |
| `onRelease` | `(state: JoystickState) => void` | — | Called when interaction ends |

### `liquidSwipe(target, options?)`

> CSS/SVG `clipPath` implementation — no WebGL.

| Option | Type | Default | Description |
|---|---|---|---|
| `direction` | `'up' \| 'down'` | `'up'` | Drag direction that increases progress |
| `handle` | `string` | `'.sc-liquid-handle'` | Selector for the drag handle |
| `reveal` | `string` | `'.sc-liquid-reveal'` | Selector for the element to reveal |
| `threshold` | `number` | `0.65` | Progress at which released drag snaps to 1 |
| `tension` | `number` | `0.35` | Controls curve depth of the elastic edge |
| `snap` | `boolean` | `true` | Snap to 0 or 1 on pointer release |
| `disabled` | `boolean` | `false` | Disable all interaction |
| `onProgress` | `(p: number) => void` | — | Called on every progress update |
| `onComplete` | `() => void` | — | Called once when progress reaches 1 |
| `onReset` | `() => void` | — | Called once when progress returns to 0 |

---

## Easing Functions

All effects accept an `ease` option. Built-in names:

| Name | Curve |
|---|---|
| `linear` | Constant speed |
| `quadOut` | Gentle deceleration |
| `cubicOut` | Default — smooth stop |
| `quartOut` | Stronger deceleration |
| `quintOut` | Aggressive deceleration |
| `elasticOut` | Overshoot + settle |
| `backOut` | Pull back + overshoot |

You can also pass a custom function: `ease: (t) => t * t`

---

## Project Structure

```
scroll-craft/
├── src/
│   ├── index.ts      — ScrollCraft class + re-exports
│   ├── effects.ts    — blurReveal, reveal, counter, parallax, progress, scene, scrollProgress, stagger, textReveal, zoom, liquidSwipe, joystick
│   └── easing.ts     — easing functions
├── dist/             — built output (ESM + CJS + .d.ts)
├── demo/
│   └── index.html    — live demo page
├── package.json
├── tsconfig.json
└── tsup.config.ts
```

---

## Development

```bash
npm install
npm run build     # ESM + CJS + types via tsup
npm run dev       # watch mode
npm run typecheck
```

---

## Roadmap

- [x] Text reveal (word / letter animations)
- [ ] Sticky scroll sections
- [ ] Horizontal scroll support
- [ ] SVG path drawing
- [ ] Presets system
- [ ] `data-scroll` attribute mode (zero-JS setup)
- [ ] Devtools / debug overlay

---

## Philosophy

ScrollCraft is built to make scroll animations simple, fast, and accessible — without pulling in a bloated library. The logic is extracted from real production sites, so every effect is proven to work.

---

## License

MIT © [Bilal Studios](https://bilalstudio.io)

---

## Support

If this project is useful to you:

- ⭐ Star the repo
- 🐛 Open an issue
- 💡 Suggest a feature

Built something with ScrollCraft? Drop it in the issues — would love to see it.

---

> Early version. Expect rapid improvements.
