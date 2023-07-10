import { app, BrowserWindow, shell } from 'electron'
import path, { join } from 'path'
import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { BiGenProt } from './logic/net'
import './handlers/index'
import fs from 'fs'
import express from 'express'
export const userDataPath = app.getPath('userData')
export const cacheDir = path.join(userDataPath, 'history')

export const PORT = 3000
export const dbPath: string = path.join(userDataPath, 'db')
export const cacheHttpURL = async () => {
  const port = await BiGenProt()
  return `http://127.0.0.1:${port}`
}
const initCacheDir = () => {
  return new Promise((resolve) => {
    try {
      const existCacheDir = fs.existsSync(cacheDir)
      if (!existCacheDir) {
        fs.mkdirSync(cacheDir)
      }
      resolve(true)
    } catch (e) {
      resolve(false)
    }
  })
}
async function createServer() {
  if (!(await initCacheDir())) process.exit(0)
  const randomPort = await BiGenProt()
  // 启动服务器
  // 启动 Express 服务器
  const server = express()
  server.use(express.static(cacheDir))
  server.listen(randomPort, () => {
    console.log(`服务器已启动，监听端口${randomPort}`)
  })
}

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    minWidth: 500,
    minHeight: 620,
    show: false,
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')
  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

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
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('ready', () => {
  createServer()
})
// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
