export type EaseName =
  | 'linear'
  | 'quadOut'
  | 'cubicOut'
  | 'quartOut'
  | 'quintOut'
  | 'elasticOut'
  | 'backOut'

export type EaseFn = (t: number) => number

const c1 = 1.70158
const c3 = c1 + 1

export const easings: Record<EaseName, EaseFn> = {
  linear: (t) => t,
  quadOut: (t) => 1 - (1 - t) ** 2,
  cubicOut: (t) => 1 - (1 - t) ** 3,
  quartOut: (t) => 1 - (1 - t) ** 4,
  quintOut: (t) => 1 - (1 - t) ** 5,
  elasticOut: (t) => {
    if (t === 0 || t === 1) return t
    return 2 ** (-10 * t) * Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1
  },
  backOut: (t) => 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2,
}

export function resolveEase(ease: EaseName | EaseFn): EaseFn {
  if (typeof ease === 'function') return ease
  return easings[ease] ?? easings.cubicOut
}
