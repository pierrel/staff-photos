var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('Hello World!');
});

var server = app.listen(3000, function() {
  var addy = server.address();
  var host = addy.address;
  var port = addy.port;

  console.log('Example app listening at http://%s:%s', host, port);
});
