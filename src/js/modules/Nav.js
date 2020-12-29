class Nav {
  constructor() {
    this.navbar = document.querySelector('.nav');
    this.burger = document.querySelector('.nav__burger');

    if (this.burger)
      this.burger.addEventListener('click', this.open.bind(this));
  }

  open() {
    this.navbar.classList.toggle('active');
  }
}

export default Nav;
