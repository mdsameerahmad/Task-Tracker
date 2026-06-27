import TaskCard from './TaskCard.jsx';

const TaskList = ({ tasks, onEdit, onDelete }) => (
  <section className="task-list">
    {tasks.map((task) => (
      <TaskCard key={task._id} task={task} onEdit={onEdit} onDelete={onDelete} />
    ))}
  </section>
);

export default TaskList;
