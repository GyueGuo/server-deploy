const Koa = require('koa');
const routes = require('./routes');

const port = 3001;

new Koa()
  .use(routes.routes())
  .use(routes.allowedMethods())
  .listen(port);