import type { Program } from '../lib/types'

export const programs: Program[] = [
  {
    id: 'strength-5d',
    name: 'Strength 5-Day',
    description: 'Classic strength split: Upper/Lower style with focus lifts.',
    frequency: 5,
    difficulty: 'intermediate',
    goal: 'strength',
    weeks: 12,
    sessions: [
      {
        id: 'day-1-upper-a',
        dayName: 'Day 1 — Upper A',
        focus: 'chest',
        durationMin: 60,
        exercises: [
          {
            id: 'pe-1',
            exerciseId: 'bb-bench-press',
            order: 1,
            sets: [
              { id: 's1', order: 1, reps: 5, weightKg: 70, restSec: 120 },
              { id: 's2', order: 2, reps: 5, weightKg: 70, restSec: 120 },
              { id: 's3', order: 3, reps: 5, weightKg: 70, restSec: 120 },
            ],
          },
          {
            id: 'pe-2',
            exerciseId: 'pull-ups',
            order: 2,
            sets: [
              { id: 's1', order: 1, reps: 5, restSec: 90 },
              { id: 's2', order: 2, reps: 4, restSec: 90 },
            ],
          },
          {
            id: 'pe-3',
            exerciseId: 'ohp',
            order: 3,
            sets: [
              { id: 's1', order: 1, reps: 5, weightKg: 40, restSec: 90 },
              { id: 's2', order: 2, reps: 5, weightKg: 40, restSec: 90 },
            ],
          },
        ],
      },
      {
        id: 'day-2-lower-a',
        dayName: 'Day 2 — Lower A',
        focus: 'legs',
        durationMin: 55,
        exercises: [
          {
            id: 'pe-1',
            exerciseId: 'bb-squat',
            order: 1,
            sets: [
              { id: 's1', order: 1, reps: 5, weightKg: 90, restSec: 150 },
              { id: 's2', order: 2, reps: 5, weightKg: 90, restSec: 150 },
            ],
          },
          {
            id: 'pe-2',
            exerciseId: 'bb-deadlift',
            order: 2,
            sets: [
              { id: 's1', order: 1, reps: 3, weightKg: 110, restSec: 180 },
            ],
          },
        ],
      },
      {
        id: 'day-3-rest-mob',
        dayName: 'Day 3 — Mobility',
        focus: 'mobility',
        durationMin: 20,
        exercises: [
          {
            id: 'pe-1',
            exerciseId: 'mobility-flow',
            order: 1,
            sets: [
              { id: 's1', order: 1, reps: 10, restSec: 30 },
            ],
          },
        ],
      },
      {
        id: 'day-4-upper-b',
        dayName: 'Day 4 — Upper B',
        focus: 'chest',
        durationMin: 55,
        exercises: [
          {
            id: 'pe-1',
            exerciseId: 'incline-bb-press',
            order: 1,
            sets: [
              { id: 's1', order: 1, reps: 5, weightKg: 60, restSec: 120 },
              { id: 's2', order: 2, reps: 5, weightKg: 60, restSec: 120 },
            ],
          },
          {
            id: 'pe-2',
            exerciseId: 'chin-ups',
            order: 2,
            sets: [
              { id: 's1', order: 1, reps: 5, restSec: 90 },
              { id: 's2', order: 2, reps: 4, restSec: 90 },
            ],
          },
        ],
      },
      {
        id: 'day-5-lower-b',
        dayName: 'Day 5 — Lower B',
        focus: 'legs',
        durationMin: 50,
        exercises: [
          {
            id: 'pe-1',
            exerciseId: 'bb-squat',
            order: 1,
            sets: [
              { id: 's1', order: 1, reps: 5, weightKg: 95, restSec: 150 },
              { id: 's2', order: 2, reps: 3, weightKg: 95, restSec: 150 },
            ],
          },
          {
            id: 'pe-2',
            exerciseId: 'leg-press',
            order: 2,
            sets: [
              { id: 's1', order: 1, reps: 8, weightKg: 120, restSec: 90 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'hypertrophy-4d',
    name: 'Hypertrophy 4-Day',
    description: 'Upper/Lower x2 with higher volume.',
    frequency: 4,
    difficulty: 'intermediate',
    goal: 'hypertrophy',
    weeks: 10,
    sessions: [
      {
        id: 'u1',
        dayName: 'Day 1 — Upper 1',
        focus: 'chest',
        durationMin: 55,
        exercises: [
          {
            id: 'pe-1',
            exerciseId: 'bb-bench-press',
            order: 1,
            sets: [
              { id: 's1', order: 1, reps: 8, weightKg: 60, restSec: 100 },
              { id: 's2', order: 2, reps: 8, weightKg: 60, restSec: 100 },
              { id: 's3', order: 3, reps: 8, weightKg: 60, restSec: 100 },
            ],
          },
          {
            id: 'pe-2',
            exerciseId: 'pull-ups',
            order: 2,
            sets: [
              { id: 's1', order: 1, reps: 8, restSec: 90 },
              { id: 's2', order: 2, reps: 8, restSec: 90 },
            ],
          },
        ],
      },
      {
        id: 'l1',
        dayName: 'Day 2 — Lower 1',
        focus: 'legs',
        durationMin: 55,
        exercises: [
          {
            id: 'pe-1',
            exerciseId: 'bb-squat',
            order: 1,
            sets: [
              { id: 's1', order: 1, reps: 8, weightKg: 80, restSec: 120 },
              { id: 's2', order: 2, reps: 8, weightKg: 80, restSec: 120 },
              { id: 's3', order: 3, reps: 8, weightKg: 80, restSec: 120 },
            ],
          },
        ],
      },
      {
        id: 'u2',
        dayName: 'Day 3 — Upper 2',
        focus: 'shoulders',
        durationMin: 55,
        exercises: [
          {
            id: 'pe-1',
            exerciseId: 'ohp',
            order: 1,
            sets: [
              { id: 's1', order: 1, reps: 8, weightKg: 35, restSec: 100 },
              { id: 's2', order: 2, reps: 8, weightKg: 35, restSec: 100 },
              { id: 's3', order: 3, reps: 8, weightKg: 35, restSec: 100 },
            ],
          },
        ],
      },
      {
        id: 'l2',
        dayName: 'Day 4 — Lower 2',
        focus: 'legs',
        durationMin: 55,
        exercises: [
          {
            id: 'pe-1',
            exerciseId: 'leg-press',
            order: 1,
            sets: [
              { id: 's1', order: 1, reps: 10, weightKg: 130, restSec: 90 },
              { id: 's2', order: 2, reps: 10, weightKg: 130, restSec: 90 },
              { id: 's3', order: 3, reps: 10, weightKg: 130, restSec: 90 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'fat-loss-4d',
    name: 'Fat Loss 4-Day',
    description: 'Full-body conditioning with cardio.',
    frequency: 4,
    difficulty: 'beginner',
    goal: 'fat-loss',
    weeks: 8,
    sessions: [
      {
        id: 'fb1',
        dayName: 'Day 1 — Full Body + Cardio',
        focus: 'full-body',
        durationMin: 40,
        exercises: [
          {
            id: 'pe-1',
            exerciseId: 'push-ups',
            order: 1,
            sets: [
              { id: 's1', order: 1, reps: 12, restSec: 60 },
              { id: 's2', order: 2, reps: 12, restSec: 60 },
            ],
          },
          {
            id: 'pe-2',
            exerciseId: 'pull-ups',
            order: 2,
            sets: [
              { id: 's1', order: 1, reps: 6, restSec: 60 },
              { id: 's2', order: 2, reps: 6, restSec: 60 },
            ],
          },
          {
            id: 'pe-3',
            exerciseId: 'running',
            order: 3,
            sets: [
              { id: 's1', order: 1, reps: 1, restSec: 0 },
            ],
          },
        ],
      },
    ],
  },
]