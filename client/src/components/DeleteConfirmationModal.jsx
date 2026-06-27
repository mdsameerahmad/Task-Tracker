import Button from './Button.jsx';

const DeleteConfirmationModal = ({ task, onConfirm, onCancel }) => (
  <div className="modal-overlay">
    <div className="modal-card">
      <header className="modal-header">
        <h2>Delete Task</h2>
      </header>
      <div className="modal-body">
        <p>Are you sure you want to delete the task "{task.title}"?</p>
      </div>
      <div className="form-actions">
        <Button type="button" onClick={onConfirm}>
          Delete
        </Button>
        <Button type="button" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  </div>
);

export default DeleteConfirmationModal;
