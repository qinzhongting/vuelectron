import { app, BrowserWindow , ipcMain , Tray , Menu , nativeImage} from 'electron'
import { autoUpdater } from "electron-updater"
import {icox} from "./ico.js";

ipcMain.on('window-min', e=> mainWindow.minimize());
ipcMain.on('window-max', e=> {
    if (mainWindow.isMaximized()) {
        mainWindow.unmaximize()
    } else {
        mainWindow.maximize() 
    }
});
ipcMain.on('window-close', e=> mainWindow.close());

// 检测更新，在你想要检查更新的时候执行，renderer事件触发后的操作自行编写
function updateHandle(){
  let message={
    error:'检查更新出错',
    checking:'正在检查更新……',
    updateAva:'检测到新版本，正在下载……',
    updateNotAva:'现在使用的就是最新版本，不用更新',
  };
  const os = require('os');
  autoUpdater.setFeedURL('http://www.ilanpay.com/12/');
  autoUpdater.on('error', function(){
    sendUpdateMessage(message.error)
  });
  autoUpdater.on('checking-for-update', function() {
    sendUpdateMessage(message.checking)
  });
  autoUpdater.on('update-available', function() {
      sendUpdateMessage(message.updateAva)
  });
  autoUpdater.on('update-not-available', function() {
      sendUpdateMessage(message.updateNotAva)
  });
  
  // 更新下载进度事件
  autoUpdater.on('download-progress', function(progressObj) {
      mainWindow.webContents.send('downloadProgress', progressObj)
  })
  autoUpdater.on('update-downloaded',  function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
    sendUpdateMessage('isUpdateNow');
    ipcMain.on('isUpdateNow',()=>{
        autoUpdater.quitAndInstall();
    });
  });
  
  //执行自动更新检查 
  // autoUpdater.checkForUpdates(); 
  ipcMain.on("checkForUpdate",()=>{
    //执行自动更新检查
    autoUpdater.checkForUpdates();
  })
}

// 通过main进程发送事件给renderer进程，提示更新信息
// mainWindow = new BrowserWindow()
function sendUpdateMessage(text){
  mainWindow.webContents.send('message', text)
}


/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

// //托盘对象
let tray = null
const path = require('path');
function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    frame: false, //删除默认标题栏
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
  //尝试更新
  updateHandle();
  // const iconPath = path.join(__dirname,'icons/icon.png');
  // let nimage = nativeImage.createFromPath(iconPath);
  // tray = new Tray(nimage);
  
  let nimage = nativeImage.createFromDataURL(icox);
  nimage = nimage.resize({ width: 16, height: 16 });
  tray = new Tray(nimage);

  // tray = new Tray((process.cwd(), 'dist/icon.ico'));//app.ico是app目录下的ico文件


  const contextMenu = Menu.buildFromTemplate([
    {label: '设置',},
    {label: '帮助',},
    {label: '关于',},
    {label: '退出',click(){
      app.quit();
    }}
  ])
  tray.setToolTip('我是体系托盘！')
  tray.setContextMenu(contextMenu)
  //单击右下角小图标显示应用
  tray.on('click',function(ev, bounds){
    if (mainWindow.isVisible()) { //判断窗口是否可见
      if(mainWindow.isMinimized()){ //判断窗口是否最小化
        mainWindow.show();
      }else{
        mainWindow.hide();
      }
    } else {
      mainWindow.show();
    }
  })

}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
