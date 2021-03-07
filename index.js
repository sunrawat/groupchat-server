const httpServer= require("http").createServer();

const io = require("socket.io")(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
  
const users = {};

io.on("connection", socket => {
    socket.on("new-user-joined", name => {
      //  console.log(name);
        users[socket.id] = name;
        socket.broadcast.emit("user-joined", name);
    });
    socket.on("send", message => {
      //  console.log(message);
          socket.broadcast.emit('message-recieved', {message: message, name: users[socket.id]});
    });
});

httpServer.listen(3000);
