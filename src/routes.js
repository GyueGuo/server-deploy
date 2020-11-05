const Router = require('@koa/router');
const deploy = require('./handles/deploy/index');

const router = new Router();

router.use(deploy.routes(), deploy.allowedMethods());

module.exports = router;