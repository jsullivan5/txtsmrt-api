const checkAuth = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  } else {
    const error = new Error('You must be logged in to view this page.');
    error.status = 401;
    return next(error);
  }
};

module.exports = checkAuth;
