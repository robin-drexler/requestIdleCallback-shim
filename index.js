/**
 * Ideas and code mostly taken from https://gist.github.com/paullewis/55efe5d6f05434a96c36
 */
module.exports = {
  requestIdleCallback: function (cb) {
    if (window.requestIdleCallback) {
      return window.requestIdleCallback(cb);
    }

    var start = Date.now();

    return window.setTimeout(function () {
      cb({
        didTimeout: false,
        timeRemaining: function () {
          return Math.max(0, 50 - (Date.now() - start));
        }
      });
    }, 1);
  },

  cancelIdleCallback: function (handler) {
    if (window.cancelIdleCallback) {
      return window.cancelIdleCallback(handler);
    }

    return window.clearTimeout(handler);
  }
};