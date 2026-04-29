import { Link } from 'react-router-dom'

const featuredVisuals = {
  Frontend: {
    accent: 'teal',
    imageText: '</>',
    rating: '4.7',
    learners: '1,248',
    price: '₹499',
  },
  Programming: {
    accent: 'indigo',
    imageText: 'JS',
    rating: '4.6',
    learners: '982',
    price: '₹399',
  },
  Backend: {
    accent: 'coral',
    imageText: 'API',
    rating: '4.8',
    learners: '756',
    price: '₹699',
  },
}

const fallbackVisual = {
  accent: 'gold',
  imageText: 'LH',
  rating: '4.5',
  learners: '620',
  price: '₹499',
}

function HomePage({ courses }) {
  const featuredCourses = courses.slice(0, 3)
  const categories = [...new Set(courses.map((course) => course.category))]

  return (
    <>
      <section className="hero-section">
        <div className="container">
          <div className="home-hero">
            <div className="home-hero-copy">
              <span className="home-offer-badge">Learn today</span>
              <h1>Skills for your next project, role, or interview.</h1>
              <p className="lead">
                Build practical web development skills with focused courses, hands-on lessons, and progress tracking
                from day one.
              </p>
              <form className="home-search" action="/courses">
                <input aria-label="Search courses" placeholder="What do you want to learn?" />
                <button type="submit">Search</button>
              </form>
              <div className="home-discovery">
                <span>Popular topics</span>
                <div className="home-category-row">
                  {categories.map((category) => (
                    <Link key={category} to="/courses">
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="home-hero-panel">
              <span className="hero-panel-label">Trending now</span>
              <h2>React Foundations</h2>
              <p>Beginner friendly lessons, guided examples, and a project-ready workflow.</p>
              <div className="hero-panel-meta">
                <strong>4.7 ★</strong>
                <span>1,248 learners</span>
                <span>₹499</span>
              </div>
              <Link className="btn btn-primary w-100 mt-3" to="/courses">
                Browse Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="home-featured-section">
        <div className="container">
          <div className="home-section-heading">
            <div>
              <span className="section-label">Featured courses</span>
              <h2>A broad selection of courses</h2>
            </div>
            <Link className="btn btn-outline-dark" to="/courses">
              View All
            </Link>
          </div>

          <div className="row g-4">
            {featuredCourses.map((course) => {
              const visual = featuredVisuals[course.category] ?? fallbackVisual

              return (
                <div className="col-md-6 col-xl-4" key={course.id}>
                  <Link className="home-featured-card" to={`/courses/${course.id}`}>
                    <div className={`course-thumbnail ${visual.accent}`}>
                      <span>{visual.imageText}</span>
                    </div>
                    <div className="home-featured-body">
                      <h3>{course.title}</h3>
                      <p>{course.instructor}</p>
                      <div className="course-rating">
                        <strong>{visual.rating}</strong>
                        <span className="rating-stars">★★★★★</span>
                        <span>({visual.learners})</span>
                      </div>
                      <strong className="home-featured-price">{visual.price}</strong>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="stats-band">
        <div className="container">
          <div className="row g-3">
            <div className="col-md-4">
              <div className="stat-card">
                <strong>{courses.length}</strong>
                <span>Practical courses</span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stat-card">
                <strong>2k+</strong>
                <span>Learning activities</span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stat-card">
                <strong>100%</strong>
                <span>Progress tracking</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage
