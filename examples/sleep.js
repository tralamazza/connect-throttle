var connect = require('connect');
var throttle = require('../');

connect()
  .use(connect.responseTime())
  .use(throttle.sleep(250))
  .use(function(req, res) {
    res.end('connect-throttle');
  })
  .listen(9000, function() { console.log('listening 9000'); });
