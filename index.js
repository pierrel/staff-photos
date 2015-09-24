const Dropbox = require('dropbox');
const express = require('express');
const app = express();

// setup dropbox
const dropbox_key = process.env.DROPBOX_KEY;
const dropbox_secret = process.env.DROPBOX_SECRET;
const dropbox_token = process.env.DROPBOX_TOKEN;
const dropbox_client = new Dropbox.Client({ 
  key: dropbox_key,
  secret: dropbox_secret,
  token: dropbox_token
});

app.get('/', function(req, res) {
  dropbox_client.readdir("/",
                         {},
                         function(error, files, stat, file_stats) {
                           console.log('query finished');
                           res.send(error);
                         });
                         

});

const server = app.listen(3000, function() {
  const addy = server.address();
  const host = addy.address;
  const port = addy.port;

  console.log('Example app listening at http://%s:%s', host, port);
});
