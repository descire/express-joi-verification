# express-joi-verification

<a href="https://www.npmjs.com/package/express-joi-verification"><img src="https://img.shields.io/npm/v/express-joi-verification.svg" alt="Version"></a>
<a href="https://www.npmjs.com/package/express-joi-verification"><img src="https://img.shields.io/npm/l/express-joi-verification.svg" alt="License"></a>
<a href="https://www.npmjs.com/package/express-joi-verification"><img src="https://img.shields.io/npm/dm/express-joi-verification.svg" alt="Downloads"></a>
[![Build Status](https://travis-ci.org/15751165579/express-joi-verification.svg?branch=master)](https://travis-ci.org/)
[![Coverage Status](https://coveralls.io/repos/github/15751165579/express-joi-verification/badge.svg?branch=master)](https://coveralls.io/github/15751165579/express-joi-verification?branch=master)

> Express Middleware for verification querystring params and body by Joi

## Installation

```
  npm install express-joi-verification
```

## Dependencies

  [Joi](https://github.com/hapijs/joi): Object schema description language and validator for JavaScript objects.

```
  npm install joi
```

## Usage

```JavaScript
  const app = require('express')()
  const Joi = require('joi')
  const BodyParser = require('body-parser')
  const verifiy = require('express-joi-verification')

  // use Joi to create schema
  const schema = {
    params: {
      marketId: Joi.number().required()
    },
    body: {
      name: Joi.string().required(),
      price: Joi.number().required()
    }
  }

  // use express-joi-verification express middleware
  app.post('/goods/:marketId', verifiy(schema), (req, res, next) => {
    // do something with req.params and req.body
  })

  // Express Error Handle
  app.use((err, req, res, next) => {
    // custom error
    if (type(err) === 'VerificationError') {
      // For example: you can set status 400 (Bad Request), send error message and path
      const { message, path } = err
      res.status(400).json({
        msg: message,
        path
      })
    }
  })
```

## Test

```
  npm i
  npm run test
```