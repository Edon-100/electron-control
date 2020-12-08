const { app, BrowserWindow } = require('electron')
const path = require('path')
const handleIPC = require('./ipc')
const {
  create: createMainWindow,
  show: showMainWindow,
  close: closeMainWindow
} = require('./windows/main')

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  console.log('!gotTheLock', gotTheLock)
  app.quit()
} else {
  console.log('gotTheLock',  gotTheLock)
  app.on('ready', () => {
    createMainWindow()
    handleIPC()
    require('./trayAndMenu')
    require('./robot.js')()
  })

  app.on('second-instance', (event, commandLine, workingDirectory) => {
    console.log('second-instance')
    showMainWindow()
  })

  app.on('before-quit', () => {
    console.log('before-quit')
    closeMainWindow()
  })

  app.on('activate', () => {
    console.log('activate')
    showMainWindow()
  })
}
