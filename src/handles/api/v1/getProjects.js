const Router = require('@koa/router');
const fs = require('fs');
const path = require('path');
const router = new Router();

const data = [{
  id: 0,
  type: 0,
  name: 'fe-demo1',
  related: 'server-demo1',
  publishing: 0,
}]

router.get('/get-projects', async function (ctx, next) {
  ctx.status = 200;
  ctx.body = 1;
  next();
});

module.exports = router;