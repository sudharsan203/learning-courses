import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageSection from '../../components/PageSection'

const courseVisuals = {
  Frontend: {
    accent: 'teal',
    imageText: '</>',
    rating: '4.7',
    learners: '1,248',
    price: '₹499',
    originalPrice: '₹3,099',
  },
  Programming: {
    accent: 'indigo',
    imageText: 'JS',
    rating: '4.6',
    learners: '982',
    price: '₹399',
    originalPrice: '₹2,499',
  },
  Backend: {
    accent: 'coral',
    imageText: 'API',
    rating: '4.8',
    learners: '756',
    price: '₹699',
    originalPrice: '₹3,499',
  },
}

const fallbackVisual = {
  accent: 'gold',
  imageText: 'LH',
  rating: '4.5',
  learners: '620',
  price: '₹499',
  originalPrice: '₹2,999',
}

function CoursesPage({ courses, currentUser, enrollments }) {
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
        {filteredCourses.map((course) => {
          const visual = courseVisuals[course.category] ?? fallbackVisual

          return (
            <div className="col-md-6 col-xl-4" key={course.id}>
              <div className="udemy-course-card h-100">
                <Link className="course-card-link" to={getDetailsPath(course.id)} aria-label={`View ${course.title}`}>
                  <div className={`course-thumbnail ${visual.accent}`}>
                    <span>{visual.imageText}</span>
                  </div>
                  <div className="course-card-body">
                    <div className="course-card-topline">
                      <span className="course-category">{course.category}</span>
                      {isEnrolled(course.id) && <span className="course-enrolled">Enrolled</span>}
                    </div>
                    <h2>{course.title}</h2>
                    <p className="course-instructor">{course.instructor}</p>
                    <div className="course-rating" aria-label={`Rating ${visual.rating} out of 5`}>
                      <strong>{visual.rating}</strong>
                      <span className="rating-stars">★★★★★</span>
                      <span>({visual.learners})</span>
                    </div>
                    <div className="course-card-meta">
                      <span>{course.duration}</span>
                      <span>{course.level}</span>
                    </div>
                    <p className="course-card-description">{course.description}</p>
                    <div className="course-price-row">
                      <strong>{visual.price}</strong>
                      <span>{visual.originalPrice}</span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      {filteredCourses.length === 0 && <div className="panel text-center">No courses found.</div>}
    </PageSection>
  )
}

export default CoursesPage
