import { useState } from 'react'
import { analyzeResume } from '../api/analyze'
import UploadForm from '../components/UploadForm'
import AnalysisReport from '../components/AnalysisReport'

function ResumeReview() {
  const [status, setStatus] = useState('idle')
  const [report, setReport] = useState(null)
  const [error, setError] = useState(null)

  async function handleSubmit(resumeFile, jobDescription) {
    setStatus('loading')
    setError(null)
    try {
      const data = await analyzeResume(resumeFile, jobDescription)
      setReport(data)
      setStatus('success')
    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }

  return (
    <section id="center">
      <h1>Resume Analyzer</h1>
      <p>Upload your resume and a job description to get a fitment score and recommendations.</p>

      <UploadForm onSubmit={handleSubmit} isSubmitting={status === 'loading'} />

      {status === 'error' && <p style={{ color: 'red' }}>Error: {error}</p>}
      {status === 'success' && <AnalysisReport report={report} />}
    </section>
  )
}

export default ResumeReview
