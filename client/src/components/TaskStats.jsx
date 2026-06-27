const TaskStats = ({ stats }) => (
  <div className="task-stats">
    {stats.map((item) => (
      <div className="task-stat-card" key={item.label}>
        <span className="task-stat-label">{item.label}</span>
        <strong>{item.value}</strong>
      </div>
    ))}
  </div>
);

export default TaskStats;
