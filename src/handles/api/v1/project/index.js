const Router = require('@koa/router');
const list = require('./list');
const deploy = require('./deploy');

const router = new Router();
const baseUrl = '/project'
router
  .use(baseUrl, list.routes(), list.allowedMethods())
  .use(baseUrl, deploy.routes(), deploy.allowedMethods())

module.exports = router;