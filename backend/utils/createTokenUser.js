const createTokenUser = (user) => {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    picutrePath: user.picutrePath,
    userId: user._id,
    role: user.role,
    friends: user.friends,
    email: user.email,
  };
};

module.exports = createTokenUser;
