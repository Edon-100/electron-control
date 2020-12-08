if (process.platform === 'darwin') {
  require('./darwin')
} else {
  require('./win32')
}
