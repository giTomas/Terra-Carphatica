
const Resize = (function(window){
  "use strict";

  const imgs     = document.querySelectorAll('.js-img-resize');
  const all      = document.querySelectorAll('img');
  const tl       = new TimelineLite();
  const modal    = document.getElementById('js-modal');
  const modalImg = document.getElementById('js-modal-img');
  let params = {};

  const imgResizeHandler = (e) => {
    const src      = e.currentTarget;
    const url      = src.dataset.url;

    const img      = src.parentNode.firstChild;
    const modalImg = document.getElementById('js-modal-img');

    const coords     = img.getBoundingClientRect();
    const left       = coords.width / 2  + coords.left;
    const right      = coords.height / 2 + coords.top;
    const imgHeight  = img.naturalHeight;
    const wHeight    = window.innerHeight; //??
    const imgWidth   = img.naturalWidth;
    const wWidth     = window.innerWidth; //??
    const isWider    = imgWidth > wWidth;
    const isHeigher  = imgHeight > wHeight;
    const side       = coords.width < coords.height;
    const scale1     = () => Math.round((coords.width / img.naturalWidth) * 100000) / 100000;
    const scale2     = () => Math.round((coords.height / wHeight) * 100000) / 100000;
    const scale3     = () => Math.round((coords.width / wWidth) * 100000) / 100000;

    //const scaleFinal = isHeigher && side ? scale2() : isWider ? scale3() : scale1(); //???
    const scaleFinal = isHeigher ? scale2() : isWider ? scale3() : scale1(); //???


    //console.log('isWider: ' + isWider + ', ' + 'scale: ' + scale3);
    // console.log('isHeigher: ' + (isHeigher && side) + ', ' +'scale: ' + scale2);

          params   = {
            initialScale: scaleFinal,
            left: left,
            top: right,
          };
    // console.log(params);
    modalImg.setAttribute('src', url);


    // console.log(params);

    tl.to(modal, 0, {display: "block", backgroundColor: "rgba(0, 0, 0, 0)"})
      .from(modalImg, 0.33, {scale: params.initialScale, top: params.top, left: params.left, force3D:false, ease: Power1.easeOut}, '+=0.05')
      .to(modal, 1, {backgroundColor: "rgba(0, 0, 0, 0.9)", force3D:true, ease: Power1.easeOut}, '-=0.77');
  };

  const closeHandler = () => {
    tl.to(modal, 1, {backgroundColor: "rgba(0, 0, 0, 0)", force3D:true, ease: Power1.easeOut})
      .to(modalImg, 0.33, {scale: params.initialScale, top: params.top, left: params.left, force3D:false, ease: Power1.easeOut}, '-=1')
      .to(modalImg, 0, {clearProps: 'all'})
      .to(modal, 0, {clearProps: 'all'});

    setTimeout(()=> {modalImg.removeAttribute('src');}, 1000);
  };

  const imgsListeners = () => {
    for (let i = 0; i < imgs.length; i++) {
      imgs[i].addEventListener('click', imgResizeHandler, false);
    }
    modal.addEventListener('click', closeHandler, false);
  };

  // const modalListener = modal.addEventListener('click', closeHandler, false);

  return {
    attach : imgsListeners
  };

})(window);

Resize.attach();
