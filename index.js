const Dropbox = require('dropbox');
const express = require('express');
const html = require('./html');

const app = express();

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
    return [dropbox_client.thumbnailUrl(entry, {size: 'xl'}),
            dropbox_client.thumbnailUrl(entry, {size: 'large'})];
  }).map(function(urls) {
    const full = urls[0];
    const thumbnail = urls[1];

    return html.element('a', 
                        {href: full}, 
                        [html.element('img', {src: thumbnail})]);
  }).join("\n");
  
  res.send(layout(thumbs));
}

function layout(innerHTML) {
  return html.element('html', 
                      {}, 
                      [html.element('head',
                                    {},
                                    [
                                      html.element('link', 
                                                   {rel: 'stylesheet',
                                                    href: '/public/photoswipe/dist/photoswipe.css'}),
                                      html.element('link',
                                                   {rel: 'stylesheet',
                                                    href: '/public/photoswipe/dist/default-skin/default-skin.css'}),
                                      html.element('script',
                                                   {src: '/public/photoswipe/dist/photoswipe.min.js'}),
                                      html.element('script',
                                                   {src: '/public/photoswipe/dist/photoswipe-ui-default.min.js'})
                                    ]),
                      html.element('body',
                                   {},
                                   [innerHTML])
                      ]);
                      
  return innerHTML;
}

app.get('/', function(req, res) {
  dropbox_client.readdir(PHOTO_DIR, function(error, entries) {
    if (error) {
      res.send('there was an error');
      console.log(error);
    } else {
      const fullEntries = entries.map(function(entry) { return PHOTO_DIR + '/' + entry; });
      showThumbs(res, fullEntries);
    }
  });
});

app.use('/public', express.static('bower_components'));

const server = app.listen(3000, function() {
  const addy = server.address();
  const host = addy.address;
  const port = addy.port;

  console.log('Example app listening at http://%s:%s', host, port);
});
