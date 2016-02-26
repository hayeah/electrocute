'use strict';

console.log("argv", process.argv);

const script = process.argv[2];

if(script === undefined) {
  throw "please specify a script to debug";
}


const electron = require('electron');
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.

const fs = require("fs");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    useContentSize: true,
    width: 0,
    height: 0,
    x: 0,
    y: 0
  });

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + `/index.html`);

  const content = mainWindow.webContents;

  // Open the DevTools.
  content.openDevTools({
    detach: true,
  });

  content.on("did-finish-load", () => {
    // console.log("ELECTRON_DEBUG_ARGV", JSON.parse(process.env.ELECTRON_DEBUG_ARGV));
    console.log("inject script", script);

    const argv = process.env.ELECTRON_DEBUG_ARGV;

    const injectRequireModule = `process.argv = ${argv};require(${JSON.stringify(script)})`;
    content.executeJavaScript(injectRequireModule);
  });

  fs.watch(script, () => {
    console.log("auto reload", script);
    content.reload();
  });

  mainWindow.webContents.once('devtools-opened', function () {
    mainWindow.hide();
  });

  mainWindow.webContents.once('devtools-closed', function () {
    // mainWindow.hide();
    mainWindow.close();
    // process.exit(0);
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  app.on('window-all-closed', function() {
    app.quit();
  });
});