function AuthLayout({ title, text, children }) {
  return (
    <section className="auth-section">
      <div className="container">
        <div className="auth-card">
          <span className="eyebrow">Account Access</span>
          <h1>{title}</h1>
          <p>{text}</p>
          {children}
        </div>
      </div>
    </section>
  )
}

export default AuthLayout
