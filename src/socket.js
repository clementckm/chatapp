import io from "socket.io-client"

const port = process.env.PORT || 'localhost:5000';
export var socket = io(port);
