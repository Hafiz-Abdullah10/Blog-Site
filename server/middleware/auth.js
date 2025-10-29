import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.json({ success: false, message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // get the token after 'Bearer '

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.json({ success: false, message: "Invalid Token" });
  }
};

export default auth;
