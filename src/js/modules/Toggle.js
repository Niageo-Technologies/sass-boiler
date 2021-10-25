import { checkDOMChanges } from '../helpers/checkDOMChanges';

class Toggle {
  constructor() {
    checkDOMChanges(() => {
      this.initItems();
    });
  }

  items() {
    const type = this.dataset.toggle.trim();
    const target = this.dataset.target.trim();
    const targetElement = document.querySelector(target);

    try {
      targetElement.classList.toggle('active');
    } catch (error) {
      console.error(error);
    }

    if (type === 'modal' || 'lightbox') {
      document.body.style.overflow = 'hidden';
    }
  }

  initItems() {
    this.toggles = document.querySelectorAll('[data-toggle]');
    this.toggles.forEach(toggle =>
      toggle.addEventListener('click', this.items)
    );
  }
}

export default Toggle;
