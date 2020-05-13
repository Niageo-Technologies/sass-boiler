class HideBottomBar {
  constructor() {
    this.observer = new ResizeObserver(this.toggleVisibility.bind(this));
    this.bottomBar = document.querySelector('.on-sb');
    this.appViewPort = document.querySelector('#vp--height');
    this.appHeight = this.appViewPort.clientHeight;

    if (!this.bottomBar) return false;
    this.watch(this.appViewPort);
  }

  toggleVisibility(entries) {
    for (const entry of entries) {
      const width = entry.contentRect.width;
      const height = entry.contentRect.height;

      if (height < (this.appHeight - 100) && width <= 540) {
        return this.bottomBar.style.display = 'none';
      }

      this.bottomBar.style.display = 'block';
      return
    }
  }

  watch(element) {
    this.observer.observe(element);
  }
}


export default HideBottomBar;
