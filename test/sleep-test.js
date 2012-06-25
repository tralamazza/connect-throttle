var vows = require('vows');
var should = require('should');
var connect = require('connect');
var http = require('http');
var throttle = require('../');


vows.describe('connect-throlle').addBatch({
  'connect-throttle sanitize': {
    'require("connect-throttle")': function() {
      should.exist(throttle);
    },
    'require("connect-throttle").sleep': function() {
      should.exist(throttle.sleep);
    }
  }
}).addBatch({
  'create a connect with throttle.sleep(250)': {
    topic: function() {
      var that = this;
      connect()
        .use(throttle.sleep(250))
        .use(function(req, res) { res.end('sleep(250)'); })
        .listen(0, function() {
          that.callback(null, this.address());
        });
    },
    'then call .listen()': {
      topic: function(addr, err) { // XXX arguments inverted ?!
        var that = this;
        var options = { host: addr.address, port: addr.port, path: '/' };
        var now = +new Date();
        http.get(options, function(res) {
          that.callback(null, now);
        }).on('error', function(get_err) {
          that.callback(get_err, now);
        });
      },
      'and .get()': function(err, start) {
        should.not.exist(err);
        should.exist(start);
        (+new Date() - start).should.be.above(250);
      }
    }
  }
}).export(module);
