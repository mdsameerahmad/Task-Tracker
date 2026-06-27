import { TASK_PRIORITIES, TASK_STATUSES } from '../constants/taskConstants.js';
import Button from './Button.jsx';
import Input from './Input.jsx';
import Select from './Select.jsx';
import Textarea from './Textarea.jsx';

const TaskForm = ({
  formState,
  onSubmit,
  onClose,
  onFieldChange,
  onFieldBlur,
  formErrors,
  touchedFields,
  isSubmitting,
  isEditing,
  fieldRefs,
}) => {
  const titleId = isEditing ? 'edit-task-title' : 'new-task-title';

  const getFieldError = (fieldName) => {
    return touchedFields[fieldName] ? formErrors[fieldName] : null;
  };

  return (
    <section className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <div className="modal-card">
        <header className="modal-header">
          <h2 id={titleId}>{isEditing ? 'Edit Task' : 'New Task'}</h2>
        </header>
        <form onSubmit={onSubmit} className="task-form" noValidate>
          <Input
            label="Title"
            name="title"
            value={formState.title}
            onChange={onFieldChange}
            onBlur={onFieldBlur}
            placeholder="Enter task title"
            autoComplete="off"
            autoFocus
            error={getFieldError('title')}
            invalid={Boolean(getFieldError('title'))}
            inputRef={fieldRefs.title}
          />
          <Textarea
            label="Description"
            name="description"
            value={formState.description}
            onChange={onFieldChange}
            onBlur={onFieldBlur}
            placeholder="Optional details"
            error={getFieldError('description')}
            invalid={Boolean(getFieldError('description'))}
          />
          <Select
            label="Status"
            name="status"
            value={formState.status}
            onChange={onFieldChange}
            onBlur={onFieldBlur}
            options={TASK_STATUSES}
            error={getFieldError('status')}
            invalid={Boolean(getFieldError('status'))}
            selectRef={fieldRefs.status}
          />
          <Select
            label="Priority"
            name="priority"
            value={formState.priority}
            onChange={onFieldChange}
            onBlur={onFieldBlur}
            options={TASK_PRIORITIES}
            error={getFieldError('priority')}
            invalid={Boolean(getFieldError('priority'))}
            selectRef={fieldRefs.priority}
          />
          <Input
            label="Due Date"
            name="dueDate"
            type="date"
            value={formState.dueDate}
            onChange={onFieldChange}
            onBlur={onFieldBlur}
            error={getFieldError('dueDate')}
            invalid={Boolean(getFieldError('dueDate'))}
            inputRef={fieldRefs.dueDate}
          />
          <div className="form-actions">
            <Button type="submit" disabled={isSubmitting} className={isSubmitting ? 'button-primary disabled' : 'button-primary'}>
              {isSubmitting ? 'Saving...' : 'Save Task'}
            </Button>
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default TaskForm;
