const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader =
    req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      status: 'fail',
      message: 'Unauthorized',
    });
  }

  const token =
    authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_KEY
    );

    req.auth = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      status: 'fail',
      message: 'Token tidak valid',
    });
  }
};

module.exports = auth;