import { useEffect, useState } from 'react'
import { listAnalyses } from '../api/analyze'
import HistoryList from '../components/HistoryList'

function AnalysisHistory() {
  const [status, setStatus] = useState('loading')
  const [items, setItems] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    listAnalyses()
      .then((data) => {
        setItems(data)
        setStatus('success')
      })
      .catch((err) => {
        setError(err.message)
        setStatus('error')
      })
  }, [])

  return (
    <section id="center">
      <h1>Past Analyses</h1>

      {status === 'loading' && <p>Loading...</p>}
      {status === 'error' && <p style={{ color: 'red' }}>Error: {error}</p>}
      {status === 'success' && <HistoryList items={items} />}
    </section>
  )
}

export default AnalysisHistory
