var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var multer = require('multer');
var querystring = require('querystring');

var app = express();
//Specifying the public folder of the server to make the html accesible using the static middleware
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
//Server listens on the port 8124
var server = http.createServer(app).listen(8080);
console.log("Server Started.");
codeChecker();
gettingSupportedLanguages();

function codeChecker() {

  app.post('/code_checker', multer().single(), function(req, res, next) {

    var returnContent;

    var jsonToSend = querystring.stringify({
      'request_format': 'json',
      'source': req.body.code,
      'lang': req.body.language,
      'wait': false,
      'callback_url': '',
      'api_key': 'hackerrank|254856-868|5ecf5c36132f3c51b1e15f4e6790ae026f279279',
      'testcases': req.body.testCases
    });

    console.log(req.body);

    var HRoptions = {
      hostname: 'api.hackerrank.com',
      port: 80,
      path: '/checker/submission.json',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(jsonToSend)
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
      }).on('end', function () {
        console.log(JSON.parse(returnContent));
        res.json(JSON.parse(returnContent));
      });
    });

    HRrequest.on('error', function(e) {
      returnContent = "Error: " + e.message;
      res.json(returnContent);
    });

    HRrequest.write(jsonToSend);

    HRrequest.end();

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
      res.json(returnContent);
    });

    HRrequest.write(""); // --> important for initiating request, sending empty string.

    HRrequest.end();

  });

}
