import ApiError from '../utils/ApiError.js';

const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const isOperationalError = err instanceof ApiError;

  const response = {
    success: false,
    message: err.message || 'Internal server error',
  };

  if (isOperationalError && err.errors) {
    response.errors = err.errors;
  }

  if (!isOperationalError) {
    response.message = 'Unexpected server error';
  }

  if (process.env.NODE_ENV !== 'production') {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

export default errorMiddleware;
