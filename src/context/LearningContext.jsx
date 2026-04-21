import { useEffect, useState } from 'react'
import { LearningContext } from './learningContext'

const defaultUsers = [
  {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@learninghub.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    id: 'student-1',
    name: 'Student User',
    email: 'student@learninghub.com',
    password: 'student123',
    role: 'student',
  },
]

const defaultCourses = [
  {
    id: 'course-1',
    title: 'React Foundations',
    category: 'Frontend',
    level: 'Beginner',
    duration: '6 weeks',
    instructor: 'Meera Sharma',
    description: 'Learn components, props, state, hooks, and simple project structure with React.',
  },
  {
    id: 'course-2',
    title: 'JavaScript Essentials',
    category: 'Programming',
    level: 'Beginner',
    duration: '4 weeks',
    instructor: 'Ravi Kumar',
    description: 'Practice variables, functions, arrays, objects, DOM concepts, and modern syntax.',
  },
  {
    id: 'course-3',
    title: 'Full Stack API Basics',
    category: 'Backend',
    level: 'Intermediate',
    duration: '5 weeks',
    instructor: 'Ananya Rao',
    description: 'Understand REST APIs, request handling, validation, and frontend integration.',
  },
]

const defaultEnrollments = [
  {
    id: 'enroll-1',
    studentId: 'student-1',
    courseId: 'course-1',
    progress: 45,
  },
]

function getStoredValue(key, defaultValue) {
  const savedValue = localStorage.getItem(key)

  if (!savedValue) {
    localStorage.setItem(key, JSON.stringify(defaultValue))
    return defaultValue
  }

  return JSON.parse(savedValue)
}

export function LearningProvider({ children }) {
  const [users, setUsers] = useState(() => getStoredValue('learninghub_users', defaultUsers))
  const [courses, setCourses] = useState(() => getStoredValue('learninghub_courses', defaultCourses))
  const [enrollments, setEnrollments] = useState(() => getStoredValue('learninghub_enrollments', defaultEnrollments))
  const [currentUser, setCurrentUser] = useState(() => getStoredValue('learninghub_current_user', null))
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    localStorage.setItem('learninghub_users', JSON.stringify(users))
  }, [users])

  useEffect(() => {
    localStorage.setItem('learninghub_courses', JSON.stringify(courses))
  }, [courses])

  useEffect(() => {
    localStorage.setItem('learninghub_enrollments', JSON.stringify(enrollments))
  }, [enrollments])

  useEffect(() => {
    localStorage.setItem('learninghub_current_user', JSON.stringify(currentUser))
  }, [currentUser])

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
    const newCourse = {
      ...course,
      id: `course-${Date.now()}`,
    }

    setCourses([...courses, newCourse])
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

  const value = {
    alert,
    courses,
    currentUser,
    deleteCourse,
    enrollCourse,
    enrollments,
    login,
    logout,
    addCourse,
    registerStudent,
    unenrollCourse,
    updateCourse,
    updateProgress,
    users,
  }

  return <LearningContext.Provider value={value}>{children}</LearningContext.Provider>
}
