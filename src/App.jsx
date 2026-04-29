import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AlertMessage from './components/AlertMessage'
import { defaultCourses, defaultEnrollments, defaultUsers } from './data/learningData'
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
  const [users, setUsers] = useState(defaultUsers)
  const [courses, setCourses] = useState(defaultCourses)
  const [enrollments, setEnrollments] = useState(defaultEnrollments)
  const [currentUser, setCurrentUser] = useState(null)
  const [alert, setAlert] = useState(null)

  const showAlert = (type, message) => {
    setAlert({ type, message })
    setTimeout(() => setAlert(null), 3000)
  }

  const login = (email, password) => {
    const user = users.find((item) => item.email === email && item.password === password)

    if (!user) {
      showAlert('danger', 'Invalid email or password.')
      return null
    }

    setCurrentUser(user)
    showAlert('success', `Welcome back, ${user.name}.`)
    return user
  }

  const logout = () => {
    setCurrentUser(null)
    showAlert('success', 'You have been logged out.')
  }

  const registerStudent = ({ name, email, password }) => {
    const emailAlreadyExists = users.some((user) => user.email.toLowerCase() === email.toLowerCase())

    if (emailAlreadyExists) {
      showAlert('danger', 'An account with this email already exists.')
      return null
    }

    const newStudent = {
      id: `student-${Date.now()}`,
      name,
      email,
      password,
      role: 'student',
    }

    setUsers([...users, newStudent])
    setCurrentUser(newStudent)
    showAlert('success', `Welcome to LearningHub, ${name}.`)
    return newStudent
  }

  const addCourse = (course) => {
    setCourses([...courses, { ...course, id: `course-${Date.now()}` }])
    showAlert('success', 'Course created successfully.')
  }

  const updateCourse = (courseId, updatedCourse) => {
    setCourses(courses.map((course) => (course.id === courseId ? { ...course, ...updatedCourse } : course)))
    showAlert('success', 'Course updated successfully.')
  }

  const deleteCourse = (courseId) => {
    setCourses(courses.filter((course) => course.id !== courseId))
    setEnrollments(enrollments.filter((enrollment) => enrollment.courseId !== courseId))
    showAlert('success', 'Course deleted successfully.')
  }

  const enrollCourse = (courseId) => {
    const alreadyEnrolled = enrollments.some(
      (enrollment) => enrollment.courseId === courseId && enrollment.studentId === currentUser.id,
    )

    if (alreadyEnrolled) {
      showAlert('warning', 'You are already enrolled in this course.')
      return
    }

    setEnrollments([
      ...enrollments,
      {
        id: `enroll-${Date.now()}`,
        studentId: currentUser.id,
        courseId,
        progress: 0,
      },
    ])
    showAlert('success', 'Course enrolled successfully.')
  }

  const unenrollCourse = (courseId) => {
    setEnrollments(
      enrollments.filter(
        (enrollment) => !(enrollment.courseId === courseId && enrollment.studentId === currentUser.id),
      ),
    )
    showAlert('success', 'Course unenrolled successfully.')
  }

  const updateProgress = (courseId, progress) => {
    setEnrollments(
      enrollments.map((enrollment) => {
        if (enrollment.courseId === courseId && enrollment.studentId === currentUser.id) {
          return { ...enrollment, progress: Number(progress) }
        }

        return enrollment
      }),
    )
    showAlert('success', 'Progress updated successfully.')
  }

  return (
    <div className="app-shell">
      <Header currentUser={currentUser} logout={logout} />
      <AlertMessage alert={alert} />

      <main>
        <Routes>
          <Route path="/" element={<HomePage courses={courses} />} />
          <Route
            path="/courses"
            element={<CoursesPage courses={courses} currentUser={currentUser} enrollments={enrollments} />}
          />
          <Route
            path="/courses/:courseId"
            element={
              <CourseDetailsPage
                courses={courses}
                currentUser={currentUser}
                enrollments={enrollments}
                enrollCourse={enrollCourse}
                unenrollCourse={unenrollCourse}
                updateProgress={updateProgress}
              />
            }
          />
          <Route path="/login" element={<LoginPage currentUser={currentUser} login={login} />} />
          <Route
            path="/register"
            element={<RegisterPage currentUser={currentUser} registerStudent={registerStudent} />}
          />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRole="admin" currentUser={currentUser}>
                <AdminDashboard courses={courses} enrollments={enrollments} users={users} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/courses"
            element={
              <ProtectedRoute allowedRole="admin" currentUser={currentUser}>
                <AdminCoursesPage
                  addCourse={addCourse}
                  courses={courses}
                  deleteCourse={deleteCourse}
                  enrollments={enrollments}
                  updateCourse={updateCourse}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute allowedRole="student" currentUser={currentUser}>
                <StudentDashboard courses={courses} currentUser={currentUser} enrollments={enrollments} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/courses"
            element={
              <ProtectedRoute allowedRole="student" currentUser={currentUser}>
                <CoursesPage courses={courses} currentUser={currentUser} enrollments={enrollments} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/courses/:courseId"
            element={
              <ProtectedRoute allowedRole="student" currentUser={currentUser}>
                <CourseDetailsPage
                  courses={courses}
                  currentUser={currentUser}
                  enrollments={enrollments}
                  enrollCourse={enrollCourse}
                  unenrollCourse={unenrollCourse}
                  updateProgress={updateProgress}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/my-courses"
            element={
              <ProtectedRoute allowedRole="student" currentUser={currentUser}>
                <MyCoursesPage
                  courses={courses}
                  currentUser={currentUser}
                  enrollments={enrollments}
                  unenrollCourse={unenrollCourse}
                  updateProgress={updateProgress}
                />
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
