const { spawn } = require('child_process')
const fs = require('fs');
const path = require('path');
const os = require('os');
const Router = require('@koa/router');
const rmdir = require('rmdir');
const ws = require('../../../ws');

const router = new Router();
const db  = require('./fake-db');
const tmpPath = path.join(os.tmpdir(), 'temp');

function doDeploy (id) {
  const tempPath = fs.mkdtempSync(tmpPath);
  const data = db.find((item) => (item.id == id))
  const target = path.join(path.resolve('/projects/static-assets'), data.name)
  const params = { id, tempPath, data, target }
  cloneGit(params)
    .then(() => {
      installNpm(params)
    })
    .then(() => {
      runCommand(params)
    })
    .then(() => {
      removeFiles(params)
    })
    .then(() => {
      copyFiles(params)
    })
    .catch(() => {
      rmdir(tempPath)
    });
}

function postMsg (...ars) {
  ws.send(...ars)
}
function cloneGit ({
  data,
  tempPath,
  id,
}) {
  return new Promise((resolve, reject) => {
    const { git, branch } = data
    const ls = spawn('git', ['clone', '-b', branch, git, tempPath]);
    ls.on('close', (code) => {
      if (code === 0) {
        resolve()
      }
    });
    ls.stdout.on('data', (data) => {
      postMsg(id, data.toString(), 0)
    });
    ls.stderr.on('data', (data) => {
      postMsg(id, data.toString(), 1)
    });
    ls.on('error', () => {
      reject();
    });
  });
}
function installNpm ({ id, tempPath }) {
  return new Promise((resolve, reject) => {
    const ls = spawn('npm', ['i'], {
      cwd: tempPath,
    });
    ls.on('close', (code) => {
      if (code === 0) {
        resolve()
      }
    });
    ls.stdout.on('data', (data) => {
      postMsg(id, data.toString(), 0)
    });
    ls.stderr.on('data', (data) => {
      postMsg(id, data.toString(), 1)
    });
    ls.on('error', () => {
      reject();
    });
  });
}
function runCommand ({ id, tempPath }) {
  return new Promise((resolve, reject) => {
    const ls = spawn('npm', ['run', 'build'], {
      cwd: tempPath,
    });
    ls.on('close', (code) => {
      if (code === 0) {
        resolve()
      }
    });
    ls.stdout.on('data', (data) => {
      postMsg(id, data.toString(), 0)
    });
    ls.stderr.on('data', (data) => {
      postMsg(id, data.toString(), 1)
    });
    ls.on('error', () => {
      reject();
    });
  });
}

function removeFiles ({ id, target }) {
  return new Promise((resolve, reject) => {
    rmdir(target, (err) => {
      if (err) {
        postMsg(id, err, 0)
        resolve()
      } else {
        reject()
      }
    })
  });
}
function copyFiles ({ id, tempPath, target }) {
  return new Promise((resolve, reject) => {
    fs.rename(path.join(tempPath, 'build', 'static'), target, function (err) {
      if (err) {
        postMsg(id, err, 0)
        resolve()
      } else {
        reject()
      }
    });
  });
}

router.get('/deploy', async function (ctx, next) {
  const { id } = ctx.request.query
  doDeploy(id)
  ctx.status = 200;
  ctx.body = {
    success: true,
    message: '',
  }
  next();
});

module.exports = router;