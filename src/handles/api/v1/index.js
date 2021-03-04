const Router = require('@koa/router');
const project = require('./project');

const baseUrl = '/api/v1'
const router = new Router();

router
  .use(baseUrl, project.routes(), project.allowedMethods())

module.exports = router;