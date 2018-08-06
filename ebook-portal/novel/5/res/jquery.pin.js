;
(function ($) {
  $.fn.pin = function (opts) {
    var settings = {
        interval: 5, //校正的节流
        zIndex: 100, //层级
        abs: false, //是不是吸顶效果
        absTop: 10,
        slide: {},
        direction: 'left',  // left || right
        threshold: 500, //如果距离顶部 threshold的时候才显示
        distance: 50, //默认的距离
        slide: null,
        backToTop: false,
        minWidth: 1400,
        trigger: null,
        timer: null,
        callback: null,
        animate: 0
      },
      settings = $.extend(true, settings, opts || {}),
      $doc = $(document),
      $window = $(window),
      disabled = false,
      show = [settings.animate ? 'fadeIn' : 'show'],
      hide = [settings.animate ? 'fadeOut' : 'hide'],
      isie6 = $.browser.msie && ($.browser.version < 7),
      marginLeft = 'margin-left',
      position = isie6 ? 'absolute' : 'fixed',
      flip = settings.direction == 'right' ? 'left' : 'right',
      isBottom = settings.slide && settings.slide.bottom && (settings.slide.bottom != 'auto'),
      _position = function (elem, init) {
        var $elem = $(elem),
          scrollTop = $doc.scrollTop(),
          winWidth = $window.width(),
          top;
        show = 'show';
        hide = 'hide';
        if (settings.animate && !init) {
          show = 'fadeIn';
          hide = 'fadeOut';
        }
        $elem.css($.extend({position: position, 'z-index': settings.zIndex}, settings.slide));
        if (winWidth <= settings.minWidth) {
          if(settings.pin) {
            $elem.css(marginLeft, 0).css('position','static').show();
            disabled = true;
          } else {
            //当小于最小宽度,$elem会吸附页面2侧
            $elem.css(marginLeft, 0).css(settings.direction, 0).css(flip, 'auto');
          }
        } else {
          disabled = false;
        }
        if (!disabled && scrollTop <= settings.threshold) {
          //如果是吸顶
          if (settings.abs) {
            //不考虑bottom
            //if(scrollTop == settings.threshold) $elem.hide().fadeIn();
            $elem.css({position: 'absolute', top: settings.distance});
            $elem[show]();
          } else {
            $elem[hide]();
          }
        } else {
          if (settings.abs) {
            top = isie6 ? Math.abs(scrollTop + settings.absTop) : settings.absTop;
            $elem.css({"top": top});
          } else {
            if (isie6) {
              top = Math.abs(scrollTop + document.documentElement.clientHeight - $elem.outerHeight() - settings.distance);
              var _css = {
                top: top,
                bottom: 'auto'
              };
              $elem.css(_css);
            }
          }
          $elem[show]();
        }
        if (typeof settings.callback == 'function') {
          settings.callback.call(this);
        }
      }, init = function (elem, init) {
        if (settings.timer) {
          clearTimeout(settings.timer);
        }
        settings.timer = setTimeout(function () {
          _position(elem, init);
        }, settings.interval);
      };
    return this.each(function () {
      var self = this;
      init(self, 'init');

      if (settings.backToTop) {
        $(self).bind("click", function () {
          $doc.scrollTop(0);
          init(self);
        });
      }
      $(window).bind("scroll resize", function () {
        init(self);
      });
    });
  };
})(jQuery);