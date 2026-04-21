function PageSection({ eyebrow, title, children }) {
  return (
    <section className="page-section">
      <div className="container">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {children}
      </div>
    </section>
  )
}

export default PageSection
