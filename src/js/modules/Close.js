import { checkDOMChanges } from '../helpers/checkDOMChanges';
class Close {
  constructor() {
    checkDOMChanges(this.attachEvents.bind(this));
  }

  attachEvents() {
    this.alert = document.querySelectorAll('.alert');
    this.modal = document.querySelectorAll('.modal');
    this.lightbox = document.querySelectorAll('.lightbox');

    this.alert.forEach(this.close);
    this.modal.forEach(this.close);
    this.lightbox.forEach(this.close);
  }

  close(element) {
    element.addEventListener('click', function(e) {
      const target = e.target;
      const containsClose = target.classList.contains('close');

      if (containsClose && element.dataset.remove === 'true') {
        element.style.transition = 'opacity 400ms ease-out';
        element.style.opacity = 0;

        return setTimeout(
          () => element.parentElement.removeChild(element),
          500
        );
      }

      if (containsClose) {
        element.classList.remove('active');
        const body = document.body;
        body.style.overflow === 'hidden' ? (body.style.overflow = '') : false;
        return;
      }
    });
  }
}

export default Close;
