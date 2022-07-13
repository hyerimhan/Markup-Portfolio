$(document).ready(function () {
  /* ------------------------ menu Ink effect ---------------------------*/

  var modalTrigger = $(".trigger"),
    transitionLayer = $(".transition-layer"),
    transitionBackground = transitionLayer.children(),
    modalWindow = $(".moPanel");

  var frameProportion = 1.78,
    frames = 25,
    resize = false;

  setLayerDimensions();
  $(window).on("resize", function () {
    if (!resize) {
      resize = true;
      !window.requestAnimationFrame
        ? setTimeout(setLayerDimensions, 300)
        : window.requestAnimationFrame(setLayerDimensions);
    }
  });

  modalTrigger.on("click", function (event) {
    event.preventDefault();
    transitionLayer.addClass("visible opening");
    var delay = $(".no-cssanimations").length > 0 ? 0 : 600;
    setTimeout(function () {
      modalWindow.addClass("visible");
    }, delay);
  });

  modalWindow.on("click", ".panel-close", function (event) {
    event.preventDefault();
    transitionLayer.addClass("closing");
    modalWindow.removeClass("visible");
    transitionBackground.one(
      "webkitAnimationEnd oanimationend msAnimationEnd animationend",
      function () {
        transitionLayer.removeClass("closing opening visible");
        transitionBackground.off(
          "webkitAnimationEnd oanimationend msAnimationEnd animationend"
        );
      }
    );
  });

  function setLayerDimensions() {
    var windowWidth = $(window).width(),
      windowHeight = $(window).height(),
      layerHeight,
      layerWidth;

    if (windowWidth / windowHeight > frameProportion) {
      layerWidth = windowWidth;
      layerHeight = layerWidth / frameProportion;
    } else {
      layerHeight = windowHeight * 1.2;
      layerWidth = layerHeight * frameProportion;
    }

    transitionBackground.css({
      width: layerWidth * frames + "px",
      height: layerHeight + "px",
    });

    resize = false;
  }

  /* ------------------------ search Input ---------------------------*/

  $(function () {
    App.init();
  });
  var App = {
    init: function () {
      this.search.bar();
    },
    search: {
      bar: function () {
        $(".searchButton").on("click", function () {
          var e =
            ($(".search input").hasClass("search-visible"),
            $(".search input").val());

          return "" != e && null != e
            ? (App.search.html($(".search input").val()), !1)
            : void $(".search input").toggleClass("search-visible");
        });
      },
    },
  };

  /* ------------------------ episode click event --------------------------*/

  const slider = document.querySelector("[data-carousel]");
  const slides = [...document.querySelectorAll(".Wallop-item")];
  this.wallop = new Wallop(slider);

  let prev = 0;

  const removePrevClasses = (index) => {
    let prevClass;
    if (slides[index].classList.contains("Wallop-item--hidePrevious")) {
      prevClass = "Wallop-item--hidePrevious";
    } else if (slides[index].classList.contains("Wallop-item--hideNext")) {
      prevClass = "Wallop-item--hideNext";
    }

    if (prevClass) {
      setTimeout(() => {
        slides[index].classList.remove(prevClass);
      }, 600);
    }
  };

  const onChange = () => {
    removePrevClasses(prev);
    prev = this.wallop.currentItemIndex;
  };

  this.wallop.on("change", onChange);
});

/* ------------------------ cast scroll motion --------------------------*/

