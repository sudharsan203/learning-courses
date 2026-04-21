import { Link } from 'react-router-dom'
import heroImg from '../../assets/hero.png'

function HomePage() {
  return (
    <>
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="eyebrow">Frontend-only learning platform</span>
              <h1>Manage courses, enroll students, and track learning progress.</h1>
              <p className="lead">
                LearningHub uses React Router, Context API, Bootstrap, and localStorage for a complete mock learning
                workflow.
              </p>
              <div className="hero-actions">
                <Link className="btn btn-primary btn-lg" to="/login">
                  Login
                </Link>
                <Link className="btn btn-outline-dark btn-lg" to="/courses">
                  Browse Courses
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <img className="hero-image" src={heroImg} alt="Learning dashboard preview" />
            </div>
          </div>
        </div>
      </section>

      <section className="stats-band">
        <div className="container">
          <div className="row g-3">
            <div className="col-md-4">
              <div className="stat-card">
                <strong>Admin</strong>
                <span>Create, edit, and delete courses</span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stat-card">
                <strong>Student</strong>
                <span>Enroll and update progress</span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stat-card">
                <strong>Storage</strong>
                <span>All data stays in localStorage</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage
