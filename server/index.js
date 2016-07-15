var express = require('express');
var http = require('http');
var io = require('socket.io');
var bodyParser = require('body-parser');
var multer = require('multer');

var app = express();
//Specifying the public folder of the server to make the html accesible using the static middleware
app.use(express.static('../'));
app.use(bodyParser.json());
//Server listens on the port 8124
var server = http.createServer(app).listen(8080);
/*initializing the websockets communication , server instance has to be sent as the argument */
io = io.listen(server);

io.sockets.on("connection", function(socket){

  console.log("Connection Established.");

  app.post('/code_checker', multer().single(), function(req, res, next) {

    //got the file finally
    console.log(req.body);

  });
});
