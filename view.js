const html = require('./html');

function photoswipe(path) {
  return html.include_css('/public/bower_components/photoswipe/dist/' + path );
}

function layout(innerHTML) {
  return html.element('html', 
                      {}, 
                      [html.element('head',
                                    {},
                                    [photoswipe('photoswipe.css'),
                                     photoswipe('default-skin/default-skin.css'),
                                     photoswipe('photoswipe.min.js'),
                                     photoswipe('photoswipe-ui-default.min.js'),
                                     html.include_js('/public/js/main.js')
                                    ]),
                      html.element('body',
                                   {},
                                   [innerHTML])
                      ]);
                      
  return innerHTML;
}

exports.layout = layout;
