
import { useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css'

function App() {
  const [page, setPage] = useState('home')

  if (page === 'login') {
    return (
      <div>
        <button onClick={() => setPage('home')}>
          ← Back to Home
        </button>
        <Login onRegister={() => setPage('register')} />
      </div>
    )
  }

  if (page === 'register') {
    return (
      <div>
        <button onClick={() => setPage('login')}>
          ← Back to Login
        </button>
        <Register />
      </div>
    )
  }

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <span className="logo-icon">R</span>
          <div>
            <h2>UNIVERSITY RMS</h2>
            <p>Request Management System</p>
          </div>
        </div>

        <button className="login-btn" onClick={() => setPage('login')}>
          Login / Register
        </button>
      </header>

      <section className="hero">
        <div className="hero-content">
          <span className="tag">STUDENT SERVICE PORTAL</span>
          <h1>Welcome to <span>RMS Portal</span></h1>
          <p>
            A single platform to submit your requests,
            raise grievances, get assistance and share feedback.
          </p>
          <button className="start-btn" onClick={() => setPage('login')}>
            Get Started →
          </button>
        </div>
      </section>

      <section className="services">
        <h2>Our Services</h2>
        <p className="subtitle">Choose a service to continue</p>

        <div className="service-container">
          {[
            ['💻', 'Log Assistance', 'Get help with technical and portal-related issues.'],
            ['📢', 'Grievance', 'Submit complaints and track their resolution.'],
            ['⭐', 'Feedback', 'Share your valuable feedback with the university.'],
            ['📝', 'Request', 'Apply for university services and documents.']
          ].map(([icon, title, description]) => (
            <div className="service-card" key={title}>
              <div className="service-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{description}</p>
              <button onClick={() => setPage('login')}>Explore →</button>
            </div>
          ))}
        </div>
      </section>

      <footer>
        © 2026 University RMS Portal | All Rights Reserved
      </footer>
    </div>
  )
}

export default App

