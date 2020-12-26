// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/js/modules/Link.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Link = /*#__PURE__*/function () {
  function Link() {
    _classCallCheck(this, Link);

    this.links = _toConsumableArray(document.querySelectorAll('[data-link-to]'));
    this.hashLinks = _toConsumableArray(document.querySelectorAll('[href="#"]'));
    this.urlPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    this.urlPathPattern = /(\/[^#].+|[-_a-zA-Z0-9]+\.html?)/g;
    this.urlHexPattern = /\/#/g;
  }

  _createClass(Link, [{
    key: "preventDefault",
    value: function preventDefault(link) {
      return link.onclick = function (e) {
        return e.preventDefault();
      };
    }
  }, {
    key: "switchPath",
    value: function switchPath(link) {
      var _this = this;

      return link.onclick = function (e) {
        e.stopPropagation();
        var path = link.dataset.linkTo;

        if (path.match(_this.urlPattern)) {
          return location.href = path;
        }

        if (path.match(_this.urlPathPattern)) {
          return location.assign(_this.getLocation + path);
        }
      };
    }
  }, {
    key: "init",
    value: function init() {
      this.hashLinks.length > 0 ? this.hashLinks.map(this.preventDefault.bind(this)) : false;
      this.links.length > 0 ? this.links.map(this.switchPath.bind(this)) : false;
    }
  }, {
    key: "getLocation",
    get: function get() {
      return location.origin;
    }
  }]);

  return Link;
}();

var _default = Link;
exports.default = _default;
},{}],"src/js/modules/LimitChars.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LimitChars = /*#__PURE__*/function () {
  function LimitChars() {
    _classCallCheck(this, LimitChars);

    this.elements = _toConsumableArray(document.querySelectorAll('[data-limit-chars]'));
    addEventListener('DOMContentLoaded', this.init.bind(this));
  }

  _createClass(LimitChars, [{
    key: "limit",
    value: function limit(el) {
      var chars = el.dataset.limitChars;
      var text = el.textContent.trim().split('');
      var ellipsis = '';
      if (text.length > chars) ellipsis = '...';
      text.length = chars;
      text = text.join('');
      text += ellipsis;
      return el.textContent = text;
    }
  }, {
    key: "init",
    value: function init() {
      this.elements.map(this.limit);
    }
  }]);

  return LimitChars;
}();

var _default = LimitChars;
exports.default = _default;
},{}],"src/js/helpers/removeSrc.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeSrc = removeSrc;

function removeSrc(imgs) {
  imgs.forEach(function (img) {
    if (img.src) {
      img.dataset.src = img.src;
      img.src = '';
    }
  });
}
},{}],"src/js/helpers/checkDOMChanges.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkDOMChanges = checkDOMChanges;

function checkDOMChanges(callback) {
  var observer = new MutationObserver(callback);
  var body = document.body;
  var observerOptions = {
    // attributes: true,
    // characterData: true
    childList: true,
    subtree: true
  };
  observer.observe(body, observerOptions);
}
},{}],"src/js/modules/LazyLoad.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _removeSrc = require("../helpers/removeSrc");

