'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function changeView(el, tmp, anim, src) {
  'use strict';

  if (typeof tmp === 'undefined') {
    console.log(tmp);
    return;
  }
  var modal = document.getElementById(el);

  modal.innerHTML = tmp;
  // console.log(tmp);
  anim(modal, src);
}

var createMarkup = pipe(findValue, Tmps.markupProfiles);

function profileHandler(e) {
  //promise???
  'use strict';

  var src = e.currentTarget;

  var _src$dataset$prot$spl = src.dataset.prot.split('.'),
      _src$dataset$prot$spl2 = _slicedToArray(_src$dataset$prot$spl, 2),
      type = _src$dataset$prot$spl2[0],
      id = _src$dataset$prot$spl2[1];

  changeView('js-modal', createMarkup({ arr: data[type], data: id }), show_modal, src);
}

var modal = document.querySelectorAll('.js-modal');

forEachEl(modal, profileHandler);