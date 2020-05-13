import { removeSrc } from '../helpers/removeSrc';
import { checkDOMChanges } from '../helpers/checkDOMChanges';

class LazyLoad {
  constructor() {
    this.observer = new IntersectionObserver(this.loadImg, this.options);
    this.options = {
      rootMargin: '0px',
      threshold: 1
    };

    checkDOMChanges(() => {
      this.imgs = document.querySelectorAll(
        'img:not(.lazyload--off):not(.lazyloaded)'
      );
      this.watch();
    });
  }

  loadImg(entries, observer) {
    entries.forEach(entry => {
      const target = entry.target;
      if (entry.isIntersecting) {
        target.src = target.dataset.src;
        target.dataset.src = '';
        target.classList.add('lazyloading');
        target.classList.add('lazyloaded');
        setInterval(() => {
          target.classList.remove('lazyloading');
        }, 500);
        observer.unobserve(target);
      }
    });
  }

  attachLazyAttr() {
    this.imgs.forEach(img => {
      img.loading = 'lazy';
    });
  }

  watch() {
    // if ('loading' in HTMLImageElement.prototype) {
    //   return this.attachLazyAttr();
    // }

    removeSrc(this.imgs);
    this.imgs.forEach(img => {
      this.observer.observe(img);
    });
  }
}

export default LazyLoad;