var _checkDOMChanges = require("../helpers/checkDOMChanges");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LazyLoad = /*#__PURE__*/function () {
  function LazyLoad() {
    var _this = this;

    _classCallCheck(this, LazyLoad);

    this.observer = new IntersectionObserver(this.loadImg, this.options);
    this.options = {
      rootMargin: '0px',
      threshold: 1
    };
    (0, _checkDOMChanges.checkDOMChanges)(function () {
      _this.imgs = document.querySelectorAll('img:not(.lazyload--off):not(.lazyloaded)');

      _this.watch();
    });
  }

  _createClass(LazyLoad, [{
    key: "loadImg",
    value: function loadImg(entries, observer) {
      entries.forEach(function (entry) {
        var target = entry.target;

        if (entry.isIntersecting) {
          target.src = target.dataset.src;
          target.dataset.src = '';
          target.classList.add('lazyloading');
          target.classList.add('lazyloaded');
          setInterval(function () {
            target.classList.remove('lazyloading');
          }, 500);
          observer.unobserve(target);
        }
      });
    }
  }, {
    key: "attachLazyAttr",
    value: function attachLazyAttr() {
      this.imgs.forEach(function (img) {
        img.loading = 'lazy';
      });
    }
  }, {
    key: "watch",
    value: function watch() {
      var _this2 = this;

      // if ('loading' in HTMLImageElement.prototype) {
      //   return this.attachLazyAttr();
      // }
      (0, _removeSrc.removeSrc)(this.imgs);
      this.imgs.forEach(function (img) {
        _this2.observer.observe(img);
      });
    }
  }]);

  return LazyLoad;
}();

var _default = LazyLoad;
exports.default = _default;
},{"../helpers/removeSrc":"src/js/helpers/removeSrc.js","../helpers/checkDOMChanges":"src/js/helpers/checkDOMChanges.js"}],"src/js/modules/InputFileName.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var InputFileName = /*#__PURE__*/function () {
  function InputFileName() {
    _classCallCheck(this, InputFileName);

    this.forms = document.querySelectorAll('form');
    this.fileFields = document.querySelectorAll('input[type="file"]');
    if (!this.fileFields) return;
    this.fileFields.forEach(this.attachListener);
    this.fileFields.forEach(this.setFileLabel);
    this.forms.forEach(this.resetForm.bind(this));
  }

  _createClass(InputFileName, [{
    key: "attachListener",
    value: function attachListener(field) {
      field.addEventListener('change', function () {
        var nextSibling = this.nextElementSibling;
        var filename = this.files[0].name;

        if (nextSibling.tagName === 'LABEL' && this.id === nextSibling.getAttribute('for')) {
          nextSibling.classList.add('ellipsis');
          nextSibling.textContent = filename;
        }
      });
    }
  }, {
    key: "setFileLabel",
    value: function setFileLabel(field) {
      addEventListener('DOMContentLoaded', function () {
        var nextSibling = field.nextElementSibling;

        if (nextSibling.tagName === 'LABEL' && field.id === nextSibling.getAttribute('for')) {
          field.dataset.label = nextSibling.innerHTML;
        }
      });
    }
  }, {
    key: "resetForm",
    value: function resetForm(form) {
      var _this = this;

      form.addEventListener('reset', function () {
        var fileFields = form.querySelectorAll('input[type="file"]');
        fileFields.forEach(_this.resetFileLabel);
      });
    }
  }, {
    key: "resetFileLabel",
    value: function resetFileLabel(field) {
      var nextSibling = field.nextElementSibling;

      if (nextSibling.tagName === 'LABEL' && field.id === nextSibling.getAttribute('for')) {
        nextSibling.innerHTML = field.dataset.label;
      }
    }
  }]);

  return InputFileName;
}();

var _default = InputFileName;
exports.default = _default;
},{}],"src/js/modules/Toggle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _checkDOMChanges = require("../helpers/checkDOMChanges");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Toggle = /*#__PURE__*/function () {
  function Toggle() {
    var _this = this;

    _classCallCheck(this, Toggle);

    (0, _checkDOMChanges.checkDOMChanges)(function () {
      _this.initItems();
    });
  }

  _createClass(Toggle, [{
    key: "items",
    value: function items() {
      var type = this.dataset.toggle.trim();
      var target = this.dataset.target.trim();
      var targetElement = document.querySelector(target);

      try {
        targetElement.classList.toggle('active');
      } catch (error) {
        console.error(error);
      }

      if (type === 'modal' || 'lightbox') {
        document.body.style.overflow = 'hidden';
      }
    }
  }, {
    key: "initItems",
    value: function initItems() {
      var _this2 = this;

      this.toggles = document.querySelectorAll('[data-toggle]');
      this.toggles.forEach(function (toggle) {
        return toggle.addEventListener('click', _this2.items);
      });
    }
  }]);

  return Toggle;
}();

