const User = require("../models/User");
const jwt = require("jsonwebtoken");

const authenticateUser = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token is not valid" });
      }

      const userId = decoded.userId;

      User.findById(userId)
        .select("-password")
        .then((userData) => {
          if (!userData) {
            return res.status(404).json({ message: "User not found" });
          }

          req.user = userData;
          next();
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          return res.status(500).json({ message: "Internal server error" });
        });
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = authenticateUser;
