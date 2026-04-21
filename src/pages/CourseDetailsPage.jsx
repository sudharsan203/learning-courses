import { Link, Navigate, useParams } from 'react-router-dom'
import PageSection from '../components/PageSection'
import { useLearning } from '../hooks/useLearning'

function CourseDetailsPage() {
  const { courseId } = useParams()
  const { courses, currentUser, enrollments, enrollCourse, unenrollCourse, updateProgress } = useLearning()
  const course = courses.find((item) => item.id === courseId)

  if (!course) {
    return <Navigate to="/courses" replace />
  }

  const enrollment = enrollments.find(
    (item) => item.courseId === course.id && item.studentId === currentUser?.id,
  )

  return (
    <PageSection eyebrow="Course Details" title={course.title}>
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="panel h-100">
            <div className="d-flex flex-wrap gap-2 mb-3">
              <span className="badge text-bg-success">{course.level}</span>
              <span className="badge text-bg-light">{course.category}</span>
              <span className="badge text-bg-light">{course.duration}</span>
            </div>
            <p>{course.description}</p>
            <div className="summary-row">
              <span>Instructor</span>
              <strong>{course.instructor}</strong>
            </div>
            <div className="summary-row">
              <span>Course ID</span>
              <strong>{course.id}</strong>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="panel h-100">
            {currentUser?.role === 'student' ? (
              <StudentCourseActions
                courseId={course.id}
                enrollment={enrollment}
                updateProgress={updateProgress}
                enrollCourse={enrollCourse}
                unenrollCourse={unenrollCourse}
              />
            ) : (
              <>
                <h2>Ready to learn?</h2>
                <p>Login as a student to enroll and track your progress.</p>
                <Link className="btn btn-primary w-100 mt-3" to="/login">
                  Login to Enroll
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </PageSection>
  )
}

function StudentCourseActions({ courseId, enrollment, enrollCourse, unenrollCourse, updateProgress }) {
  if (!enrollment) {
    return (
      <>
        <h2>Enroll Now</h2>
        <p>Start this course and track your progress from your student dashboard.</p>
        <button className="btn btn-primary w-100 mt-3" type="button" onClick={() => enrollCourse(courseId)}>
          Enroll Course
        </button>
      </>
    )
  }

  return (
    <>
      <h2>Your Progress</h2>
      <div className="progress my-3" role="progressbar" aria-label="Course progress">
        <div className="progress-bar" style={{ width: `${enrollment.progress}%` }}></div>
      </div>
      <label className="form-label w-100">
        Progress: {enrollment.progress}%
        <input
          className="form-range mt-3"
          max="100"
          min="0"
          onChange={(event) => updateProgress(courseId, event.target.value)}
          type="range"
          value={enrollment.progress}
        />
      </label>
      <button className="btn btn-outline-danger w-100 mt-3" type="button" onClick={() => unenrollCourse(courseId)}>
        Unenroll Course
      </button>
    </>
  )
}

export default CourseDetailsPage
