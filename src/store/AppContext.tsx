import React, { createContext, useCallback, useContext, useEffect, useReducer, useState } from 'react'
import type { ActiveSession, BodyMetric, Routine, Settings, WorkoutRecord } from '../lib/types'
import { defaults, get, keys, set } from '../lib/storage'

type State = {
  records: WorkoutRecord[]
  bodyMetrics: BodyMetric[]
  routines: Routine[]
  settings: Settings
  activeSession: ActiveSession | null
}

type Action =
  | { type: 'hydrate'; payload: Partial<State> }
  | { type: 'setSettings'; payload: Partial<Settings> }
  | { type: 'setActiveSession'; payload: ActiveSession | null }
  | { type: 'patchActiveSession'; payload: Partial<ActiveSession> }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'hydrate':
      return { ...state, ...action.payload }
    case 'setSettings':
      return { ...state, settings: { ...state.settings, ...action.payload } }
    case 'setActiveSession':
      return { ...state, activeSession: action.payload }
    case 'patchActiveSession':
      if (!state.activeSession) return state
      return { ...state, activeSession: { ...state.activeSession, ...action.payload } }
    default:
      return state
  }
}

const init: State = {
  records: [],
  bodyMetrics: [],
  routines: [],
  settings: defaults,
  activeSession: null,
}

type Ctx = State & {
  setTheme: (t: 'dark' | 'light') => void
  updateSettings: (p: Partial<Settings>) => void
  startSession: (s: ActiveSession) => void
  endSession: () => void
  saveRecord: (r: WorkoutRecord) => void
  addMetric: (m: BodyMetric) => void
  addRoutine: (r: Routine) => void
}

const AppCtx = createContext<Ctx | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, init)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const s: State = {
      records: get<WorkoutRecord[]>(keys.records, []),
      bodyMetrics: get<BodyMetric[]>(keys.bodyMetrics, []),
      routines: get<Routine[]>(keys.routines, []),
      settings: get<Settings>(keys.settings, defaults),
      activeSession: get<ActiveSession | null>(keys.activeSession, null),
    }
    dispatch({ type: 'hydrate', payload: s })
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    set(keys.records, state.records)
    set(keys.bodyMetrics, state.bodyMetrics)
    set(keys.routines, state.routines)
    set(keys.settings, state.settings)
    set(keys.activeSession, state.activeSession)
  }, [hydrated, state.records, state.bodyMetrics, state.routines, state.settings, state.activeSession])

  useEffect(() => {
    const theme = state.settings.theme
    document.documentElement.setAttribute('data-theme', theme)
    set(keys.theme, theme)
  }, [state.settings.theme])

  const setTheme = useCallback((t: 'dark' | 'light') => {
    dispatch({ type: 'setSettings', payload: { theme: t } })
  }, [])

  const updateSettings = useCallback((p: Partial<Settings>) => {
    dispatch({ type: 'setSettings', payload: p })
  }, [])

  const startSession = useCallback((s: ActiveSession) => {
    dispatch({ type: 'setActiveSession', payload: s })
  }, [])

  const endSession = useCallback(() => {
    dispatch({ type: 'setActiveSession', payload: null })
  }, [])

  const saveRecord = useCallback((r: WorkoutRecord) => {
    dispatch({ type: 'hydrate', payload: { records: [...state.records, r] } })
  }, [state.records])

  const addMetric = useCallback((m: BodyMetric) => {
    dispatch({ type: 'hydrate', payload: { bodyMetrics: [...state.bodyMetrics, m] } })
  }, [state.bodyMetrics])

  const addRoutine = useCallback((r: Routine) => {
    dispatch({ type: 'hydrate', payload: { routines: [...state.routines, r] } })
  }, [state.routines])

  const value: Ctx = {
    ...state,
    setTheme,
    updateSettings,
    startSession,
    endSession,
    saveRecord,
    addMetric,
    addRoutine,
  }
  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>
}

export function useApp() {
  const ctx = useContext(AppCtx)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}