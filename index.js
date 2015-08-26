//var pause = require('pause');

function sleep(timeout, options) {
  options = options || {};

  if (typeof timeout === 'function') {
    timeout = timeout();
  }

  return function(req, res, next) {
    if (options.pattern && !options.pattern.test(req.url)) {
      next();
      return;
    }

    if (options.debug) {
      console.log('throttle', timeout, req.url);
    }

    //var pauseHandle = pause(req);
    setTimeout(function() {
      next();
      //pauseHandle.resume();
    }, timeout);
  };
}

function configure(options) {
  options = options || {};

  if (typeof options.pattern === 'string') {
    options.pattern = new RegExp(options.pattern);
  }

  return sleep(options.sleep || 250, options);
}

exports.configure = configure;
exports.sleep = sleep;
