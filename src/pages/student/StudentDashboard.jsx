import { Link } from 'react-router-dom'
import PageSection from '../../components/PageSection'
import { useLearning } from '../../hooks/useLearning'

function StudentDashboard() {
  const { currentUser, courses, enrollments } = useLearning()
  const myEnrollments = enrollments.filter((enrollment) => enrollment.studentId === currentUser.id)
  const completedCourses = myEnrollments.filter((enrollment) => enrollment.progress === 100).length
  const averageProgress =
    myEnrollments.length === 0
      ? 0
      : Math.round(myEnrollments.reduce((total, enrollment) => total + enrollment.progress, 0) / myEnrollments.length)

  return (
    <PageSection eyebrow="Student Dashboard" title={`Welcome back, ${currentUser.name}.`}>
      <div className="row g-4 mb-4">
        <DashboardStat label="Enrolled Courses" value={myEnrollments.length} />
        <DashboardStat label="Completed Courses" value={completedCourses} />
        <DashboardStat label="Average Progress" value={`${averageProgress}%`} />
      </div>

      <div className="panel">
        <div className="d-flex flex-wrap justify-content-between gap-3 mb-3">
          <h2 className="mb-0">Continue Learning</h2>
          <Link className="btn btn-primary" to="/student/courses">
            Browse Courses
          </Link>
        </div>

        {myEnrollments.length === 0 && <p>You have not enrolled in any course yet.</p>}

        <div className="row g-4">
          {myEnrollments.slice(0, 3).map((enrollment) => {
            const course = courses.find((item) => item.id === enrollment.courseId)

            if (!course) return null

            return (
              <div className="col-md-4" key={enrollment.id}>
                <div className="mini-course">
                  <h3>{course.title}</h3>
                  <div className="progress my-3" role="progressbar" aria-label={`${course.title} progress`}>
                    <div className="progress-bar" style={{ width: `${enrollment.progress}%` }}></div>
                  </div>
                  <p>{enrollment.progress}% completed</p>
                  <Link className="btn btn-sm btn-outline-primary" to={`/student/courses/${course.id}`}>
                    Open Course
                  </Link>
                </div>
              </div>
            )
          })}
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

export default StudentDashboard
