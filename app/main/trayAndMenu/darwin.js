const { app, Menu, Tray } = require('electron')
const { show: showMainWindow } = require('../windows/main')
const { create: createAboutWindow } = require('../windows/about')
const path = require('path')

global.tray = null

const setTray = () => {
  global.tray = new Tray(path.resolve(__dirname, './icon_darwin.png'))

  global.tray.on('click', () => {
    showMainWindow()
  })

  global.tray.on('right-click', () => {
    const contextMenu = Menu.buildFromTemplate([
      {
        label: '显示',
        click: showMainWindow
      },
      {
        label: '退出',
        click: app.quit
      }
    ])
    global.tray.popUpContextMenu(contextMenu)
  })
}

const setAppMenu = () => {
  let appMenu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          label: 'About',
          click: createAboutWindow
        },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    },
    { role: 'fileMenu' },
    { role: 'windowMenu' },
    { role: 'editMenu' }
  ])
  app.applicationMenu = appMenu
}

app.whenReady().then(() => {
  setTray()
  setAppMenu()
})
