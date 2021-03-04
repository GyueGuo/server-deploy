const Router = require('@koa/router');
const router = new Router();
const data = require('./fake-db');

router.get('/list', async function (ctx, next) {
  ctx.status = 200;
  ctx.body = {
    data,
    success: true,
    message: '',
  }
  next();
});

module.exports = router;