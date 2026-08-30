import { useState } from 'react'

function UploadForm({ onSubmit, isSubmitting }) {
  const [resumeFile, setResumeFile] = useState(null)
  const [jobDescription, setJobDescription] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (!resumeFile || !jobDescription.trim()) return
    onSubmit(resumeFile, jobDescription)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="resume-upload">Resume (.pdf or .md)</label>
        <input
          id="resume-upload"
          type="file"
          accept=".pdf,.md"
          onChange={(event) => setResumeFile(event.target.files[0] ?? null)}
        />
      </div>

      <div>
        <label htmlFor="job-description">Job Description</label>
        <textarea
          id="job-description"
          rows={10}
          value={jobDescription}
          onChange={(event) => setJobDescription(event.target.value)}
          placeholder="Paste the job description here"
        />
      </div>

      <button type="submit" disabled={isSubmitting || !resumeFile || !jobDescription.trim()}>
        {isSubmitting ? 'Analyzing...' : 'Analyze'}
      </button>
    </form>
  )
}

export default UploadForm
