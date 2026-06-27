import Task from '../models/Task.js';

const createTask = async (taskData) => Task.create(taskData);

const getAllTasks = async () => Task.find().sort({ createdAt: -1 }).lean().exec();

const getTaskById = async (id) => Task.findById(id).lean().exec();

const updateTaskById = async (id, updateData) =>
  Task.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
    context: 'query',
  }).lean().exec();

const deleteTaskById = async (id) => Task.findByIdAndDelete(id).lean().exec();

export { createTask, deleteTaskById, getAllTasks, getTaskById, updateTaskById };

