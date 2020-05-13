class Form {
  constructor() {
    this.selectForms = document.querySelectorAll('select[multiple]');
  }

  options() {
    this.selectForms.forEach(select => {
      const selectContainer = select.parentElement;
      const container = document.createElement('div');
      const dropdown = document.createElement('div');

      select.style.display = 'none';
      container.classList.add('select__container');
      dropdown.classList.add('select__dropdown');

      this.extractOptions(select, container, dropdown);
      selectContainer.appendChild(container);
      selectContainer.appendChild(dropdown);
    });
  }

  extractOptions(select, container, dropdown) {
    select.querySelectorAll('option').forEach((option, index) => {
      const optionDiv = document.createElement('div');
      optionDiv.dataset.value = option.value;
      optionDiv.textContent = option.textContent;

      if (index === 0) {
        return container.appendChild(optionDiv);
      }
      dropdown.appendChild(optionDiv);
    });
  }
}

export default Form;
