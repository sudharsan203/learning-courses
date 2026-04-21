import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageSection from '../../components/PageSection'
import { useLearning } from '../../hooks/useLearning'

function CoursesPage() {
  const { courses, currentUser, enrollments } = useLearning()
  const [searchText, setSearchText] = useState('')

  const filteredCourses = courses.filter((course) => {
    const searchValue = searchText.toLowerCase()

    return (
      course.title.toLowerCase().includes(searchValue) ||
      course.category.toLowerCase().includes(searchValue) ||
      course.level.toLowerCase().includes(searchValue)
    )
  })

  const getDetailsPath = (courseId) => {
    if (currentUser?.role === 'student') {
      return `/student/courses/${courseId}`
    }

    return `/courses/${courseId}`
  }

  const isEnrolled = (courseId) => {
    return enrollments.some((enrollment) => enrollment.courseId === courseId && enrollment.studentId === currentUser?.id)
  }

  return (
    <PageSection eyebrow="Course List" title="Find a course and start learning.">
      <div className="row mb-4">
        <div className="col-lg-6">
          <input
            className="form-control"
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search by title, category, or level"
            value={searchText}
          />
        </div>
      </div>

      <div className="row g-4">
        {filteredCourses.map((course) => (
          <div className="col-md-6 col-xl-4" key={course.id}>
            <div className="panel h-100 course-list-card">
              <span className="badge text-bg-success">{course.level}</span>
              <h2>{course.title}</h2>
              <p>{course.description}</p>
              <div className="course-meta">
                <span>{course.category}</span>
                <span>{course.duration}</span>
              </div>
              {isEnrolled(course.id) && <span className="badge text-bg-info mt-3">Enrolled</span>}
              <Link className="btn btn-primary w-100 mt-4" to={getDetailsPath(course.id)}>
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && <div className="panel text-center">No courses found.</div>}
    </PageSection>
  )
}

export default CoursesPage
