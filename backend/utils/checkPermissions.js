const CustomError = require("../errors");
const checkPermissions = (reqUser, resUserId) => {
  //   console.log(reqUser);
  //   console.log(resUserId);
  //   console.log(typeof resUserId);
  if (reqUser.role === "admin") return;
  if (reqUser.userId === resUserId.toString()) return;
  throw new CustomError.UnauthorizedError(
    "You DO NOT have permission to access this"
  );
};

module.exports = checkPermissions;
