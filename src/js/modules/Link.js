class Link {
  constructor() {
    this.links = [...document.querySelectorAll('[data-link-to]')];
    this.hashLinks = [...document.querySelectorAll('[href="#"]')];
    this.urlPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    this.urlPathPattern = /(\/[^#].+|[-_a-zA-Z0-9]+\.html?)/g;
    this.urlHexPattern = /\/#/g;
  }

  preventDefault(link) {
    return (link.onclick = e => e.preventDefault());
  }

  switchPath(link) {
    return (link.onclick = (e) => {
      e.stopPropagation();

      const path = link.dataset.linkTo;

      if (path.match(this.urlPattern)) {
        return location.href = path;
      }

      if (path.match(this.urlPathPattern)) {
        return location.assign(this.getLocation + path);
      }

    });
  }

  get getLocation() {
    return location.origin;
  }

  init() {
    this.hashLinks.length > 0 ?
      this.hashLinks.map(this.preventDefault.bind(this)) :
      false;
    this.links.length > 0 ? this.links.map(this.switchPath.bind(this)) : false;
  }
}

export default Link;
