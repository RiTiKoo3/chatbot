require('dotenv').config();
const app = require('./src/app');
const { createServer } = require("http");
const { Server } = require("socket.io");
const { generateText } = require('./src/service/ai.service');

const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
    console.log("user connected", socket.id);

    socket.on("message", async (data) => {
        console.log( data);
        const msg = data

        const response = await generateText(msg);
        io.emit("message", response );
    })

    socket.on("disconnect", (data) => {
        console.log("user disconnected", data);
    });
});



httpServer.listen(3000, () => {
  console.log('Server is running on port 3000');
}  )