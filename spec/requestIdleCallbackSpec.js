describe('requestIdleCallback', function () {
  it('should use window.requestIdleCallback when its available', function () {
    window = {
      requestIdleCallback: function () {
      }
    };

    spyOn(window, 'requestIdleCallback');

    var requestIdleCallback = require('../index.js').requestIdleCallback;
    var callback = function() {};

    requestIdleCallback(callback);

    expect(window.requestIdleCallback).toHaveBeenCalledWith(callback);
  });

  it('should use window.setTimeout as fallback when its not available', function (done) {
    var callback = function() {
      // when this is called by requestIdleCallback/setTimeout, everything is good, otherwise it will result in a timeout
      done();
    };

    window = {
      requestIdleCallback: undefined,
      setTimeout: function() {}
    };

    spyOn(window, 'setTimeout').andCallFake(function (cb) {
      cb();
    });
    var requestIdleCallback = require('../index.js').requestIdleCallback;
    requestIdleCallback(callback);

  });

});