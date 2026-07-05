require('dotenv').config();
const app = require('./src/app');
const { createServer } = require("http");
const { Server } = require("socket.io");
const { generateText } = require('./src/service/ai.service');

const httpServer = createServer(app);
const io = new Server(httpServer);

const chatHistory = [];


io.on("connection", (socket) => {
    console.log("user connected", socket.id);

    socket.on("message", async (data) => {
        chatHistory.push({ role: "user", content: data });
        
        const response = await generateText(chatHistory.map(msg => `${msg.role}: ${msg.content}`).join("\n"));
        io.emit("message-response", response );
        chatHistory.push({ role: "model", content: response });


    })

    socket.on("disconnect", (data) => {
        console.log("user disconnected", data);
    });
});



httpServer.listen(3000, () => {
  console.log('Server is running on port 3000');
}  )