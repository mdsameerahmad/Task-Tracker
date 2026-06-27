import { useEffect, useMemo, useRef, useState } from 'react';
import Button from '../components/Button.jsx';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal.jsx';
import EmptyState from '../components/EmptyState.jsx';
import Loader from '../components/Loader.jsx';
import Notification from '../components/Notification.jsx';
import TaskFilters from '../components/TaskFilters.jsx';
import TaskForm from '../components/TaskForm.jsx';
import TaskList from '../components/TaskList.jsx';
import TaskStats from '../components/TaskStats.jsx';
import { TASK_PRIORITIES, TASK_STATUSES } from '../constants/taskConstants.js';
import useDebounce from '../hooks/useDebounce.js';
import taskApi from '../services/taskApi.js';
import { formatDateForInput } from '../utils/dateUtils.js';

const initialFormState = {
  title: '',
  description: '',
  status: 'Todo',
  priority: 'Medium',
  dueDate: '',
};

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'priorityHigh', label: 'Priority High → Low' },
  { value: 'priorityLow', label: 'Priority Low → High' },
  { value: 'dueDate', label: 'Due Date' },
];

const priorityOrder = {
  High: 3,
  Medium: 2,
  Low: 1,
};

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: 'success' });
  const [formState, setFormState] = useState(initialFormState);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingTask, setDeletingTask] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [formErrors, setFormErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const titleRef = useRef(null);
  const statusRef = useRef(null);
  const priorityRef = useRef(null);
  const dueDateRef = useRef(null);
  const fieldRefs = {
    title: titleRef,
    status: statusRef,
    priority: priorityRef,
    dueDate: dueDateRef,
  };

  const debouncedSearch = useDebounce(searchText, 300);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);

    try {
      const tasks = await taskApi.getTasks();
      setTasks(tasks || []);
    } catch (fetchError) {
      const message = fetchError.message || 'Unable to load tasks.';
      setError(message);
      setNotification({ message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
  };

  const validateField = (name, value) => {
    const normalizedValue = typeof value === 'string' ? value.trim() : value;

    switch (name) {
      case 'title': {
        if (!normalizedValue) return 'Title is required.';
        if (normalizedValue.length < 3) return 'Title must contain at least 3 characters.';
        if (normalizedValue.length > 100) return 'Title cannot exceed 100 characters.';
        return null;
      }
      case 'description': {
        if (normalizedValue && normalizedValue.length > 500) return 'Description cannot exceed 500 characters.';
        return null;
      }
      case 'status': {
        if (!TASK_STATUSES.includes(value)) return 'Please select a valid status.';
        return null;
      }
      case 'priority': {
        if (!TASK_PRIORITIES.includes(value)) return 'Please select a valid priority.';
        return null;
      }
      case 'dueDate': {
        if (value && Number.isNaN(new Date(value).getTime())) return 'Please enter a valid due date.';
        return null;
      }
      default:
        return null;
    }
  };

  const setFieldError = (name, error) => {
    setFormErrors((prev) => {
      const nextErrors = { ...prev };
      if (error) {
        nextErrors[name] = error;
      } else {
        delete nextErrors[name];
      }
      return nextErrors;
    });
  };

  const validateForm = (state) => {
    const errors = {};
    ['title', 'description', 'status', 'priority', 'dueDate'].forEach((fieldName) => {
      const error = validateField(fieldName, state[fieldName]);
      if (error) {
        errors[fieldName] = error;
      }
    });
    return errors;
  };

  const focusFirstInvalidField = (errorsToFocus) => {
    const firstInvalidField = ['title', 'status', 'priority', 'dueDate'].find(
      (fieldName) => errorsToFocus[fieldName],
    );

    if (firstInvalidField && fieldRefs[firstInvalidField]?.current) {
      fieldRefs[firstInvalidField].current.focus();
    }
  };

  useEffect(() => {
    if (!notification.message) return undefined;
    const timer = setTimeout(() => {
      setNotification({ message: '', type: 'success' });
    }, 3000);
    return () => clearTimeout(timer);
  }, [notification]);

  const filteredTasks = useMemo(() => {
    const normalizedSearch = debouncedSearch.trim().toLowerCase();

    return [...tasks]
      .filter((task) => {
        const matchesSearch =
          !normalizedSearch || task.title.toLowerCase().includes(normalizedSearch);
        const matchesStatus = filterStatus === 'All' || task.status === filterStatus;
        const matchesPriority = filterPriority === 'All' || task.priority === filterPriority;
        return matchesSearch && matchesStatus && matchesPriority;
      })
      .sort((a, b) => {
        const createdA = new Date(a.createdAt).getTime();
        const createdB = new Date(b.createdAt).getTime();

        switch (sortBy) {
          case 'oldest':
            return createdA - createdB;
          case 'priorityHigh':
            return priorityOrder[b.priority] - priorityOrder[a.priority];
          case 'priorityLow':
            return priorityOrder[a.priority] - priorityOrder[b.priority];
          case 'dueDate': {
            const dueA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
            const dueB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
            return dueA - dueB || createdB - createdA;
          }
          case 'newest':
          default:
            return createdB - createdA;
        }
      });
  }, [tasks, debouncedSearch, filterStatus, filterPriority, sortBy]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.status === 'Completed').length;
    const inProgress = tasks.filter((task) => task.status === 'In Progress').length;
    const overdue = tasks.filter((task) => {
      if (!task.dueDate) return false;
      const due = new Date(task.dueDate);
      return due < new Date() && task.status !== 'Completed';
    }).length;

    return [
      { label: 'Total Tasks', value: total },
      { label: 'In Progress', value: inProgress },
      { label: 'Completed', value: completed },
      { label: 'Overdue', value: overdue },
    ];
  }, [tasks]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    const validationErrors = validateForm(formState);
    setFormErrors(validationErrors);
    setTouchedFields({
      title: true,
      description: true,
      status: true,
      priority: true,
      dueDate: true,
    });

    if (Object.keys(validationErrors).length > 0) {
      focusFirstInvalidField(validationErrors);
      return;
    }

    const payload = {
      title: formState.title.trim(),
      description: formState.description.trim(),
      status: TASK_STATUSES.includes(formState.status) ? formState.status : 'Todo',
      priority: TASK_PRIORITIES.includes(formState.priority) ? formState.priority : 'Medium',
      dueDate: formState.dueDate || undefined,
    };

    try {
      setIsSubmitting(true);
      await (selectedTask
        ? taskApi.updateTask(selectedTask._id, payload)
        : taskApi.createTask(payload));

      setSelectedTask(null);
      setFormState(initialFormState);
      setFormErrors({});
      setTouchedFields({});
      setIsModalOpen(false);
      showNotification(
        selectedTask ? 'Task updated successfully.' : 'Task created successfully.',
      );
      await fetchTasks();
    } catch (submitError) {
      const message = submitError.message || 'Unable to save task.';
      setError(message);
      showNotification(message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFieldBlur = (event) => {
    const { name, value } = event.target;
    setTouchedFields((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setFieldError(name, error);
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));

    if (touchedFields[name]) {
      const error = validateField(name, value);
      setFieldError(name, error);
    }
  };

  const handleDelete = async (taskId) => {
    setError(null);

    try {
      await taskApi.deleteTask(taskId);
      setDeletingTask(null);
      setTasks((current) => current.filter((task) => task._id !== taskId));
      showNotification('Task deleted successfully.');
    } catch (deleteError) {
      const message = deleteError.message || 'Unable to delete task.';
      setError(message);
      showNotification(message, 'error');
    }
  };

  const openCreateForm = () => {
    setSelectedTask(null);
    setFormState(initialFormState);
    setFormErrors({});
    setTouchedFields({});
    setIsModalOpen(true);
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setFormState({
      title: task.title || '',
      description: task.description || '',
      status: task.status || 'Todo',
      priority: task.priority || 'Medium',
      dueDate: task.dueDate ? formatDateForInput(task.dueDate) : '',
    });
    setFormErrors({});
    setTouchedFields({});
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="dashboard-shell">
      <div className="dashboard-header">
        <div>
          <h1>Task Dashboard</h1>
          <p>Manage and prioritize tasks with search, filters, and quick actions.</p>
        </div>
        <Button onClick={openCreateForm} className="button-primary">
          New Task
        </Button>
      </div>

      {(notification.message || error) && (
        <Notification
          message={notification.message || error}
          type={notification.message ? notification.type : 'error'}
          onClose={() => {
            setNotification({ message: '', type: 'success' });
            setError(null);
          }}
        />
      )}

      <div className="dashboard-grid">
        <aside className="dashboard-sidebar">
          <TaskStats stats={stats} />
          <TaskFilters
            search={searchText}
            onSearchChange={(event) => setSearchText(event.target.value)}
            status={filterStatus}
            onStatusChange={(event) => setFilterStatus(event.target.value)}
            priority={filterPriority}
            onPriorityChange={(event) => setFilterPriority(event.target.value)}
            sort={sortBy}
            onSortChange={(event) => setSortBy(event.target.value)}
            sortOptions={sortOptions}
            onAddTask={openCreateForm}
          />
        </aside>

        <section className="dashboard-main">
          {loading && <Loader />}

          {!loading && !tasks.length && (
            <EmptyState message="No tasks found. Create your first task." />
          )}

          {!loading && tasks.length > 0 && (
            <>
              <div className="task-summary">
                <p>
                  Showing {filteredTasks.length} of {tasks.length} tasks
                </p>
              </div>
              <TaskList
                tasks={filteredTasks}
                onEdit={handleEdit}
                onDelete={(task) => setDeletingTask(task)}
              />
            </>
          )}
        </section>
      </div>

      {isModalOpen && (
        <TaskForm
          formState={formState}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          onFieldChange={handleFieldChange}
          onFieldBlur={handleFieldBlur}
          formErrors={formErrors}
          touchedFields={touchedFields}
          isSubmitting={isSubmitting}
          isEditing={Boolean(selectedTask)}
          fieldRefs={fieldRefs}
        />
      )}

      {deletingTask && (
        <DeleteConfirmationModal
          task={deletingTask}
          onConfirm={() => handleDelete(deletingTask._id)}
          onCancel={() => setDeletingTask(null)}
        />
      )}
    </div>
  );
};

export default TaskDashboard;
