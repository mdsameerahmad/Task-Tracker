const Select = ({
  label,
  options,
  value,
  onChange,
  onBlur,
  name,
  error,
  invalid,
  selectRef,
}) => (
  <label className="form-field">
    <span>{label}</span>
    <select
      ref={selectRef}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={`select${invalid ? ' input-invalid' : ''}`}
      aria-invalid={invalid ? 'true' : 'false'}
      aria-describedby={error ? `${name}-error` : undefined}
    >
      {options.map((option) => {
        const optionValue = typeof option === 'string' ? option : option.value;
        const optionLabel = typeof option === 'string' ? option : option.label;

        return (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        );
      })}
    </select>
    {error && (
      <p id={`${name}-error`} className="field-error">
        {error}
      </p>
    )}
  </label>
);

export default Select;
