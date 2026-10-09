import type { Settings } from './types'

const NS = 'pulse'

function k(suffix: string) {
  return `${NS}:${suffix}`
}

export const keys = {
  records: k('records'),
  bodyMetrics: k('bodyMetrics'),
  routines: k('routines'),
  settings: k('settings'),
  activeSession: k('activeSession'),
  theme: k('theme'),
} as const

export function get<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (raw == null) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function set<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // ignore
  }
}

export const defaults: Settings = {
  units: 'metric',
  theme: 'dark',
  beep: true,
  autoAdvance: true,
  restDefault: 60,
  showRpe: false,
}
