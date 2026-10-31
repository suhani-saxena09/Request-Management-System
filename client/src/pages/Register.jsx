

import { useState } from 'react'

function Register() {
  const [form, setForm] = useState({
    name: '',
    registrationNo: '',
    email: '',
    mobile: '',
    college: '',
    course: '',
    branch: '',
    semester: '',
    password: '',
    confirmPassword: ''
  })

  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')

    if (form.password !== form.confirmPassword) {
      setMessage('Passwords do not match!')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(
        'http://localhost:5000/api/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: form.name,
            registrationNo: form.registrationNo,
            email: form.email,
            mobile: form.mobile,
            college: form.college,
            course: form.course,
            branch: form.branch,
            semester: form.semester,
            password: form.password
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed')
      }

      setMessage('Registration successful! Your account has been created.')

      setForm({
        name: '',
        registrationNo: '',
        email: '',
        mobile: '',
        college: '',
        course: '',
        branch: '',
        semester: '',
        password: '',
        confirmPassword: ''
      })

    } catch (error) {
      setMessage(error.message || 'Server connection failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register-page">
      <div className="register-card">

        <h1>Student Registration</h1>
        <p className="register-subtitle">
          Create your University RMS account
        </p>

        <form onSubmit={handleSubmit}>

          <h3>Personal Details</h3>

          <input name="name" placeholder="Full Name"
            value={form.name} onChange={handleChange} required />

          <input name="registrationNo" placeholder="Registration Number"
            value={form.registrationNo} onChange={handleChange} required />

          <input name="email" type="email" placeholder="University Email"
            value={form.email} onChange={handleChange} required />

          <input name="mobile" type="tel" placeholder="Mobile Number"
            value={form.mobile} onChange={handleChange} required />

          <h3>Academic Details</h3>

          <input name="college" placeholder="College / University Name"
            value={form.college} onChange={handleChange} required />

          <select name="course" value={form.course}
            onChange={handleChange} required>
            <option value="">Select Course</option>
            <option value="B.Tech">B.Tech</option>
            <option value="M.Tech">M.Tech</option>
            <option value="BBA">BBA</option>
            <option value="MBA">MBA</option>
            <option value="BCA">BCA</option>
            <option value="MCA">MCA</option>
            <option value="Other">Other</option>
          </select>

          <input name="branch" placeholder="Branch / Department"
            value={form.branch} onChange={handleChange} required />

          <select name="semester" value={form.semester}
            onChange={handleChange} required>
            <option value="">Select Semester</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
              <option key={sem} value={sem}>
                Semester {sem}
              </option>
            ))}
          </select>

          <h3>Account Security</h3>

          <input name="password" type="password"
            placeholder="Create Password"
            value={form.password} onChange={handleChange}
            minLength={8} required />

          <input name="confirmPassword" type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword} onChange={handleChange}
            minLength={8} required />

          {message && (
            <p style={{
              color: message.includes('successful') ? 'green' : 'red',
              margin: '12px 0',
              fontWeight: 'bold'
            }}>
              {message}
            </p>
          )}

          <button type="submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

        </form>
      </div>
    </div>
  )
}

export default Register
