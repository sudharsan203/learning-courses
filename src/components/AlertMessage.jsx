function AlertMessage({ alert }) {
  if (!alert) {
    return null
  }

  return (
    <div className="container alert-container">
      <div className={`alert alert-${alert.type} mb-0`} role="alert">
        {alert.message}
      </div>
    </div>
  )
}

export default AlertMessage
