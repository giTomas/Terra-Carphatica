const nav_close = document.getElementById('js-nav-open');
const nav_open = document.getElementById('js-nav-close');
const menu_btn = document.querySelectorAll('.js-menu-btn');
const menu = document.getElementById('js-menu-overlay');

console.log(`
  nav__close: ${nav_close !== null}
  nav__open: ${nav_open !== null}
  menu: ${menu !== null}
  menu_btn: ${menu_btn !== null}
  test: ${test !== null}
  `);


const menuHandler = function(){
  for (let i of menu_btn) { i.classList.toggle('is-hidden'); }
  if (menu.style.display !== 'block'){
    console.log('whooooooooo.....');
    menu.style.display = 'block';
  } else {
    menu.style.display = '';
  }
};

for (let i of menu_btn) {i.addEventListener('click', menuHandler, false);}

// nav_open.addEventListener('click', ()=> console.log('open'), false);
// nav_close.addEventListener('click', ()=> console.log('close'), false);



//animation
