const createTokenUser = (user) => {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    userPicture: user.userPicture,
    userId: user._id,
    role: user.role,
    followers: user.followers,
    following: user.following,
    bookmarks: user.bookmarks,
    blockedUsers: user.blockedUsers,
    country: user.country,
    email: user.email,
    username: user.username,
    createdAt: user.createdAt,
    bio: user.bio,
    occupation: user.occupation,
  };
};

module.exports = createTokenUser;
