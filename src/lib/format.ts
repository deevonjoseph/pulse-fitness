export function fmtKg(kg?: number) {
  if (kg == null || Number.isNaN(kg)) return '--'
  return kg % 1 === 0 ? `${kg.toFixed(0)} kg` : `${kg.toFixed(2)} kg`
}

export function fmtReps(n: number) {
  return `${n} rep${n === 1 ? '' : 's'}`
}

export function fmtSec(s: number) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return m > 0 ? `${m}m ${sec.toString().padStart(2, '0')}s` : `${sec}s`
}

export function fmtDate(ts: number) {
  const d = new Date(ts)
  return d.toLocaleDateString(undefined, { dateStyle: 'medium' })
}

export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}