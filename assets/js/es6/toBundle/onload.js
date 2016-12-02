import {TweenLite} from 'gsap';

export function onload() {
  const interval = setInterval(() => {
    if(document.readyState === 'complete') {
        clearInterval(interval);
        // console.log(document.readyState);
        const loading = document.getElementById('js-page-load')

        if (loading !== null) {
          TweenLite.to('#js-page-load', 1, {opacity: 0, display: 'none', ease: Power4.easeOut});
        }
    }
}, 100);

}
