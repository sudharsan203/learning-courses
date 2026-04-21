import { Link } from 'react-router-dom'
import PageSection from '../../components/PageSection'
import { useLearning } from '../../hooks/useLearning'

function AdminDashboard() {
  const { courses, enrollments, users } = useLearning()
  const studentsCount = users.filter((user) => user.role === 'student').length
  const averageProgress =
    enrollments.length === 0
      ? 0
      : Math.round(enrollments.reduce((total, enrollment) => total + enrollment.progress, 0) / enrollments.length)

  return (
    <PageSection eyebrow="Admin Dashboard" title="LearningHub overview.">
      <div className="row g-4 mb-4">
        <DashboardStat label="Total Courses" value={courses.length} />
        <DashboardStat label="Students" value={studentsCount} />
        <DashboardStat label="Average Progress" value={`${averageProgress}%`} />
      </div>

      <div className="panel">
        <div className="d-flex flex-wrap justify-content-between gap-3">
          <div>
            <p className="section-label">Course Management</p>
            <h2>Create and maintain course content</h2>
            <p>Use the Courses tab to add new courses, update existing details, and remove old courses.</p>
          </div>
          <Link className="btn btn-primary align-self-start" to="/admin/courses">
            Manage Courses
          </Link>
        </div>
      </div>
    </PageSection>
  )
}

function DashboardStat({ label, value }) {
  return (
    <div className="col-md-4">
      <div className="panel h-100">
        <p className="section-label">{label}</p>
        <h2>{value}</h2>
      </div>
    </div>
  )
}

export default AdminDashboard