(function () {
  var Util,
    __bind = function (fn, me) {
      return function () {
        return fn.apply(me, arguments);
      };
    };

  Util = (function () {
    function Util() {}

    Util.prototype.extend = function (custom, defaults) {
      var key, value;
      for (key in custom) {
        value = custom[key];
        if (value != null) {
          defaults[key] = value;
        }
      }
      return defaults;
    };

    return Util;
  })();

  this.WOW = (function () {
    WOW.prototype.defaults = {
      boxClass: "wow",
      animateClass: "animated",
      offset: 0,
      mobile: true,
    };

    function WOW(options) {
      if (options == null) {
        options = {};
      }
      this.scrollCallback = __bind(this.scrollCallback, this);
      this.scrollHandler = __bind(this.scrollHandler, this);
      this.start = __bind(this.start, this);
      this.scrolled = true;
      this.config = this.util().extend(options, this.defaults);
    }

    WOW.prototype.init = function () {
      var _ref;
      this.element = window.document.documentElement;
      if (
        (_ref = document.readyState) === "interactive" ||
        _ref === "complete"
      ) {
        return this.start();
      } else {
        return document.addEventListener("DOMContentLoaded", this.start);
      }
    };

    WOW.prototype.start = function () {
      var box, _i, _len, _ref;
      this.boxes = this.element.getElementsByClassName(this.config.boxClass);
      if (this.boxes.length) {
        if (this.disabled()) {
          return this.resetStyle();
        } else {
          _ref = this.boxes;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            box = _ref[_i];
            this.applyStyle(box, true);
          }
          window.addEventListener("scroll", this.scrollHandler, false);
          window.addEventListener("resize", this.scrollHandler, false);
          return (this.interval = setInterval(this.scrollCallback, 50));
        }
      }
    };

    WOW.prototype.show = function (box) {
      this.applyStyle(box);
      return (box.className =
        "" + box.className + " " + this.config.animateClass);
    };

    WOW.prototype.applyStyle = function (box, hidden) {
      var delay, duration, iteration;
      duration = box.getAttribute("data-wow-duration");
      delay = box.getAttribute("data-wow-delay");
      iteration = box.getAttribute("data-wow-iteration");
      return box.setAttribute(
        "style",
        this.customStyle(hidden, duration, delay, iteration)
      );
    };

    WOW.prototype.customStyle = function (hidden, duration, delay, iteration) {
      var style;
      style = hidden
        ? "visibility: hidden; -webkit-animation-name: none; -moz-animation-name: none; animation-name: none;"
        : "visibility: visible;";
      if (duration) {
        style +=
          "-webkit-animation-duration: " +
          duration +
          "; -moz-animation-duration: " +
          duration +
          "; animation-duration: " +
          duration +
          ";";
      }
      if (delay) {
        style +=
          "-webkit-animation-delay: " +
          delay +
          "; -moz-animation-delay: " +
          delay +
          "; animation-delay: " +
          delay +
          ";";
      }
      if (iteration) {
        style +=
          "-webkit-animation-iteration-count: " +
          iteration +
          "; -moz-animation-iteration-count: " +
          iteration +
          "; animation-iteration-count: " +
          iteration +
          ";";
      }
      return style;
    };

    WOW.prototype.scrollHandler = function () {
      return (this.scrolled = true);
    };

    WOW.prototype.scrollCallback = function () {
      var box;
      if (this.scrolled) {
        this.scrolled = false;
        this.boxes = function () {
          var _i, _len, _ref, _results;
          _ref = this.boxes;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            box = _ref[_i];
            if (!box) {
              continue;
            }
            if (this.isVisible(box)) {
              this.show(box);
              continue;
            }
            _results.push(box);
          }
          return _results;
        }.call(this);
        if (!this.boxes.length) {
          return this.stop();
        }
      }
    };

    WOW.prototype.offsetTop = function (element) {
      var top;
      top = element.offsetTop;
      while ((element = element.offsetParent)) {
        top += element.offsetTop;
      }
      return top;
    };

    WOW.prototype.isVisible = function (box) {
      var bottom, offset, top, viewBottom, viewTop;
      offset = box.getAttribute("data-wow-offset") || this.config.offset;
      viewTop = window.pageYOffset;
      viewBottom = viewTop + this.element.clientHeight - offset;
      top = this.offsetTop(box);
      bottom = top + box.clientHeight;
      return top <= viewBottom && bottom >= viewTop;
    };

    WOW.prototype.util = function () {
      return this._util || (this._util = new Util());
    };

    WOW.prototype.disabled = function () {
      return !this.config.mobile && this.util().isMobile(navigator.userAgent);
    };

    return WOW;
  })();
}.call(this));

wow = new WOW({
  animateClass: "animated",
  offset: 100,
});
wow.init();
