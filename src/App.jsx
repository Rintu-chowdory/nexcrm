import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Contacts from './pages/Contacts';
import Pipeline from './pages/Pipeline';
import Deals from './pages/Deals';
import Activities from './pages/Activities';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter basename="/nexcrm">
      <div className="flex min-h-screen bg-navy">
        <Sidebar />
        <main className="ml-64 flex-1 p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/pipeline" element={<Pipeline />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
