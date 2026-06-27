import mongoose from 'mongoose';
import { TASK_PRIORITIES, TASK_STATUSES } from '../constants/taskConstants.js';

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const sanitizeTaskPayload = (payload) => {
  const allowedFields = ['title', 'description', 'status', 'priority', 'dueDate'];
  return allowedFields.reduce((sanitized, key) => {
    if (payload[key] !== undefined) {
      sanitized[key] = payload[key];
    }
    return sanitized;
  }, {});
};

const validateTaskPayload = (payload, { isUpdate = false } = {}) => {
  const errors = [];
  const { title, description, status, priority, dueDate } = payload;

  if (!isUpdate || title !== undefined) {
    if (typeof title !== 'string' || !title.trim()) {
      errors.push({ field: 'title', message: 'Title is required.' });
    } else if (title.trim().length < 3) {
      errors.push({ field: 'title', message: 'Title must be at least 3 characters.' });
    } else if (title.trim().length > 100) {
      errors.push({ field: 'title', message: 'Title must be no more than 100 characters.' });
    }
  }

  if (description !== undefined) {
    if (typeof description !== 'string') {
      errors.push({ field: 'description', message: 'Description must be a string.' });
    } else if (description.trim().length > 500) {
      errors.push({ field: 'description', message: 'Description must be no more than 500 characters.' });
    }
  }

  if (status !== undefined) {
    if (typeof status !== 'string' || !TASK_STATUSES.includes(status)) {
      errors.push({ field: 'status', message: `Status must be one of: ${TASK_STATUSES.join(', ')}.` });
    }
  }

  if (priority !== undefined) {
    if (typeof priority !== 'string' || !TASK_PRIORITIES.includes(priority)) {
      errors.push({ field: 'priority', message: `Priority must be one of: ${TASK_PRIORITIES.join(', ')}.` });
    }
  }

  if (dueDate !== undefined && dueDate !== '') {
    const parsedDate = new Date(dueDate);
    if (Number.isNaN(parsedDate.valueOf())) {
      errors.push({ field: 'dueDate', message: 'Due date must be a valid date string.' });
    }
  }

  return {
    errors,
    sanitizedPayload: sanitizeTaskPayload(payload),
  };
};

export { isValidObjectId, validateTaskPayload };
