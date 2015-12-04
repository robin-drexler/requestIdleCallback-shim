describe('cancelIdleCallback', function () {

  it('should use window.cancelIdleCallback when it is available', function () {
    window = {
      requestIdleCallback: function () {},
      cancelIdleCallback: function() {}
    };

    var handler = {};
    spyOn(window, 'requestIdleCallback').andReturn(handler);
    spyOn(window, 'cancelIdleCallback');

    var requestIdleCallback = require('../index.js').requestIdleCallback;
    var cancelIdleCallback = require('../index.js').cancelIdleCallback;
    var callback = function() {};

    handler = requestIdleCallback(callback);
    cancelIdleCallback(handler);

    expect(window.cancelIdleCallback).toHaveBeenCalledWith(handler);
  });

  it('should use window.clearTimeout when it is not available', function () {
    window = {
      requestIdleCallback: function() {},
      cancelIdleCallback: undefined,
      clearTimeout: function() {}
    };

    var handler = {};
    spyOn(window, 'requestIdleCallback').andReturn(handler);
    spyOn(window, 'clearTimeout');

    var requestIdleCallback = require('../index.js').requestIdleCallback;
    var cancelIdleCallback = require('../index.js').cancelIdleCallback;
    var callback = function() {};

    handler = requestIdleCallback(callback);
    cancelIdleCallback(handler);

    expect(window.clearTimeout).toHaveBeenCalledWith(handler);
  });
});