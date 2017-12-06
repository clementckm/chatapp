var express = require('express');
var socket = require('socket.io');

// var app = express();

const PORT = process.env.PORT || 5000;

// server = app.listen(port, function(){
//     console.log('server is running on port 5000')
// });
const server = express()
.use((req, res) => res.sendFile(INDEX) )
.listen(PORT, () => console.log(`Listening on ${ PORT }`));

io = socket(server);

io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('SEND_MESSAGE', function(data){
        io.emit('RECEIVE_MESSAGE', data);
    })
});
