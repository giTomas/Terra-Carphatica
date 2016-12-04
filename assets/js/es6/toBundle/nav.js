import {TweenLite} from 'gsap';

//config
  let didScroll = true;
  const delta = 5;
  let lastScrollTop = 0;
  let lastScrollUp = false;
  let lastScrollDown = false;

// dom
  const nav = document.getElementById('js-header');
  function getHeight(el) {
    const height = parseFloat( getComputedStyle(el).height.split('px')[0]);
    const boxShadow = parseFloat(getComputedStyle(el).boxShadow[26]);
    return height + boxShadow;
  }

  function show() {
    TweenLite.to(nav, 0.5, { ease: Power1.easeOut, y: 0, opacity: 1, force3D: true})
  }

  function hide(height) {
    // console.log(height)
    TweenLite.to(nav, 0.5, { ease: Power1.easeOut, y: -height, opacity: 0.1, force3D: true});
  }

  function hasScrolled() {
    //fn config
    const wScroll          = window.scrollY;
    const scrollNotEnough  = Math.abs(lastScrollTop - wScroll) <= delta;
    const height           = getHeight(nav);
    const scrollUp         = wScroll < lastScrollTop;
    const scrollDown       = wScroll > lastScrollTop;  // && wScroll > this.dom.navHeight;  //???!!!
    const directionChanged = (lastScrollTop && scrollUp) || (lastScrollDown && scrollDown);
    // console.log(wScroll);
    // console.log(lastScrollTop)
    // console.log('scroll down :' + scrollUp);
    // console.log('scroll down :' + scrollDown);

    if (scrollUp) {
      console.log('scroll up');
    } else if (scrollDown) {
      console.log('scroll down');
    }
    if (scrollNotEnough) {
      return;
    }
    if(directionChanged && scrollDown){
      hide(height);
    }
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
      console.log('nav non existent')
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
