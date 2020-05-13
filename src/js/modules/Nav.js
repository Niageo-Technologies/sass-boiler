class Nav {
  constructor(navbar, burger) {
    this.dashboard = document.querySelector('.on-dashboard');
    this.navbar = document.querySelector(`.${navbar}`);
    this.burger = document.querySelector(`.${burger}`);

    this.userimg = document.querySelector('#on-nav__userimg');
    this.navDropdown = document.querySelector('#on-nav__dropdown');

    this.init();
  }

  closeSidebar() {
    setTimeout(() => this.dashboard.classList.toggle('no-nav'), 200);
    this.navbar.classList.toggle('close');
  }

  closeDropdown() {
    this.navDropdown.classList.toggle('active');
  }

  init() {
    if (!this.dashboard) return;
    this.burger.addEventListener('click', this.closeSidebar.bind(this));
    this.userimg.addEventListener('click', this.closeDropdown.bind(this));
  }
}

export default Nav;
