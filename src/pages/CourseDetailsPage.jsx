import { Link, Navigate, useParams } from 'react-router-dom'

const courseDetails = {
  Frontend: {
    accent: 'teal',
    imageText: '</>',
    rating: '4.7',
    learners: '1,248',
    price: '₹499',
    originalPrice: '₹3,099',
    updated: 'April 2026',
    lessons: '42 lectures',
    learn: [
      'Build reusable React components with props and state',
      'Manage forms, events, lists, and conditional rendering',
      'Use hooks to organize interactive UI behavior',
      'Create a clean React project structure for real apps',
    ],
    curriculum: [
      { title: 'React basics and setup', lectures: 8, time: '58 min' },
      { title: 'Components, props, and state', lectures: 12, time: '1 hr 36 min' },
      { title: 'Hooks and app interactions', lectures: 14, time: '2 hr 5 min' },
      { title: 'Final practice project', lectures: 8, time: '1 hr 12 min' },
    ],
  },
  Programming: {
    accent: 'indigo',
    imageText: 'JS',
    rating: '4.6',
    learners: '982',
    price: '₹399',
    originalPrice: '₹2,499',
    updated: 'March 2026',
    lessons: '36 lectures',
    learn: [
      'Understand variables, functions, arrays, and objects',
      'Write modern JavaScript with clean syntax',
      'Handle DOM events and browser interactions',
      'Practice problem solving with small coding exercises',
    ],
    curriculum: [
      { title: 'JavaScript language foundations', lectures: 10, time: '1 hr 8 min' },
      { title: 'Functions, arrays, and objects', lectures: 11, time: '1 hr 44 min' },
      { title: 'DOM and event handling', lectures: 9, time: '1 hr 21 min' },
      { title: 'Practice challenges', lectures: 6, time: '52 min' },
    ],
  },
  Backend: {
    accent: 'coral',
    imageText: 'API',
    rating: '4.8',
    learners: '756',
    price: '₹699',
    originalPrice: '₹3,499',
    updated: 'April 2026',
    lessons: '39 lectures',
    learn: [
      'Design REST API routes for common app workflows',
      'Handle requests, responses, and validation cleanly',
      'Connect frontend screens to backend endpoints',
      'Structure API code so it is easier to extend',
    ],
    curriculum: [
      { title: 'API fundamentals', lectures: 7, time: '49 min' },
      { title: 'Routes, controllers, and validation', lectures: 13, time: '1 hr 58 min' },
      { title: 'Frontend integration', lectures: 11, time: '1 hr 35 min' },
      { title: 'Testing and final API project', lectures: 8, time: '1 hr 18 min' },
    ],
  },
}

const fallbackDetails = {
  accent: 'gold',
  imageText: 'LH',
  rating: '4.5',
  learners: '620',
  price: '₹499',
  originalPrice: '₹2,999',
  updated: 'April 2026',
  lessons: '32 lectures',
  learn: [
    'Understand the core concepts behind this topic',
    'Practice with guided lessons and examples',
    'Apply what you learn in a small project',
    'Build confidence for the next level of learning',
  ],
  curriculum: [
    { title: 'Getting started', lectures: 8, time: '55 min' },
    { title: 'Core concepts', lectures: 10, time: '1 hr 20 min' },
    { title: 'Hands-on practice', lectures: 9, time: '1 hr 12 min' },
    { title: 'Course project', lectures: 5, time: '48 min' },
  ],
}

function CourseDetailsPage({ courses, currentUser, enrollments, enrollCourse, unenrollCourse, updateProgress }) {
  const { courseId } = useParams()
  const course = courses.find((item) => item.id === courseId)

  if (!course) {
    return <Navigate to="/courses" replace />
  }

  const details = courseDetails[course.category] ?? fallbackDetails
  const enrollment = enrollments.find(
    (item) => item.courseId === course.id && item.studentId === currentUser?.id,
  )

  return (
    <section className="course-details-page">
      <div className="course-details-hero">
        <div className="container">
          <div className="course-details-grid">
            <div className="course-details-main">
              <span className="course-category">{course.category}</span>
              <h1>{course.title}</h1>
              <p className="course-details-lead">{course.description}</p>
              <div className="course-details-rating">
                <strong>{details.rating}</strong>
                <span className="rating-stars">★★★★★</span>
                <span>({details.learners} ratings)</span>
                <span>{details.learners} students</span>
              </div>
              <p className="course-details-byline">
                Created by <strong>{course.instructor}</strong>
              </p>
              <div className="course-details-facts">
                <span>Last updated {details.updated}</span>
                <span>{course.level}</span>
                <span>{course.duration}</span>
              </div>
            </div>

            <aside className="course-purchase-card">
              <div className={`course-preview ${details.accent}`}>
                <span>{details.imageText}</span>
                <strong>Preview this course</strong>
              </div>
              <div className="course-purchase-body">
                <div className="course-detail-price">
                  <strong>{details.price}</strong>
                  <span>{details.originalPrice}</span>
                </div>
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
                    <p>Login as a student to enroll and track your progress.</p>
                    <Link className="btn btn-primary w-100 mt-3" to="/login">
                      Login to Enroll
                    </Link>
                  </>
                )}
                <ul className="course-includes">
                  <li>{details.lessons}</li>
                  <li>Lifetime access</li>
                  <li>Certificate of completion</li>
                  <li>Mobile and desktop access</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="course-content-layout">
          <div className="course-content-main">
            <section className="course-learn-box">
              <h2>What you'll learn</h2>
              <div className="learn-grid">
                {details.learn.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </section>

            <section className="course-curriculum">
              <div className="course-section-heading">
                <h2>Course content</h2>
                <span>
                  {details.curriculum.length} sections • {details.lessons} • {course.duration}
                </span>
              </div>
              <div className="curriculum-list">
                {details.curriculum.map((section) => (
                  <div className="curriculum-row" key={section.title}>
                    <strong>{section.title}</strong>
                    <span>
                      {section.lectures} lectures • {section.time}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className="course-description-block">
              <h2>Description</h2>
              <p>{course.description}</p>
              <p>
                This course is built for practical learning with short lessons, guided examples, and a clear path from
                fundamentals to a finished project.
              </p>
            </section>
          </div>
        </div>
      </div>
    </section>
  )
}

function StudentCourseActions({ courseId, enrollment, enrollCourse, unenrollCourse, updateProgress }) {
  if (!enrollment) {
    return (
      <button className="btn btn-primary w-100 mt-3" type="button" onClick={() => enrollCourse(courseId)}>
        Enroll Now
      </button>
    )
  }

  return (
    <div className="course-progress-box">
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
      <button className="btn btn-outline-danger w-100 mt-2" type="button" onClick={() => unenrollCourse(courseId)}>
        Unenroll Course
      </button>
    </div>
  )
}

export default CourseDetailsPage
