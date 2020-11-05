const Router = require('@koa/router');
const fs = require('fs');
const path = require('path');
const router = new Router();

router.get('/deploy', async function (ctx) {
  ctx.status = 200;
  ctx.set('content-type', 'text/html')
  ctx.body = fs.readFileSync(path.resolve(path.join('src', 'template', 'index.html')));
});

module.exports = router;