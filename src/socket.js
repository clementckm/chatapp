import io from "socket.io-client"
// const port = process.env.PORT || 'localhost:5000';
// this.socket = io(port);
// const port = 'https://obscure-hollows-61259.herokuapp.com/';
const port = process.env.PORT || 'localhost:5000';
export var socket = io(port);
