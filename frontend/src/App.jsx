import { useState } from 'react'
import { pingGemini } from './api/gemini'
import './App.css'

function App() {
  const [status, setStatus] = useState('idle')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  async function handlePing() {
    setStatus('loading')
    setError(null)
    try {
      const data = await pingGemini()
      setResult(data)
      setStatus('success')
    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }

  return (
    <section id="center">
      <h1>Resume Analyzer</h1>
      <p>Smoke test: frontend → backend → Gemini</p>
      <button type="button" onClick={handlePing} disabled={status === 'loading'}>
        {status === 'loading' ? 'Pinging Gemini...' : 'Ping Gemini'}
      </button>

      {status === 'success' && (
        <div>
          <p><strong>Prompt:</strong> {result.prompt}</p>
          <p><strong>Response:</strong> {result.response}</p>
        </div>
      )}

      {status === 'error' && (
        <p style={{ color: 'red' }}>Error: {error}</p>
      )}
    </section>
  )
}

export default App
