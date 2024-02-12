const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    console.log("Token is required");
    return res.status(401).json({ error: "Token is required" });
  }
  console.log("token:", token);
  jwt.verify(token, "a", (err, decoded) => {
    if (err) {
      console.log("test:", err);
      return res.status(401).json({ error: "Invalid token" });
    }

    req.user = decoded;
    console.log("test:", decoded);

    next();
  });
}

module.exports = verifyToken;
