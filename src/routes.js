const Router = require('@koa/router');
const deploy = require('./handles/deploy/index');
const apiV1 = require('./handles/api/v1/index');

const router = new Router();

router
  .use(deploy.routes(), deploy.allowedMethods())
  .use(apiV1.routes(), apiV1.allowedMethods());

module.exports = router;