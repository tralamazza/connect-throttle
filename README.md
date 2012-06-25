[![Build Status](https://secure.travis-ci.org/tralamazza/connect-throttle.png)](http://travis-ci.org/tralamazza/connect-throttle)

# Connect Throttle

## Installation

    npm install connect-throttle

Use it like any other `connect` middleware.

## HowTo throttle your requests

*Example 1*: Set a fixed one second delay:

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

You can test using apache's `ab`:

    ab localhost:3000/

*Example 2*: Random delay using a function instead of a fixed value:

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
