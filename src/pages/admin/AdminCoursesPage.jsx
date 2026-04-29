import { useState } from 'react'
import PageSection from '../../components/PageSection'
import TextInput from '../../components/TextInput'

const emptyCourseForm = {
  title: '',
  category: '',
  level: 'Beginner',
  duration: '',
  instructor: '',
  description: '',
}

function AdminCoursesPage({ courses, addCourse, updateCourse, deleteCourse, enrollments }) {
  const [form, setForm] = useState(emptyCourseForm)
  const [editingId, setEditingId] = useState(null)
  const [errors, setErrors] = useState({})
  const [searchText, setSearchText] = useState('')

  const filteredCourses = courses.filter((course) => course.title.toLowerCase().includes(searchText.toLowerCase()))

  const validateForm = () => {
    const nextErrors = {}

    if (!form.title.trim()) nextErrors.title = 'Title is required.'
    if (!form.category.trim()) nextErrors.category = 'Category is required.'
    if (!form.duration.trim()) nextErrors.duration = 'Duration is required.'
    if (!form.instructor.trim()) nextErrors.instructor = 'Instructor is required.'
    if (!form.description.trim()) nextErrors.description = 'Description is required.'

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    if (editingId) {
      updateCourse(editingId, form)
    } else {
      addCourse(form)
    }

    setForm(emptyCourseForm)
    setEditingId(null)
    setErrors({})
  }

  const handleEdit = (course) => {
    setForm({
      title: course.title,
      category: course.category,
      level: course.level,
      duration: course.duration,
      instructor: course.instructor,
      description: course.description,
    })
    setEditingId(course.id)
  }

  const handleCancel = () => {
    setForm(emptyCourseForm)
    setEditingId(null)
    setErrors({})
  }

  const getEnrollmentCount = (courseId) => {
    return enrollments.filter((enrollment) => enrollment.courseId === courseId).length
  }

  return (
    <PageSection eyebrow="Admin Courses" title="Create, edit, and delete LearningHub courses.">
      <div className="row g-4">
        <div className="col-lg-5">
          <div className="panel">
            <h2>{editingId ? 'Edit Course' : 'Create Course'}</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
              <TextInput
                label="Title"
                value={form.title}
                onChange={(value) => setForm({ ...form, title: value })}
                placeholder="React Foundations"
              />
              {errors.title && <small className="text-danger">{errors.title}</small>}

              <TextInput
                label="Category"
                value={form.category}
                onChange={(value) => setForm({ ...form, category: value })}
                placeholder="Frontend"
              />
              {errors.category && <small className="text-danger">{errors.category}</small>}

              <label className="form-label w-100">
                Level
                <select
                  className="form-select mt-2"
                  onChange={(event) => setForm({ ...form, level: event.target.value })}
                  value={form.level}
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </label>

              <TextInput
                label="Duration"
                value={form.duration}
                onChange={(value) => setForm({ ...form, duration: value })}
                placeholder="6 weeks"
              />
              {errors.duration && <small className="text-danger">{errors.duration}</small>}

              <TextInput
                label="Instructor"
                value={form.instructor}
                onChange={(value) => setForm({ ...form, instructor: value })}
                placeholder="Instructor name"
              />
              {errors.instructor && <small className="text-danger">{errors.instructor}</small>}

              <label className="form-label w-100">
                Description
                <textarea
                  className="form-control mt-2"
                  onChange={(event) => setForm({ ...form, description: event.target.value })}
                  placeholder="Short course description"
                  rows="4"
                  value={form.description}
                ></textarea>
              </label>
              {errors.description && <small className="text-danger">{errors.description}</small>}

              <button className="btn btn-primary" type="submit">
                {editingId ? 'Update Course' : 'Create Course'}
              </button>
              {editingId && (
                <button className="btn btn-outline-dark" type="button" onClick={handleCancel}>
                  Cancel Edit
                </button>
              )}
            </form>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="panel">
            <div className="d-flex flex-wrap justify-content-between gap-3 mb-3">
              <h2 className="mb-0">Courses</h2>
              <input
                className="form-control admin-search"
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="Search courses"
                value={searchText}
              />
            </div>

            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Level</th>
                    <th>Enrollments</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map((course) => (
                    <tr key={course.id}>
                      <td>
                        <strong>{course.title}</strong>
                        <span className="d-block text-muted">{course.category}</span>
                      </td>
                      <td>{course.level}</td>
                      <td>{getEnrollmentCount(course.id)}</td>
                      <td>
                        <div className="table-actions">
                          <button className="btn btn-sm btn-outline-primary" type="button" onClick={() => handleEdit(course)}>
                            Edit
                          </button>
                          <button className="btn btn-sm btn-outline-danger" type="button" onClick={() => deleteCourse(course.id)}>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredCourses.length === 0 && <p>No matching courses.</p>}
          </div>
        </div>
      </div>
    </PageSection>
  )
}

export default AdminCoursesPage
