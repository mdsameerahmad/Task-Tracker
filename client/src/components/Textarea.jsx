const Textarea = ({
  label,
  value,
  onChange,
  onBlur,
  name,
  placeholder,
  error,
  invalid,
}) => (
  <label className="form-field">
    <span>{label}</span>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      className={`textarea${invalid ? ' input-invalid' : ''}`}
      aria-invalid={invalid ? 'true' : 'false'}
      aria-describedby={error ? `${name}-error` : undefined}
    />
    {error && (
      <p id={`${name}-error`} className="field-error">
        {error}
      </p>
    )}
  </label>
);

export default Textarea;
