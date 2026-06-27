import {
    createTask as createTaskService,
    deleteTaskById,
    getAllTasks,
    getTaskById as getTaskByIdService,
    updateTaskById,
} from '../services/taskService.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import validateObjectId from '../utils/validateObjectId.js';
import { validateTaskPayload } from '../validators/taskValidator.js';

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await getAllTasks();

    res.status(200).json(
      new ApiResponse({
        message: 'Tasks retrieved successfully',
        data: tasks,
      })
    );
  } catch (error) {
    next(new ApiError(500, 'Failed to get tasks', error));
  }
};

export const getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!validateObjectId(id)) {
      return next(new ApiError(400, 'Invalid task id'));
    }

    const task = await getTaskByIdService(id);

    if (!task) {
      return next(new ApiError(404, 'Task not found'));
    }

    res.status(200).json(
      new ApiResponse({
        message: 'Task retrieved successfully',
        data: task,
      })
    );
  } catch (error) {
    next(new ApiError(500, 'Failed to get task by id', error));
  }
};

export const createTask = async (req, res, next) => {
  try {
    const { errors, sanitizedPayload } = validateTaskPayload(req.body);

    if (errors.length) {
      return next(new ApiError(400, 'Validation failed', errors));
    }

    const task = await createTaskService(sanitizedPayload);

    res.status(201).json(
      new ApiResponse({
        message: 'Task created successfully',
        data: task,
      })
    );
  } catch (error) {
    next(new ApiError(500, 'Failed to create task', error));
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!validateObjectId(id)) {
      return next(new ApiError(400, 'Invalid task id'));
    }

    const { errors, sanitizedPayload } = validateTaskPayload(req.body, { isUpdate: true });

    if (errors.length) {
      return next(new ApiError(400, 'Validation failed', errors));
    }

    const updatedTask = await updateTaskById(id, sanitizedPayload);

    if (!updatedTask) {
      return next(new ApiError(404, 'Task not found'));
    }

    res.status(200).json(
      new ApiResponse({
        message: 'Task updated successfully',
        data: updatedTask,
      })
    );
  } catch (error) {
    next(new ApiError(500, 'Failed to update task', error));
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!validateObjectId(id)) {
      return next(new ApiError(400, 'Invalid task id'));
    }

    const deletedTask = await deleteTaskById(id);

    if (!deletedTask) {
      return next(new ApiError(404, 'Task not found'));
    }

    res.status(200).json(
      new ApiResponse({
        message: 'Task deleted successfully',
        data: null,
      })
    );
  } catch (error) {
    next(new ApiError(500, 'Failed to delete task', error));
  }
};
