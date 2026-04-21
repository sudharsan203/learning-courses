import { Navigate } from 'react-router-dom'
import { useLearning } from '../hooks/useLearning'

function ProtectedRoute({ allowedRole, children }) {
  const { currentUser } = useLearning()

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  if (currentUser.role !== allowedRole) {
    return <Navigate to={`/${currentUser.role}/dashboard`} replace />
  }

  return children
}

export default ProtectedRoute
