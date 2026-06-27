const Button = ({ children, type = 'button', onClick, disabled = false, className = '' }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`button ${className}`.trim()}
    aria-disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
