  const test = document.getElementById('js-test');

//functions
  const getTarget = (e) => e.currentTarget;
  const getNewSrc = (el) => {
    return {
      src: el.firstChild.getAttribute('src').replace('small', 'full'),
      // violation of purity?? true
      type: el.dataset.prot
  };
};
  const log = (x) => {console.log(x); return x;};

  const handler = function(e){


    const newImg = pipe(getTarget, getNewSrc, log);
    // pipe(newImg, log);
    newImg(e);
    // console.log(newImg(e));
  };

  test.addEventListener('click', handler, false);
