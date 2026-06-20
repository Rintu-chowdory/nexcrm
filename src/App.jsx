import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Contacts from './pages/Contacts'
import Pipeline from './pages/Pipeline'
import Deals from './pages/Deals'
import Activities from './pages/Activities'
import Settings from './pages/Settings'
import AIComposer from './pages/AIComposer'

function App() {
  return (
    <Router basename="/nexcrm">
      <div className="flex h-screen bg-navy-900">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/pipeline" element={<Pipeline />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/ai-composer" element={<AIComposer />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
