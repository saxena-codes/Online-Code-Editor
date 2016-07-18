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
  codeChecker();
  gettingSupportedLanguages();

});

function codeChecker() {

  app.post('/code_checker', multer().single(), function(req, res, next) {

    //got the file finally
    console.log(req.body);

    var jsonToSend = {
      request_format: "json",
      source: encodeURI(req.body.code),
      lang: 5,
      testcases: encodeURI("['1', '2']"),
      callback_url: "",
      wait: true,
      api_key: "hackerrank|254856-868|5ecf5c36132f3c51b1e15f4e6790ae026f279279"
    };

    var HRoptions = {
      hostname: 'api.hackerrank.com',
      port: 80,
      path: '/checker/submission.json',
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

}

function gettingSupportedLanguages() {

  // Getting supported languages by HackerRank Api
  app.get('/supported_languages', function(req, res, next){

    var returnContent;

    var HRoptions = {
      hostname: 'api.hackerrank.com',
      port: 80,
      path: '/checker/languages.json',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    var HRrequest = http.request(HRoptions, function(HRresponse) {
      HRresponse.setEncoding('utf8');
      HRresponse.on('data', function (data) {
        try {
          returnContent = data;
        } catch (e) {
          returnContent = "Error: " + e;
        }
      });
      HRresponse.on('end', function () {
        res.json(JSON.parse(returnContent));
      });
    });

    HRrequest.on('error', function(e) {
      returnContent = "Error: " + e.message;
    });

    HRrequest.write(""); // --> important for initiating request, sending empty string.

    HRrequest.end();

  });

}
