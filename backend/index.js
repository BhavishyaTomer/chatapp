const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const { emit } = require('process');
dotenv.config()
const app = express();
const user = [];
const server = http.createServer(app);        
const io = socketio(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }                 //1)ususally const server = createServer(app);
});                  //2)ususally const io = socketio(server);
                     //3)io.on("connection",(socket)=>{
app.get("/", (req, res) => {
    res.send("Hello from server");
    console.log("Hello from server");
})
io.on("connection", (socket) => {
    console.log("New connection");
    console.log(socket.id);

    socket.on("join", (s) => {
        console.log("user joined :", s)
        user[socket.id] = s
        console.log("triggered");
        socket.broadcast.emit("userjoined", { user: "chotuadmin", message: `${user[socket.id]} has joined the chat` })
        console.log("not triggered");
    })

    socket.on("message", (message,id) => {
        console.log("message is ", message)
       io.emit("message", { user: user[socket.id], message: ` ${message}`,id:id })
    })

    socket.on("disconnect",()=>{
        socket.broadcast.emit("leave",{user:"Admin",message:`${user[socket.id]} has left the chat`})
        console.log("user left");
    })

    socket.emit("welcome", { user: "Admin", message: "Welcome to the chat" })
})
server.listen(process.env.PORT, () => {
    console.log("Server is running on port ", process.env.PORT);
});