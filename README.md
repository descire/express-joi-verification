# express-joi-verification

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