const electron = require('electron-prebuilt');
const proc = require('child_process');
const path = require('path');

// const moduleRelativePathRE = /^\.{1,2}\//;

module.exports = function launchDebug(script) {
  const appScript = path.join(__dirname, "index.js");
  // TODO massage script if it lacks ./
  console.log("cwd", process.cwd());

  if(script[0] !== "/") {
    script = path.join(process.cwd(),`${script}`);
  } else {
    console.log("not a local path");
  }

  // script = require.resolve(script);

  const child = proc.spawn(electron, [appScript, script], {
    stdio: 'inherit',
    env: Object.assign({}, process.env, {ELECTRON_DEBUG_ARGV: JSON.stringify(process.argv.slice(1))})
  });
  child.on('close', function (code) {
    console.log("script finished with exit code", code);
    process.exit(code);
  });
}