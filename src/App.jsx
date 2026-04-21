import { Navigate, Route, Routes } from 'react-router-dom'
import AlertMessage from './components/AlertMessage'
import Footer from './layout/Footer'
import Header from './layout/Header'
import ProtectedRoute from './routes/ProtectedRoute'
import AdminCoursesPage from './pages/admin/AdminCoursesPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import CourseDetailsPage from './pages/CourseDetailsPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import CoursesPage from './pages/public/CoursesPage'
import HomePage from './pages/public/HomePage'
import MyCoursesPage from './pages/student/MyCoursesPage'
import StudentDashboard from './pages/student/StudentDashboard'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <Header />
      <AlertMessage />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:courseId" element={<CourseDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/courses"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminCoursesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute allowedRole="student">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/courses"
            element={
              <ProtectedRoute allowedRole="student">
                <CoursesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/courses/:courseId"
            element={
              <ProtectedRoute allowedRole="student">
                <CourseDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/my-courses"
            element={
              <ProtectedRoute allowedRole="student">
                <MyCoursesPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
