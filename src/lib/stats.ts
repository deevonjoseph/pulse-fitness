import type { WorkoutRecord } from './types'

export function totalVolume(records: WorkoutRecord[]) {
  let vol = 0
  for (const r of records) {
    for (const el of r.exercises) {
      for (const s of el.sets) {
        if (s.done && s.weightKg && s.reps) vol += s.weightKg * s.reps
      }
    }
  }
  return vol
}

export function lastN<T>(arr: T[], n: number) {
  return arr.slice(-n)
}