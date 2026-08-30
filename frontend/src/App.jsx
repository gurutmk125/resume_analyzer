import { useState } from 'react'
import ResumeReview from './pages/ResumeReview'
import AnalysisHistory from './pages/AnalysisHistory'
import './App.css'

function App() {
  const [view, setView] = useState('analyze')

  return (
    <>
      <nav>
        <button type="button" onClick={() => setView('analyze')} disabled={view === 'analyze'}>
          New Analysis
        </button>
        <button type="button" onClick={() => setView('history')} disabled={view === 'history'}>
          History
        </button>
      </nav>

      {view === 'analyze' ? <ResumeReview /> : <AnalysisHistory />}
    </>
  )
}

export default App
