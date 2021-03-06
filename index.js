// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu, contextBridge,dialog, ipcMain } = require('electron')
require('electron-reload')(__dirname)
const path = require('path')
const fs = require('fs')
const ipc = ipcMain
val = null


function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Annotation Utility',
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        devTools: true,
        preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')


  ipc.on('opendir', () => {
      console.log('choose your directory please')
      contextBridge.exposeInMainWorld('API', {
        
      })
      files = dialog.showOpenDialogSync(mainWindow, {
          title: 'عايز أيه',
          defaultPath: './',
          buttonLabel: "أحفظ يا حيوان",
          filters: [
            { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
            { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
            { name: 'Custom File Type', extensions: ['as'] },
            { name: 'All Files', extensions: ['*'] }
          ],
          properties: ['openFile', 'multiSelections', 'showHiddenFiles']
      })
      // .then((result) => {
      //     console.log(result.filePaths[0])
      //     val = result.filePaths[0]
      // })
      if(!files) return
      console.log(files)
      const filecontent = fs.readFileSync(files[0]).toString()
      console.log(filecontent)
  })
  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}









// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.