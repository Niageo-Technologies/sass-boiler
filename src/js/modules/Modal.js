class Modal {
  constructor() {
    this.checkDOMChanges(() => {
      const toggles = document.querySelectorAll('[data-toggle="modal"]');
      const modals = document.querySelectorAll('.modal');

      modals.forEach(modal => modal.addEventListener('click', this.close));
      toggles.forEach(toggle => toggle.addEventListener('click', this.toggle));
    });
  }

  toggle() {
    const target = this.dataset.target.trim() || false;

    if (!target) {
      throw new Error(
        'No target specified. Please add data-target attribute with the class, ID or html element you want to show.'
      );
    }

    const targetEl = document.querySelector(target);
    targetEl.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close(e) {
    e.stopPropagation();
    const target = e.target;
    const body = document.body;

    if (target.className === 'close') {
      this.classList.remove('active');
      body.style.overflow = '';

      // Remove style attribute if it's empty
      !body.getAttribute('style') ? body.removeAttribute('style') : false;
    }
  }

  checkDOMChanges(callback) {
    const observer = new MutationObserver(callback);
    const observerOptions = {
      childList: true,
      attributes: true,
      subtree: true
    };

    observer.observe(document.body, observerOptions);
  }
}

export default Modal;
