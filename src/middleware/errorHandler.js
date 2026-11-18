export function notFound(req, res) {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
}

export function errorHandler(error, req, res, next) {
  console.error(error);

  if (error.code === 11000) {
    return res.status(409).json({
      success: false,
      message: 'A user with this email already exists'
    });
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }

  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Internal server error'
  });
}
