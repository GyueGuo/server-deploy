const WebSocket = require('ws');

const poor = {};

const wss = new WebSocket.Server({
  port: 3004,
});
wss.on('connection', function (ws, request, client) {
  const id = request.url.slice(1);
  if (!poor[id]) {
    poor[id] = []
  }
  poor[id].push(ws)
})
module.exports = {
  send (id, msg, type) {
    const msgItem = JSON.stringify({
      msg,
      type,
    })
    const label = poor[id]
    label.forEach((item) => {
      item.send(msgItem);
    });
  },
  cancel (id) {
    const label = poor[id]
    label.forEach((item) => {
      item.close;
    });
    poor[id] = [];
  },
};