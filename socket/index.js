const io = require("socket.io")(8800, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let onlineUsers = [];

const getUsers = (username) => {
  return onlineUsers.find((user) => user.username === username);
};

io.on("connection", (socket) => {
  socket.on("new-user-add", (newUsername) => {
    if (!onlineUsers.some((user) => user.username === newUsername)) {
      onlineUsers.push({ username: newUsername, socketId: socket.id });
      console.log("New User Connected", onlineUsers);
    }

    io.emit("get-users", onlineUsers);
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    console.log("User Disconnected", onlineUsers);

    io.emit("get-users", onlineUsers);
  });

  socket.on("send-message", (data) => {
    const { receiverUsername } = data;
    const user = onlineUsers.find((user) => user.username === receiverUsername);

    console.log("Sending from socket to:", receiverUsername);
    console.log("Data:", data);
    if (user) {
      io.to(user.socketId).emit("receive-message", data);
      console.log(user.socketId);
      console.log("RECEIVED");
    }
  });

  socket.on(
    "sendNotification",
    ({ senderUsername, receiverUsername, actionType, postId }) => {
      const receiver = getUsers(receiverUsername);
      io.to(receiver.socketId).emit("getNotification", {
        senderUsername,
        actionType,
        postId,
      });
    }
  );
});
