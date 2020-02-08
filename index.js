require('dotenv').config();
const express = require('express');
const http = require('http');
const socket = require('socket.io');
const actions = require('./socket.actions');

const app = express();
const server = http.Server(app);
const socketHandler = socket(server);

const position = {
    x: 200,
    y: 200
}

socketHandler.on('connection', currentSocket => {
    currentSocket.emit(actions.position, position);
    currentSocket.on(actions.move, data =>{
        switch(data) {
            case "left": {
                position.x = position.x - 5;
                socketHandler.emit(actions.position, position);
                break;
            }
            case "right": {
                position.x = position.x + 5;
                socketHandler.emit(actions.position, position);
                break;
            }
            case "up": {
                position.y = position.y - 5;
                socketHandler.emit(actions.position, position);
                break;
            }
            case "down": {
                position.y = position.y + 5;
                socketHandler.emit(actions.position, position);
                break;    
            }
        };
    });
});


server.listen(process.env.PORT, ()=>{
    console.log(`listening to port: ${process.env.PORT} `)
})