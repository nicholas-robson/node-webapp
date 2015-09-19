process.on('uncaughtException', function(err) {
  console.trace(err);
});

global.__base = __dirname + '/';

var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session")
var requestHandler = require(__base + "lib/request");
var app = express();

app.use(express.static("www"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: "banana",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.get(["/", "/:component", "/:component/:action"], requestHandler.getRequestHandler);
app.post(["/", "/:component", "/:component/:action"], requestHandler.getRequestHandler);

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Listening at http://%s:%s", host, port);
});
