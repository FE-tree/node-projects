const router = require('koa-router')({
    prefix: '/users'
})
const db = require('../db/mongo')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
