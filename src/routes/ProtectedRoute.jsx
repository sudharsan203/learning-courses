import { Navigate } from 'react-router-dom'

function ProtectedRoute({ allowedRole, children, currentUser }) {
  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  if (currentUser.role !== allowedRole) {
    return <Navigate to={`/${currentUser.role}/dashboard`} replace />
  }

  return children
}

export default ProtectedRoute
