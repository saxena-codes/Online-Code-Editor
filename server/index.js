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

    var jsonToSend = {
      source: encodeURI("print 'Hello World';"),
      lang: "PYTHON",
      async: 0,
      client_secret: "292e6a6657ade5e7feeded46ae0f0ab74092a476",
      time_limit: 5,
      memory_limit: 262144
    };

    console.log(JSON.stringify(jsonToSend));

    var HRoptions = {
      hostname: 'api.hackerearth.com',
      port: 80,
      path: '/v3/code/run/',
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(JSON.stringify(jsonToSend))
      }
    };

    var HRrequest = http.request(HRoptions, function(HRresponse) {
      console.log('Status: ' + HRresponse.statusCode);
      console.log('Headers: ' + JSON.stringify(HRresponse.headers));
      HRresponse.setEncoding('utf8');
      HRresponse.on('data', function (body) {
        console.log('Body: ' + body);
      });
    });
    HRrequest.on('error', function(e) {
      console.log('problem with request: ' + e.message);
    });
    // write data to request body
    HRrequest.write(JSON.stringify(jsonToSend));
    HRrequest.end(function(result) {
      console.log(result);
    });

  });

});
