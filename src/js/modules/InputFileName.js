class InputFileName {
  constructor() {
    this.forms = document.querySelectorAll('form');
    this.fileFields = document.querySelectorAll('input[type="file"]');

    if (!this.fileFields) return;
    this.fileFields.forEach(this.attachListener);
    this.fileFields.forEach(this.setFileLabel);
    this.forms.forEach(this.resetForm.bind(this));
  }

  attachListener(field) {
    field.addEventListener('change', function() {
      const nextSibling = this.nextElementSibling;
      const filename = this.files[0].name;

      if (
        nextSibling.tagName === 'LABEL' &&
        this.id === nextSibling.getAttribute('for')
      ) {
        nextSibling.classList.add('ellipsis');
        nextSibling.textContent = filename;
      }
    });
  }

  setFileLabel(field) {
    addEventListener('DOMContentLoaded', function() {
      const nextSibling = field.nextElementSibling;
      if (
        nextSibling.tagName === 'LABEL' &&
        field.id === nextSibling.getAttribute('for')
      ) {
        field.dataset.label = nextSibling.innerHTML;
      }
    });
  }

  resetForm(form) {
    form.addEventListener('reset', () => {
      const fileFields = form.querySelectorAll('input[type="file"]');
      fileFields.forEach(this.resetFileLabel);
    });
  }

  resetFileLabel(field) {
    const nextSibling = field.nextElementSibling;
    if (
      nextSibling.tagName === 'LABEL' &&
      field.id === nextSibling.getAttribute('for')
    ) {
      nextSibling.innerHTML = field.dataset.label;
    }
  }
}

export default InputFileName;
