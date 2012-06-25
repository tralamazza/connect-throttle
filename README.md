# Connect Throttle

## Installation

    npm install connect-throttle


## Request throttling using _sleep_

```js
var connect = require('connect');
var throttle = require('connect-throttle');
connect()
  .use(throttle.sleep(1000))
  .use(function(req, res) {
    console.log('1 req/s');
    res.end('');
  }).listen(3000);
```

Try:

    ab localhost:3000/


Pass a function instead of a fixed value:

```js
var connect = require('connect');
var throttle = require('connect-throttle');
connect()
  .use(connect.responseTime())
  .use(throttle.sleep(function() { return Math.floor(Math.random() * 500); }))
  .use(function(req, res) {
    res.end('');
  }).listen(3000);
```