var _default = Toggle;
exports.default = _default;
},{"../helpers/checkDOMChanges":"src/js/helpers/checkDOMChanges.js"}],"src/js/modules/Close.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _checkDOMChanges = require("../helpers/checkDOMChanges");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Close = /*#__PURE__*/function () {
  function Close() {
    _classCallCheck(this, Close);

    (0, _checkDOMChanges.checkDOMChanges)(this.attachEvents.bind(this));
  }

  _createClass(Close, [{
    key: "attachEvents",
    value: function attachEvents() {
      this.alert = document.querySelectorAll('.alert');
      this.modal = document.querySelectorAll('.modal');
      this.lightbox = document.querySelectorAll('.lightbox');
      this.alert.forEach(this.close);
      this.modal.forEach(this.close);
      this.lightbox.forEach(this.close);
    }
  }, {
    key: "close",
    value: function close(element) {
      element.addEventListener('click', function (e) {
        var target = e.target;
        var containsClose = target.classList.contains('close');

        if (containsClose && element.dataset.remove === 'true') {
          element.style.transition = 'opacity 400ms ease-out';
          element.style.opacity = 0;
          return setTimeout(function () {
            return element.parentElement.removeChild(element);
          }, 500);
        }

        if (containsClose) {
          element.classList.remove('active');
          var body = document.body;
          body.style.overflow === 'hidden' ? body.style.overflow = '' : false;
          return;
        }
      });
    }
  }]);

  return Close;
}();

var _default = Close;
exports.default = _default;
},{"../helpers/checkDOMChanges":"src/js/helpers/checkDOMChanges.js"}],"src/js/modules/Nav.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Nav = /*#__PURE__*/function () {
  function Nav() {
    _classCallCheck(this, Nav);

    this.navbar = document.querySelector('.nav');
    this.burger = document.querySelector('.nav__burger');
    console.log(this.burger);
    this.burger.addEventListener('click', this.open.bind(this));
  }

  _createClass(Nav, [{
    key: "open",
    value: function open() {
      this.navbar.classList.toggle('active');
    }
  }]);

  return Nav;
}();

var _default = Nav;
exports.default = _default;
},{}],"src/js/app.js":[function(require,module,exports) {
"use strict";

var _Link = _interopRequireDefault(require("./modules/Link"));

var _LimitChars = _interopRequireDefault(require("./modules/LimitChars"));

var _LazyLoad = _interopRequireDefault(require("./modules/LazyLoad"));

var _InputFileName = _interopRequireDefault(require("./modules/InputFileName"));

var _Toggle = _interopRequireDefault(require("./modules/Toggle"));

var _Close = _interopRequireDefault(require("./modules/Close"));

var _Nav = _interopRequireDefault(require("./modules/Nav"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _Nav.default();
new _Link.default().init();
new _LimitChars.default();
new _LazyLoad.default();
new _InputFileName.default();
new _Toggle.default();
new _Close.default();
},{"./modules/Link":"src/js/modules/Link.js","./modules/LimitChars":"src/js/modules/LimitChars.js","./modules/LazyLoad":"src/js/modules/LazyLoad.js","./modules/InputFileName":"src/js/modules/InputFileName.js","./modules/Toggle":"src/js/modules/Toggle.js","./modules/Close":"src/js/modules/Close.js","./modules/Nav":"src/js/modules/Nav.js"}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/sass/app.sass":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"parcelfile.js":[function(require,module,exports) {
"use strict";

require("./src/js/app.js");

require("./src/sass/app.sass");
},{"./src/js/app.js":"src/js/app.js","./src/sass/app.sass":"src/sass/app.sass"}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57471" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","parcelfile.js"], null)