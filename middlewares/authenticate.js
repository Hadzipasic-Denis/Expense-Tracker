const ErrorResponse = require("../utils/ErrorResponse");
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const { access_token: token } = req.cookies;
  try {
    if (!token) {
      throw new ErrorResponse("Forbidden", 403);
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = payload;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
