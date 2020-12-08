const { ipcMain } = require('electron')
const { send: sendMainWindow } = require('./window/main')
const {
  createWindow: createControlWindow,
  close: closeContronWindow
} = require('./window/control')

const handleIpc = () => {
  ipcMain.handle('login', async () => {
    let code = Math.random().toFixed(6).slice(-6)
    return code
  })

  ipcMain.handle('generate_local_control_code', async () => {
    console.log('generate_local_control_code')
    let code = Math.random().toFixed(6).slice(-6)
    return code
  })

  ipcMain.on('control', (e, remoteCode) => {
    createControlWindow()
    sendMainWindow('control_state_change', remoteCode, 1)
  })

  ipcMain.on('quit_control', (e, remoteCode) => {
    closeContronWindow()
    sendMainWindow('control_state_change', null, 99)
  })
}

module.exports = {
  handleIpc
}
