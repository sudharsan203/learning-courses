import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/AuthLayout'
import TextInput from '../../components/TextInput'
import { useLearning } from '../../hooks/useLearning'

function LoginPage() {
  const navigate = useNavigate()
  const { currentUser, login } = useLearning()
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})

  if (currentUser?.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />
  }

  if (currentUser?.role === 'student') {
    return <Navigate to="/student/dashboard" replace />
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = {}

    if (!form.email.trim()) {
      nextErrors.email = 'Email is required.'
    }

    if (!form.password.trim()) {
      nextErrors.password = 'Password is required.'
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    const user = login(form.email, form.password)

    if (user?.role === 'admin') {
      navigate('/admin/dashboard')
    }

    if (user?.role === 'student') {
      navigate('/student/dashboard')
    }
  }

  return (
    <AuthLayout title="Login" text="Use the predefined credentials to open the admin or student workspace.">
      <div className="demo-credentials">
        <p>
          <strong>Admin:</strong> admin@learninghub.com / admin123
        </p>
        <p>
          <strong>Student:</strong> student@learninghub.com / student123
        </p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <TextInput
          label="Email"
          type="email"
          value={form.email}
          onChange={(value) => setForm({ ...form, email: value })}
          placeholder="admin@learninghub.com"
        />
        {errors.email && <small className="text-danger">{errors.email}</small>}

        <TextInput
          label="Password"
          type="password"
          value={form.password}
          onChange={(value) => setForm({ ...form, password: value })}
          placeholder="Enter password"
        />
        {errors.password && <small className="text-danger">{errors.password}</small>}

        <button className="btn btn-primary w-100" type="submit">
          Login
        </button>
      </form>
    </AuthLayout>
  )
}

export default LoginPage
