import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/AuthLayout'
import TextInput from '../../components/TextInput'
import { useLearning } from '../../hooks/useLearning'

function RegisterPage() {
  const navigate = useNavigate()
  const { currentUser, registerStudent } = useLearning()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})

  if (currentUser?.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />
  }

  if (currentUser?.role === 'student') {
    return <Navigate to="/student/dashboard" replace />
  }

  const validateForm = () => {
    const nextErrors = {}

    if (!form.name.trim()) {
      nextErrors.name = 'Name is required.'
    }

    if (!form.email.trim()) {
      nextErrors.email = 'Email is required.'
    }

    if (!form.password.trim()) {
      nextErrors.password = 'Password is required.'
    } else if (form.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.'
    }

    if (form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = 'Passwords do not match.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    const student = registerStudent({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
    })

    if (student) {
      navigate('/student/dashboard')
    }
  }

  return (
    <AuthLayout title="Student Register" text="Create a student account and start enrolling in courses.">
      <form className="auth-form" onSubmit={handleSubmit}>
        <TextInput
          label="Full Name"
          value={form.name}
          onChange={(value) => setForm({ ...form, name: value })}
          placeholder="Your full name"
        />
        {errors.name && <small className="text-danger">{errors.name}</small>}

        <TextInput
          label="Email"
          type="email"
          value={form.email}
          onChange={(value) => setForm({ ...form, email: value })}
          placeholder="you@example.com"
        />
        {errors.email && <small className="text-danger">{errors.email}</small>}

        <TextInput
          label="Password"
          type="password"
          value={form.password}
          onChange={(value) => setForm({ ...form, password: value })}
          placeholder="Minimum 6 characters"
        />
        {errors.password && <small className="text-danger">{errors.password}</small>}

        <TextInput
          label="Confirm Password"
          type="password"
          value={form.confirmPassword}
          onChange={(value) => setForm({ ...form, confirmPassword: value })}
          placeholder="Re-enter password"
        />
        {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}

        <button className="btn btn-primary w-100" type="submit">
          Register as Student
        </button>
      </form>
    </AuthLayout>
  )
}

export default RegisterPage
