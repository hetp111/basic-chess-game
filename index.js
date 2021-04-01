const app = require('./app/aap');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const socketSever = require('./app/controllers/socketServer');
socketSever(io);

//set port and listen request
const PORT = process.env.PORT || 8080;

http.listen(PORT, () => {
    console.log('current server runing on PORT : '+PORT);
});