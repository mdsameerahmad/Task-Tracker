import { TASK_PRIORITIES, TASK_STATUSES } from '../constants/taskConstants.js';
import Button from './Button.jsx';
import Input from './Input.jsx';
import Select from './Select.jsx';

const TaskFilters = ({
  search,
  onSearchChange,
  status,
  onStatusChange,
  priority,
  onPriorityChange,
  sort,
  onSortChange,
  sortOptions,
  onAddTask,
}) => (
  <div className="task-filters">
    <Input
      label="Search"
      name="search"
      value={search}
      onChange={onSearchChange}
      placeholder="Search tasks by title"
    />

    <Select
      label="Status"
      name="status"
      value={status}
      onChange={onStatusChange}
      options={['All', ...TASK_STATUSES]}
    />

    <Select
      label="Priority"
      name="priority"
      value={priority}
      onChange={onPriorityChange}
      options={['All', ...TASK_PRIORITIES]}
    />

    <Select
      label="Sort"
      name="sort"
      value={sort}
      onChange={onSortChange}
      options={sortOptions}
    />

    <Button type="button" onClick={onAddTask} className="button-primary button-wide">
      Add Task
    </Button>
  </div>
);

export default TaskFilters;
