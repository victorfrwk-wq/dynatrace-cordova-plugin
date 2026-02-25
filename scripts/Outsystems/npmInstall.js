var child_process = require('child_process');
var path = require('path');

module.exports = function (context) {
  var pluginDir = context && context.opts && context.opts.plugin && context.opts.plugin.dir
    ? context.opts.plugin.dir
    : path.resolve(__dirname, '..', '..');

  return new Promise(function (resolve, reject) {
    child_process.exec('npm install --omit=dev --no-audit --no-fund', { cwd: pluginDir }, function (error) {
      if (error !== null) {
        console.log('exec error: ' + error);
        reject('npm installation failed');
        return;
      }
      resolve();
    });
  });
};
