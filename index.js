const Dropbox = require('dropbox');
const express = require('express');
const html = require('./html');

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

const PHOTO_DIR = '/Photos/Sample Album'; 

function showThumbs(res, entries) {
  const thumbs = entries.map(function(entry) {
    const url = dropbox_client.thumbnailUrl(entry);
    return url 
  }).map(function(thumbnail) {
    return html.element('img', {src: thumbnail}, '');
  }).join("\n");
  
  res.send(thumbs);
}

app.get('/', function(req, res) {
  dropbox_client.readdir(PHOTO_DIR, function(error, entries) {
    if (error) {
      res.send('there was an error');
      console.log(error);
    } else {
      showThumbs(res, entries);
    }
  });
});

const server = app.listen(3000, function() {
  const addy = server.address();
  const host = addy.address;
  const port = addy.port;

  console.log('Example app listening at http://%s:%s', host, port);
});
