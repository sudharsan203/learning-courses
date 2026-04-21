function TextInput({ label, onChange, type = 'text', value, placeholder }) {
  return (
    <label className="form-label w-100">
      {label}
      <input
        className="form-control mt-2"
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </label>
  )
}

export default TextInput
