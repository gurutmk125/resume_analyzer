const CATEGORY_LABELS = {
  missing_keywords: 'Missing Keywords',
  skill_gaps: 'Skill Gaps',
  phrasing_suggestions: 'Phrasing Suggestions',
  formatting_notes: 'Formatting Notes',
}

function AnalysisReport({ report }) {
  const { score, tier, recommendations } = report

  return (
    <section>
      <h2>{score} — {tier}</h2>

      {Object.entries(CATEGORY_LABELS).map(([key, label]) => {
        const items = recommendations[key] ?? []
        if (items.length === 0) return null

        return (
          <div key={key}>
            <h3>{label}</h3>
            <ul>
              {items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )
      })}
    </section>
  )
}

export default AnalysisReport
