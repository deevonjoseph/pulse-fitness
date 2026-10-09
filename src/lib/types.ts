export type MuscleGroup =
  | 'chest'
  | 'back'
  | 'legs'
  | 'shoulders'
  | 'arms'
  | 'core'
  | 'full-body'
  | 'cardio'
  | 'mobility'

export type Equipment =
  | 'barbell'
  | 'dumbbell'
  | 'machine'
  | 'cable'
  | 'kettlebell'
  | 'bodyweight'
  | 'band'
  | 'other'

export type Exercise = {
  id: string
  name: string
  muscleGroup: MuscleGroup
  equipment: Equipment
  difficulty: 'easy' | 'med' | 'hard'
  description: string
  primary: string[]
  secondary: string[]
}

export type PlannedSet = {
  id: string
  order: number
  reps: number
  weightKg?: number
  restSec: number
}

export type PlannedExercise = {
  id: string
  exerciseId: string
  order: number
  sets: PlannedSet[]
  warmup?: boolean
  note?: string
  supersetGroup?: string
}

export type SessionPlan = {
  id: string
  dayName: string
  focus: MuscleGroup | 'full-body' | 'cardio' | 'mobility'
  exercises: PlannedExercise[]
  durationMin?: number
  note?: string
}

export type Program = {
  id: string
  name: string
  description: string
  frequency: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  goal: 'strength' | 'hypertrophy' | 'fat-loss' | 'endurance' | 'mobility'
  weeks: number
  sessions: SessionPlan[]
}

export type SetLog = {
  id: string
  order: number
  reps: number
  weightKg?: number
  done: boolean
  rpe?: number
}

export type ExerciseLog = {
  id: string
  exerciseId: string
  order: number
  sets: SetLog[]
  note?: string
}

export type WorkoutRecord = {
  id: string
  programId?: string
  sessionId?: string
  startedAt: number
  endedAt: number
  durationSec: number
  exercises: ExerciseLog[]
  note?: string
}

export type BodyMetric = {
  id: string
  date: string
  weightKg?: number
  bodyFatPct?: number
  waistCm?: number
  neckCm?: number
  hipsCm?: number
  calfCm?: number
  armCm?: number
  chestCm?: number
  thighCm?: number
}

export type Routine = {
  id: string
  name: string
  exercises: PlannedExercise[]
  favorite?: boolean
}

export type Settings = {
  units: 'metric' | 'imperial'
  theme: 'dark' | 'light'
  beep: boolean
  autoAdvance: boolean
  restDefault: number
  showRpe: boolean
}

export type ActiveSet = {
  id: string
  exIndex: number
  setIndex: number
  exerciseId: string
  repsTarget: number
  weightKg?: number
  restSec: number
}

export type ActiveSession = {
  id: string
  programId?: string
  sessionId?: string
  startedAt: number
  exercises: PlannedExercise[]
  logs: ExerciseLog[]
  current: ActiveSet | null
  paused: boolean
  elapsedSec: number
  timerEndsAt?: number
}