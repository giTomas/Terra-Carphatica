'use strict';

var nav_close = document.getElementById('js-nav-open');
var nav_open = document.getElementById('js-nav-close');
var menu_btn = document.querySelectorAll('.js-menu-btn');
var menu = document.getElementById('js-menu-overlay');

console.log('\n  nav__close: ' + (nav_close !== null) + '\n  nav__open: ' + (nav_open !== null) + '\n  menu: ' + (menu !== null) + '\n  menu_btn: ' + (menu_btn !== null) + '\n  test: ' + (test !== null) + '\n  ');

var menuHandler = function menuHandler() {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = menu_btn[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var i = _step.value;
      i.classList.toggle('is-hidden');
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (menu.style.display !== 'block') {
    console.log('whooooooooo.....');
    menu.style.display = 'block';
  } else {
    menu.style.display = '';
  }
};

var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
  for (var _iterator2 = menu_btn[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
    var i = _step2.value;
    i.addEventListener('click', menuHandler, false);
  }

  // nav_open.addEventListener('click', ()=> console.log('open'), false);
  // nav_close.addEventListener('click', ()=> console.log('close'), false);


  //animation
} catch (err) {
  _didIteratorError2 = true;
  _iteratorError2 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion2 && _iterator2.return) {
      _iterator2.return();
    }
  } finally {
    if (_didIteratorError2) {
      throw _iteratorError2;
    }
  }
}