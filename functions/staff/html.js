function argTransform(args) {
  var htmlProps = [];
  Object.keys(args).forEach(function(key) {
    htmlProps.push('' + key +  '=' + '"' + args[key] + '"');
  });
  
  return htmlProps.join(' ');
}

function element(name, args, otherElements) {
  var htmlString = '<' + name;

  if (args) {
    htmlString = htmlString + ' ' + argTransform(args);
  }
  
  htmlString = htmlString + '>';
  
  if (otherElements) {
    otherElements.forEach(function(otherElement) {
      htmlString = htmlString + otherElement;
    });
  }
  
  htmlString = htmlString + '</' + name + '>';
  
  return htmlString;
}


function include_css(path) {
  return element('link',
                 {rel: 'stylesheet',
                  href: path});
}

function include_js(path) {
  return element('script',
                 {src: path});
}


exports.element = element;
exports.include_js = include_js;
exports.include_css = include_css;
