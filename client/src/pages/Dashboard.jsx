
function Dashboard({ user }) {
  const services = [
    {
      icon: '💻',
      title: 'Log Assistance',
      description: 'Get help with technical and portal-related issues.'
    },
    {
      icon: '📢',
      title: 'Grievance',
      description: 'Submit complaints and track their resolution.'
    },
    {
      icon: '⭐',
      title: 'Feedback',
      description: 'Share your valuable feedback with the university.'
    },
    {
      icon: '📝',
      title: 'Request',
      description: 'Apply for university services and documents.'
    }
  ]

  const handleLogout = () => {
    localStorage.removeItem('rmsToken')
    localStorage.removeItem('rmsUser')
    window.location.reload()
  }

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div>
          <h2>UNIVERSITY RMS</h2>
          <p>Student Portal</p>
        </div>

        <button onClick={handleLogout} style={styles.logout}>
          Logout
        </button>
      </header>

      <main style={styles.main}>
        <h1>Welcome, {user?.name || 'Student'}! 👋</h1>
        <p style={styles.subtitle}>
          Manage your university services from one place.
        </p>

        <div style={styles.profile}>
          <h3>Student Profile</h3>
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Role:</strong> Student</p>
        </div>

        <h2 style={styles.sectionTitle}>Our Services</h2>

        <div style={styles.grid}>
          {services.map((service) => (
            <div key={service.title} style={styles.card}>
              <div style={styles.icon}>{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <button style={styles.viewButton}>
                Open Service →
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f1f5fb',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    background: '#1646a0',
    color: 'white',
    padding: '20px 5%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logout: {
    background: 'white',
    color: '#1646a0',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '7px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  main: {
    padding: '40px 5%'
  },
  subtitle: {
    color: '#64748b',
    marginTop: '10px'
  },
  profile: {
    background: 'white',
    padding: '22px',
    borderRadius: '12px',
    marginTop: '30px',
    lineHeight: '2',
    boxShadow: '0 3px 12px rgba(0,0,0,0.05)'
  },
  sectionTitle: {
    marginTop: '35px',
    marginBottom: '20px',
    color: '#17366e'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px'
  },
  card: {
    background: 'white',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 3px 12px rgba(0,0,0,0.05)'
  },
  icon: {
    fontSize: '35px',
    marginBottom: '15px'
  },
  viewButton: {
    marginTop: '18px',
    background: '#1646a0',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '6px',
    cursor: 'pointer'
  }
}

export default Dashboard
