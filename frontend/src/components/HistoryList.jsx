import { useState } from 'react'
import { getAnalysis } from '../api/analyze'
import AnalysisReport from './AnalysisReport'

function HistoryList({ items }) {
  const [expandedId, setExpandedId] = useState(null)
  const [detailsById, setDetailsById] = useState({})
  const [loadingIds, setLoadingIds] = useState(new Set())
  const [errorsById, setErrorsById] = useState({})

  async function toggleExpand(id) {
    if (expandedId === id) {
      setExpandedId(null)
      return
    }

    setExpandedId(id)

    if (!detailsById[id]) {
      setLoadingIds((prev) => new Set(prev).add(id))
      setErrorsById((prev) => ({ ...prev, [id]: null }))
      try {
        const detail = await getAnalysis(id)
        setDetailsById((prev) => ({ ...prev, [id]: detail }))
      } catch (err) {
        setErrorsById((prev) => ({ ...prev, [id]: err.message }))
      } finally {
        setLoadingIds((prev) => {
          const next = new Set(prev)
          next.delete(id)
          return next
        })
      }
    }
  }

  if (items.length === 0) {
    return <p>No past analyses yet.</p>
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <button type="button" onClick={() => toggleExpand(item.id)}>
            {new Date(item.created_at).toLocaleString()} — {item.score} ({item.tier})
          </button>

          {expandedId === item.id && (
            <div>
              {loadingIds.has(item.id) && <p>Loading...</p>}
              {errorsById[item.id] && <p style={{ color: 'red' }}>Error: {errorsById[item.id]}</p>}
              {detailsById[item.id] && <AnalysisReport report={detailsById[item.id]} />}
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}

export default HistoryList
