'use strict';

var Resize = function (window) {
  "use strict";

  var imgs = document.querySelectorAll('.js-img-resize');
  var all = document.querySelectorAll('img');
  var tl = new TimelineLite();
  var modal = document.getElementById('js-modal');
  var modalImg = document.getElementById('js-modal-img');
  var params = {};

  var imgResizeHandler = function imgResizeHandler(e) {
    var src = e.currentTarget;
    var url = src.dataset.url;

    var img = src.parentNode.firstChild;
    var modalImg = document.getElementById('js-modal-img');

    var coords = img.getBoundingClientRect();
    var left = coords.width / 2 + coords.left;
    var right = coords.height / 2 + coords.top;
    var imgHeight = img.naturalHeight;
    var wHeight = window.innerHeight; //??
    var imgWidth = img.naturalWidth;
    var wWidth = window.innerWidth; //??
    var isWider = imgWidth > wWidth;
    var isHeigher = imgHeight > wHeight;
    var side = coords.width < coords.height;
    var scale1 = function scale1() {
      return Math.round(coords.width / img.naturalWidth * 100000) / 100000;
    };
    var scale2 = function scale2() {
      return Math.round(coords.height / wHeight * 100000) / 100000;
    };
    var scale3 = function scale3() {
      return Math.round(coords.width / wWidth * 100000) / 100000;
    };

    //const scaleFinal = isHeigher && side ? scale2() : isWider ? scale3() : scale1(); //???
    var scaleFinal = isHeigher ? scale2() : isWider ? scale3() : scale1(); //???


    //console.log('isWider: ' + isWider + ', ' + 'scale: ' + scale3);
    // console.log('isHeigher: ' + (isHeigher && side) + ', ' +'scale: ' + scale2);

    params = {
      initialScale: scaleFinal,
      left: left,
      top: right
    };
    // console.log(params);
    modalImg.setAttribute('src', url);

    // console.log(params);

    tl.to(modal, 0, { display: "block", backgroundColor: "rgba(0, 0, 0, 0)" }).from(modalImg, 0.33, { scale: params.initialScale, top: params.top, left: params.left, force3D: false, ease: Power1.easeOut }, '+=0.05').to(modal, 1, { backgroundColor: "rgba(0, 0, 0, 0.9)", force3D: true, ease: Power1.easeOut }, '-=0.77');
  };

  var closeHandler = function closeHandler() {
    tl.to(modal, 1, { backgroundColor: "rgba(0, 0, 0, 0)", force3D: true, ease: Power1.easeOut }).to(modalImg, 0.33, { scale: params.initialScale, top: params.top, left: params.left, force3D: false, ease: Power1.easeOut }, '-=1').to(modalImg, 0, { clearProps: 'all' }).to(modal, 0, { clearProps: 'all' });

    setTimeout(function () {
      modalImg.removeAttribute('src');
    }, 1000);
  };

  var imgsListeners = function imgsListeners() {
    for (var i = 0; i < imgs.length; i++) {
      imgs[i].addEventListener('click', imgResizeHandler, false);
    }
    modal.addEventListener('click', closeHandler, false);
  };

  // const modalListener = modal.addEventListener('click', closeHandler, false);

  return {
    attach: imgsListeners
  };
}(window);

Resize.attach();