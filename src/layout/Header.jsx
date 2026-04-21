import { Link, NavLink } from 'react-router-dom'
import { adminLinks, publicLinks, studentLinks } from '../data/navigation'
import { useLearning } from '../hooks/useLearning'

function Header() {
  const { currentUser, logout } = useLearning()
  let links = publicLinks

  if (currentUser?.role === 'student') {
    links = studentLinks
  }

  if (currentUser?.role === 'admin') {
    links = adminLinks
  }

  const homePath = currentUser ? links[0].path : '/'

  return (
    <header className="site-header sticky-top">
      <nav className="navbar navbar-expand-lg">
        <div className="container py-2">
          <Link className="brand-button" to={homePath}>
            <span className="brand-mark">L</span>
            <span>
              <strong>LearnHub</strong>
              <small>Course Portal</small>
            </span>
          </Link>

          <div className="nav-actions ms-lg-auto">
            {links.map((link) => (
              <NavLink
                className={({ isActive }) => `nav-link-button ${isActive ? 'active' : ''}`}
                key={link.path}
                to={link.path}
              >
                {link.label}
              </NavLink>
            ))}
            {currentUser && (
              <button className="btn btn-dark logout-button" type="button" onClick={logout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
