
import { useState } from 'react'

function Login({ onRegister, onLoginSuccess }) {
  const [role, setRole] = useState('Student')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setMessage('')

    // Abhi sirf Student login enabled hai
    if (role !== 'Student') {
      setMessage('Admin and Staff login will be enabled later.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(
        'http://localhost:5000/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Login failed')
      }

      localStorage.setItem('rmsToken', data.token)
      localStorage.setItem('rmsUser', JSON.stringify(data.user))

      setMessage('Login successful!')

      if (onLoginSuccess) {
        onLoginSuccess(data.user)
      }

    } catch (error) {
      setMessage(error.message || 'Server connection failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>University RMS</h1>
        <p style={styles.subtitle}>Request Management System</p>

        <h2 style={styles.welcome}>Welcome Back!</h2>
        <p style={styles.description}>Login to access your account</p>

        <form onSubmit={handleLogin}>
          <label style={styles.label}>Select Your Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={styles.input}
          >
            <option value="Student">Student</option>
            <option value="Admin">Admin</option>
            <option value="Staff">Department Staff</option>
          </select>

          <label style={styles.label}>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          {message && (
            <p style={{
              color: message.includes('successful') ? 'green' : 'red',
              marginTop: '12px',
              fontSize: '14px'
            }}>
              {message}
            </p>
          )}

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Please wait...' : `Login as ${role}`}
          </button>
        </form>

        <p style={styles.register}>
          Don't have an account?{' '}
          <span onClick={onRegister} style={styles.link}>
            Register
          </span>
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #10377e, #2874ce)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px'
  },
  card: {
    background: 'white',
    width: '100%',
    maxWidth: '420px',
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0 10px 35px rgba(0,0,0,0.2)'
  },
  heading: {
    color: '#1646a0',
    textAlign: 'center',
    fontSize: '28px'
  },
  subtitle: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: '13px'
  },
  welcome: {
    marginTop: '30px',
    color: '#17366e'
  },
  description: {
    color: '#64748b',
    marginBottom: '25px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    marginTop: '15px',
    fontWeight: 'bold',
    fontSize: '14px'
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #d5dce8',
    borderRadius: '7px',
    fontSize: '14px',
    marginBottom: '8px',
    background: 'white'
  },
  button: {
    width: '100%',
    padding: '14px',
    marginTop: '20px',
    background: '#1646a0',
    color: 'white',
    border: 'none',
    borderRadius: '7px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  register: {
    textAlign: 'center',
    marginTop: '25px',
    color: '#64748b',
    fontSize: '14px'
  },
  link: {
    color: '#1646a0',
    fontWeight: 'bold',
    cursor: 'pointer'
  }
}

export default Login
