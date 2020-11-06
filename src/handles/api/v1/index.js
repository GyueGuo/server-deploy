const Router = require('@koa/router');
const getProjects = require('./getProjects');

const router = new Router();

router
  .use('/api/v1', getProjects.routes(), getProjects.allowedMethods())

module.exports = router;