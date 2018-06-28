const request = require('supertest')
const expect = require('chai').expect
const Joi = require('joi')
const app = require('express')()
const BodyParser = require('body-parser')

const verifiy = require('../')


function type (obj) {
  return Object.prototype.toString.call(obj).replace(/^\[object\s(\w+)\]$/g, '$1')
}

app.use(BodyParser.json())

app.get('/', verifiy(), (req, res, next) => res.status(200).json({}))

app.get('/goods', verifiy({
  query: {
    limit: Joi.number().required(),
    offset: Joi.number().required()
  }
}), (req, res, next) => {
  res.status(200).json({})
})

app.post('/goods/:marketId', verifiy({
  params: {
    marketId: Joi.number().required()
  },
  body: {
    name: Joi.string().required(),
    price: Joi.number().required()
  }
}), (req, res, next) => res.status(200).json({}))

app.use((err, req, res, next) => {
  if (type(err) === 'VerificationError') {
    const { message, path } = err
    res.status(400).json({
      msg: message,
      path
    })
  }
})


describe('express-joi-verification test', _ => {
  
  it('should return 400', done => {
    request(app)
    .get('/goods?limit=20')
    .expect(400)
    .end(done)
  })

  it('should return 200', done => {
    request(app)
    .get('/goods?limit=20&offset=0')
    .expect(200)
    .end(done)
  })

  it('should return 400 if the body is empty', done => {
    request(app)
    .post('/goods/20')
    .expect(400)
    .expect(res => {
      const result = JSON.parse(res.text)
      expect(result).to.has.key(['msg', 'path'])
      expect(result.msg).to.equal('"name" is required')
    })
    .end(done)
  })

  it('should return 200 if params and body is valid', done => {
    request(app)
    .post('/goods/20')
    .send({ name: 'apple', price: 20.30 })
    .expect(200)
    .end(done)
  })

  it('schema is empty', done => {
    request(app)
    .get('/')
    .expect(200)
    .end(done)
  })
})