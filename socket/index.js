const io = require("socket.io")(8800, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let onlineUsers = [];

io.on("connection", (socket) => {
  socket.on("new-user-add", (newUsername) => {
    // Check if the user is already online to avoid duplicates
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
    } else {
      console.log(`User ${receiverUsername} is not online.`);
    }
  });
});
