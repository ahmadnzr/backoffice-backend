const jwt = require("jsonwebtoken");

const verifyToken = (authorization) => {
  const token = authorization?.split(" ")[1] || "";
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

const checkAdminAuth = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    verifyToken(authorization);

    next();
  } catch (error) {
    return res.status(401).json(error);
  }
};

module.exports = { checkAdminAuth, verifyToken };
