const Dropbox = require('dropbox');
const express = require('express');
const app = express();

// setup dropbox
const dropbox_key = process.env.DROPBOX_KEY;
const dropbox_secret = process.env.DROPBOX_SECRET;
const dropbox_token = process.env.DROPBOX_APP_KEY;
const dropbox_client = new Dropbox.Client({ 
  key: dropbox_key,
  secret: dropbox_secret,
  token: dropbox_token
});

app.get('/', function(req, res) {
  dropbox_client.readdir('/Photos/Sample Album', function(error, entries) {
    if (error) {
      res.send('there was an error');
      console.log(error);
    } else {
      res.send(entries);
    }
  });
});

const server = app.listen(3000, function() {
  const addy = server.address();
  const host = addy.address;
  const port = addy.port;

  console.log('Example app listening at http://%s:%s', host, port);
});
