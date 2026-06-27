import { memo } from 'react';

const Notification = ({ message, type, onClose }) => {
  if (!message) return null;

  return (
    <div
      className={`notification notification-${type}`}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
    >
      <span>{message}</span>
      <button
        type="button"
        className="notification-close"
        onClick={onClose}
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  );
};

export default memo(Notification);
