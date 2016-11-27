'use strict';

var test = document.getElementById('js-test');

//functions
var getTarget = function getTarget(e) {
  return e.currentTarget;
};
var getNewSrc = function getNewSrc(el) {
  return {
    src: el.firstChild.getAttribute('src').replace('small', 'full'),
    // violation of purity?? true
    type: el.dataset.prot
  };
};
var log = function log(x) {
  console.log(x);return x;
};

var handler = function handler(e) {

  var newImg = pipe(getTarget, getNewSrc, log);
  // pipe(newImg, log);
  newImg(e);
  // console.log(newImg(e));
};

test.addEventListener('click', handler, false);