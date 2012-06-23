var connect = require('connect');

exports.sleep = function(value) {
  var timeout = function() { return value; };
  if (typeof value === 'function')
    timeout = value;

  return function(req, res, next) {
    var pause = connect.utils.pause(req);
    setTimeout(function() {
      next();
      pause.resume();
    }, timeout());
  };
};
