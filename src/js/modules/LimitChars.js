class LimitChars {
  constructor() {
    this.elements = [...document.querySelectorAll('[data-limit-chars]')];
    addEventListener('DOMContentLoaded', this.init.bind(this));
  }

  limit(el) {
    const chars = el.dataset.limitChars;
    let text = el.textContent.trim().split('');
    let ellipsis = '';

    if (text.length > chars) ellipsis = '...';

    text.length = chars;
    text = text.join('');

    text += ellipsis;

    return (el.textContent = text);
  }

  init() {
    this.elements.map(this.limit);
  }
}

export default LimitChars;
