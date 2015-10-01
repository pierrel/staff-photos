function argTransform(args) {
  var htmlProps = [];
  Object.keys(args).forEach(function(key) {
    htmlProps.push('' + property +  '=' + '"' + args[property] + '"');
  });
  
  return htmlProps.join(' ');
}



exports.element = function(name, args, otherElements) {
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
