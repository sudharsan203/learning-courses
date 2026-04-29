import { Link } from 'react-router-dom'
import PageSection from '../../components/PageSection'

function MyCoursesPage({ courses, currentUser, enrollments, unenrollCourse, updateProgress }) {
  const myEnrollments = enrollments.filter((enrollment) => enrollment.studentId === currentUser.id)

  return (
    <PageSection eyebrow="My Learning" title="Track progress for your enrolled courses.">
      {myEnrollments.length === 0 && (
        <div className="panel text-center">
          <p>You are not enrolled in any courses yet.</p>
          <Link className="btn btn-primary mt-3" to="/student/courses">
            Browse Courses
          </Link>
        </div>
      )}

      <div className="row g-4">
        {myEnrollments.map((enrollment) => {
          const course = courses.find((item) => item.id === enrollment.courseId)

          if (!course) return null

          return (
            <div className="col-lg-6" key={enrollment.id}>
              <div className="panel h-100">
                <span className="badge text-bg-success">{course.level}</span>
                <h2>{course.title}</h2>
                <p>{course.description}</p>
                <div className="progress my-3" role="progressbar" aria-label={`${course.title} progress`}>
                  <div className="progress-bar" style={{ width: `${enrollment.progress}%` }}></div>
                </div>
                <label className="form-label w-100">
                  Progress: {enrollment.progress}%
                  <input
                    className="form-range mt-2"
                    max="100"
                    min="0"
                    onChange={(event) => updateProgress(course.id, event.target.value)}
                    type="range"
                    value={enrollment.progress}
                  />
                </label>
                <div className="table-actions mt-3">
                  <Link className="btn btn-outline-primary" to={`/student/courses/${course.id}`}>
                    View Details
                  </Link>
                  <button className="btn btn-outline-danger" type="button" onClick={() => unenrollCourse(course.id)}>
                    Unenroll
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </PageSection>
  )
}

export default MyCoursesPage
