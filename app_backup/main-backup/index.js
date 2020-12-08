const { app } = require('electron')
const { createWindow: createMainWindow } = require('./window/main')
const { handleIpc } = require('./ipc')

app.allowRendererProcessReuse = false

app.on('ready', () => {
  createMainWindow()
  handleIpc()
  require('./robot')()
})
