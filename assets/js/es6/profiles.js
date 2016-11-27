
  function changeView(el, tmp, anim, src) {
    'use strict';
    if (typeof tmp === 'undefined') {
      console.log(tmp);
      return;
    }
    const modal = document.getElementById(el);

    modal.innerHTML = tmp;
    // console.log(tmp);
    anim(modal, src);
  }

  const createMarkup = pipe(findValue, Tmps.markupProfiles);

  function profileHandler(e) {   //promise???
    'use strict';
    const src = e.currentTarget;
    const [type, id] = src.dataset.prot.split('.');

    changeView('js-modal', createMarkup({arr: data[type], data: id}), show_modal, src);
  }

  const modal = document.querySelectorAll('.js-modal');

  forEachEl(modal, profileHandler);
