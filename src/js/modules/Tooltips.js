import { checkDOMChanges } from '../helpers/checkDOMChanges';

export default class Tooltips {
  constructor() {
    this.className = 'tooltip';

    checkDOMChanges(this.attachEvents.bind(this));
  }

  attachEvents() {
    this.tooltips = document.querySelectorAll('[data-tooltip], [tooltip]');

    this.tooltips.forEach(tooltip => {
      tooltip.addEventListener('mouseenter', this.show.bind(this));
      tooltip.addEventListener('mouseleave', this.hide.bind(this));
      document.body.addEventListener('click', this.remove.bind(this));
    });
  }

  hide(e) {
    e.stopPropagation();

    this.remove();
  }

  show(e) {
    e.stopPropagation();

    const target = e.target;
    const childTooltips = document.body.querySelectorAll(`.tooltip`);

    if (childTooltips.length == 0) {
      const boundingRect = target.getBoundingClientRect();
      const tooltip = this.create(e.target.dataset.tooltip, {
        top: boundingRect.top + boundingRect.height + 6,
        left: boundingRect.left
      });

      document.body.append(tooltip);

      setTimeout(() => {
        tooltip.style.opacity = 1;
        tooltip.style.transform = `translateY(0)`
      }, 60);
    }
  }

  create(text, position) {
    const div = document.createElement('div');

    div.className = 'tooltip';
    div.innerText = text || '';

    div.style.transform = `translateY(16px)`;
    div.style.top = position.top + 'px';
    div.style.left = position.left + 'px';

    return div;
  }

  remove() {
    const tooltips = document.body.querySelectorAll(`.${this.className}`);

    tooltips.forEach(tooltip => {
      tooltip.remove();
    });
  }
}
