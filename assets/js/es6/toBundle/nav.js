import {TweenLite} from 'gsap';

//config
  let didScroll = true;
  const delta = 5;
  let lastScrollTop = 0;
  let lastScrollUp = false;
  let lastScrollDown = false;

// dom
  const nav = document.getElementById('js-header');
  //responsive
  //el = nav
  function getHeight(el) {
    const height = parseFloat( getComputedStyle(el).height.split('px')[0]);
    // const height = getComputedStyle(el).height.split('px')[0];
    // const height = 10;
    const boxShadow = parseFloat(getComputedStyle(el).boxShadow[26]);
    // const boxShadow = getComputedStyle(el).boxShadow;
    // const boxShadow = 20;
    // console.log(boxShadow);
    // console.log(height);
    return height + boxShadow;

  }

  /*function callbackSetInterval(){
    if (didScroll) {
      didScroll = false;
      hasScrolled();
    }
  }*/

  /*const addSetInterval = setInterval(function(){
    if (didScroll) {
      didScroll = false;
      hasScrolled();
    }
    console.log(getHeight());
  }, 250)*/

  function show() { 
    TweenLite.to(nav, 0.33, { ease: Power1.easeOut, y: 0, opacity: 1, force3D: true})
  }

  function hide(height){
    // console.log(height)
    TweenLite.to(nav, 0.33, { ease: Power1.easeOut, y: -height, opacity: 0.1, force3D: true});
  }

  function hasScrolled() {
    //fn config
    const wScroll          = window.scrollY;
    const scrollNotEnough  = Math.abs(lastScrollTop - wScroll) <= delta;
    const height           = getHeight(nav);
    const scrollUp         = wScroll < lastScrollTop;
    const scrollDown       = wScroll > lastScrollTop;  // && wScroll > this.dom.navHeight;  //???!!!
    const directionChanged = scrollUp || scrollDown;

    if (scrollNotEnough) {
      return;
    }

    /*if (wScroll < 300) {
      return;
    }*/
    //detecting scroll-down

    if(directionChanged && scrollDown){
      hide(height);
    }
    //detecting scroll-up
    if(directionChanged && scrollUp){
      show();
    }

    lastScrollTop = wScroll;
    lastScrollUp  = scrollUp;
    lastScrollDown  = scrollDown;
  }

  function scrollHandler() {
    didScroll = true;
    // console.log(getHeight(nav));
  }

  export const navigation = function (){
    if (nav === null) {
      console,log('nav non existent')
      return;
    }
    // this.attachListener(this.dom.nav, ()=>console.log("something happens"));
    window.addEventListener('scroll', scrollHandler, false);

    setInterval(function(){
      if (didScroll) {
        didScroll = false;
        hasScrolled();
      }

    }, 250)

  }
