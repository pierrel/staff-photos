const html = require('./html');

function photoswipeAsset(path) {
  const fullPath = '/public/bower_components/photoswipe/dist/' + path; 
  if (path.match('js')) {
    return html.include_js(fullPath);
  } else if (path.match('css')) {
    return html.include_css(fullPath);
  }
}

function body(innerHTML) {
  return '<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true"><div class="pswp__bg"></div><div class="pswp__scroll-wrap"><div class="pswp__container"><div class="pswp__item"></div><div class="pswp__item"></div><div class="pswp__item"></div></div><div class="pswp__ui pswp__ui--hidden"><div class="pswp__top-bar"><div class="pswp__counter"></div><button class="pswp__button pswp__button--close" title="Close (Esc)"></button><button class="pswp__button pswp__button--share" title="Share"></button><button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button><button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button><div class="pswp__preloader"><div class="pswp__preloader__icn"><div class="pswp__preloader__cut"><div class="pswp__preloader__donut"></div></div></div></div></div><div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"><div class="pswp__share-tooltip"></div> </div><button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button><button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button><div class="pswp__caption"><div class="pswp__caption__center"></div></div></div></div></div>' + innerHTML;
}

function layout(innerHTML) {
  const js = html.include_js('/public/js/main.js');
  return html.element('html', 
                      {}, 
                      [html.element('head',
                                    {},
                                    [photoswipeAsset('photoswipe.css'),
                                     photoswipeAsset('default-skin/default-skin.css'),
                                     photoswipeAsset('photoswipe.min.js'),
                                     photoswipeAsset('photoswipe-ui-default.min.js')
                                    ]),
                       body(innerHTML),
                       js
                      ]);
                      
  return innerHTML;
}

exports.layout = layout;
