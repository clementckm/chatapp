import io from "socket.io-client"

const port = 'https://obscure-hollows-61259.herokuapp.com/' || 'localhost:5000';
// const port = process.env.PORT || 'localhost:5000';

export var socket = io(port);
