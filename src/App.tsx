import { Layout } from './components/Layout'
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Programs from './pages/Programs'
import ProgramDetail from './pages/ProgramDetail'
import Library from './pages/Library'
import WorkoutPlayer from './pages/WorkoutPlayer'
import Progress from './pages/Progress'
import Builder from './pages/Builder'
import Calculators from './pages/Calculators'
import Settings from './pages/Settings'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/programs/:id" element={<ProgramDetail />} />
        <Route path="/library" element={<Library />} />
        <Route path="/workout" element={<WorkoutPlayer />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/builder" element={<Builder />} />
        <Route path="/calculators" element={<Calculators />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  )
}