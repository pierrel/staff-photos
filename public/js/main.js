const pswpElement = document.querySelectorAll('.pswp')[0];
const imageData = document.querySelectorAll('.image-data');

var imageElements = [];
var len = imageData.length;

for (var i = 0; i < len; i++) {
  var image = imageData[i];
  imageElements.push({
    src: image.getAttribute('data-full'),
    msrc: image.getAttribute('data-thumb'),
    w: 400,
    h: 400
  });
}

const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, imageElements, {index:0});
gallery.init();


