const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const routes = require('./routes');
const port = 3001;

new Koa()
  .use(bodyParser())
  .use(routes.routes())
  .use(routes.allowedMethods())
  .listen(port, () => {console.log('监听中')});