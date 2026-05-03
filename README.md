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

- 🌐 **Live Demo** → https://scroll-craft-psi.vercel.app
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
  .counter('[data-count]', { duration: 1400 })
  .progress('#timeline .step')
  .textReveal('.headline')
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

---

## Chainable API

All effects are available on a single `ScrollCraft` instance. Call `.destroy()` to disconnect all observers and listeners.

```ts
import { ScrollCraft } from 'scroll-craft'

const sc = new ScrollCraft()

sc.reveal('.hero-text', { delay: 100, direction: 'up' })
  .counter('[data-count]', { duration: 1200 })
  .progress('#timeline .step')
  .textReveal('.headline', { type: 'words' })

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
│   ├── effects.ts    — reveal, counter, progress, textReveal
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
