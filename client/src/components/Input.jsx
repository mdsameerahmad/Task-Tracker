const Input = ({
  label,
  value,
  onChange,
  onBlur,
  name,
  type = 'text',
  placeholder,
  error,
  invalid,
  inputRef,
}) => (
  <label className="form-field">
    <span>{label}</span>
    <input
      ref={inputRef}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      className={`input${invalid ? ' input-invalid' : ''}`}
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

export default Input;
