import { memo } from 'react';
import { formatDateDisplay } from '../utils/dateUtils.js';
import Button from './Button.jsx';

const TaskCard = ({ task, onEdit, onDelete }) => (
  <article className="task-card" aria-label={`Task card for ${task.title}`}>
    <div className="task-card-header">
      <div>
        <h3>{task.title}</h3>
        <span className={`task-meta task-meta-${task.status.replace(/\s+/g, '').toLowerCase()}`}>
          {task.status}
        </span>
      </div>
      <div className="task-actions">
        <Button type="button" onClick={() => onEdit(task)} className="button-primary button-small">
          Edit
        </Button>
        <Button type="button" onClick={() => onDelete(task)} className="button-danger button-small">
          Delete
        </Button>
      </div>
    </div>
    <p>{task.description || 'No description provided.'}</p>
    <div className="task-card-footer">
      <span className="task-footer-item">
        Priority: <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
      </span>
      <span className="task-footer-item">
        Due: <span className="due-date-badge">{formatDateDisplay(task.dueDate)}</span>
      </span>
    </div>
  </article>
);

export default memo(TaskCard);
