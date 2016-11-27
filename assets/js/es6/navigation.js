"use strict";

//source for parts of js solution: https://medium.com/@mariusc23/hide-header-on-scroll-down-show-on-scroll-up-67bbaae9a78c#.uwfs3la8l
//http://jsfiddle.net/mariusc23/s6mLJ/31/

const Navigation = {
  config: {
    tl: new TimelineLite(),
    didScroll: false,
    delta: 5,
    lastScrollTop: 0,
    lastScrollUp: false,
    lastScrollDown: false
  },
  dom: {
      nav: document.getElementById('js-nav'),
      // navHeight: parseFloat(getComputedStyle(document.getElementById('js-nav'), null).height.split('px')[0]),
      // boxShadow: parseFloat(getComputedStyle(document.getElementById('js-nav'), null).boxShadow[27]),
      navOpen: document.getElementById('js-nav-open'),
      navClose: document.getElementById('js-nav-close'),
      menu: document.getElementById('js-menu')
    },
  getHeight: function(){
    const height = parseFloat(getComputedStyle(this.dom.nav).height.split('px')[0]);
    const boxShadow = parseFloat(getComputedStyle(this.dom.nav).boxShadow[27]);
    return height + boxShadow;
  },
  callbackSetInterval: function(){
    if (this.config.didScroll) {
      this.config.didScroll = false;
      this.hasScrolled();
    }
  },
  addSetInterval: function(){
    setInterval(this.callbackSetInterval.bind(this), 250)
  },
  //animations
  animScrollUp: function(){
    TweenLite.to(this.dom.nav, 0.6, { ease: Power3.easeOut, boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.6)", y: 0, opacity: 1, force3D: true})
  },
  animScrollDown: function(height){
    TweenLite.to(this.dom.nav, 0.6, { ease: Power3.easeIn, boxShadow: "0px 0px 8px rgba(0, 0, 0, 0)", y: -height, opacity: 0.1, force3D: true});
  },
  animFadeIcon: function(el1, el2){
    this.config.tl.to(el1, 0.22, {ease: Power3.easeIn, opacity: 0, scale: 0, display: "none"})
                  .to(el2, 0.22, {ease: Power3.easeOut, opacity: 1, scale: 1, display: "block"});
  },
  animMenu: function(prop, value){
    TweenLite.set(this.dom.menu, {prop: value, delay: 0.35});
  },
  animCloseMenu: function(){
    TweenLite.set(this.dom.menu, {clearProps: "all", delay: 0.35});
  },
  hasScrolled: function(){
    //fn config
    const wScroll          = window.scrollY;
    const scrollNotEnough  = Math.abs(this.config.lastScrollTop - wScroll) <= this.config.delta;
    const height           = this.getHeight();
    const scrollUp         = wScroll < this.config.lastScrollTop;
    const scrollDown       = wScroll > this.config.lastScrollTop;  // && wScroll > this.dom.navHeight;  //???!!!
    const directionChanged = this.config.lastScrollUp !== scrollUp || this.config.lastScrollDown !== scrollDown;

    if (scrollNotEnough) {
      return;
    }
    //detecting scroll-down
    if(directionChanged && scrollDown){
      this.animScrollDown(height);
    }
    //detecting scroll-up
    if(directionChanged && scrollUp){
      this.animScrollUp();
    }

    this.config.lastScrollTop = wScroll;
    this.config.lastScrollUp  = scrollUp;
    this.config.lastScrollDown  = scrollDown;
  },
  scrollHandler: function() {
    this.config.didScroll = true;
  },
  openHandler: function() {
    console.log('open');
    this.animFadeIcon(this.dom.navOpen, this.dom.navClose);
    this.animMenu(display, 'flex');
  },
  closeHandler: function() {
    console.log('close');
    this.animFadeIcon(this.dom.navClose, this.dom.navOpen);
    this.animMenu(clearProps, 'all');
  },
  attachListener: function(el, handler, ev='click') {
        el.addEventListener(ev, handler, false);
      },
  init: function(){
    if (this.dom.nav === null) {
      return;
    }
    this.attachListener(window, this.scrollHandler.bind(this), 'scroll');
    // this.attachListener(this.dom.nav, ()=>console.log("something happens"));
    this.attachListener(this.dom.navOpen, this.openHandler.bind(this));
    this.attachListener(this.dom.navClose, this.closeHandler.bind(this));
    this.addSetInterval();
    // console.log(this.getHeight());
  }
};

Navigation.init();
