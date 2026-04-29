export const defaultUsers = [
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

export const defaultCourses = [
  {
    id: 'course-1',
    title: 'React Foundations',
    category: 'Frontend',
    level: 'Beginner',
    duration: '6 weeks',
    instructor: 'Sudharsan',
    description: 'Learn components, props, state, hooks, and simple project structure with React.',
  },
  {
    id: 'course-2',
    title: 'JavaScript Essentials',
    category: 'Programming',
    level: 'Beginner',
    duration: '4 weeks',
    instructor: 'Sudharsan',
    description: 'Practice variables, functions, arrays, objects, DOM concepts, and modern syntax.',
  },
  {
    id: 'course-3',
    title: 'Full Stack API Basics',
    category: 'Backend',
    level: 'Intermediate',
    duration: '5 weeks',
    instructor: 'Sudharsan',
    description: 'Understand REST APIs, request handling, validation, and frontend integration.',
  },
]

export const defaultEnrollments = [
  {
    id: 'enroll-1',
    studentId: 'student-1',
    courseId: 'course-1',
    progress: 45,
  },
]
