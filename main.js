const { app, BrowserWindow, screen, ipcMain, Menu } = require('electron');
const path = require('path');
const config = require('./config');

// 保持对窗口的全局引用，避免被垃圾回收
let clockWindow;

function createClockWindow() {
  // 获取屏幕尺寸
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  
  // 创建悬浮时钟窗口
  clockWindow = new BrowserWindow({
    width: config.window.width,
    height: config.window.height,
    minWidth: config.window.width,
    minHeight: config.window.height,
    maxWidth: config.window.width,
    maxHeight: config.window.height,
    x: width - config.window.width - 20, // 右下角位置
    y: height - config.window.height - 20,
    transparent: config.window.transparent, // 透明背景
    frame: config.window.frame, // 无边框
    alwaysOnTop: config.window.alwaysOnTop, // 始终置顶
    resizable: false, // 不可调整大小
    movable: config.window.movable, // 可移动
    skipTaskbar: true, // 不在任务栏显示
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: false,
      zoomFactor: 1.0
    }
  });

  // 加载时钟页面
  clockWindow.loadFile('index.html');
  
  // 禁用窗口缩放
  clockWindow.webContents.setZoomFactor(1.0);
  clockWindow.webContents.setVisualZoomLevelLimits(1, 1);

  // 创建右键菜单
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '始终置顶',
      type: 'checkbox',
      checked: true,
      click: () => {
        if (clockWindow.isAlwaysOnTop()) {
          clockWindow.setAlwaysOnTop(false);
        } else {
          clockWindow.setAlwaysOnTop(true);
        }
      }
    },
    {
      label: '透明度',
      submenu: [
        {
          label: '高 (90%)',
          click: () => {
            clockWindow.setBackgroundColor('#000000E6');
          }
        },
        {
          label: '中 (70%)',
          click: () => {
            clockWindow.setBackgroundColor('#000000B3');
          }
        },
        {
          label: '低 (50%)',
          click: () => {
            clockWindow.setBackgroundColor('#00000080');
          }
        }
      ]
    },
    {
      type: 'separator'
    },
    {
      label: '退出',
      click: () => {
        app.quit();
      }
    }
  ]);

  // 监听右键菜单事件
  clockWindow.webContents.on('context-menu', () => {
    contextMenu.popup(clockWindow);
  });

  // 窗口关闭时退出应用
  clockWindow.on('closed', () => {
    clockWindow = null;
    app.quit();
  });
}

// 当 Electron 完成初始化时创建窗口
app.whenReady().then(() => {
  createClockWindow();

  // 在 macOS 上，当点击 dock 图标且没有其他窗口打开时，通常会重新创建一个窗口
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createClockWindow();
    }
  });
});

// 当所有窗口都关闭时退出应用（Windows & Linux）
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// 处理时钟位置更新
ipcMain.on('update-position', (event, position) => {
  if (clockWindow) {
    clockWindow.setPosition(position.x, position.y);
  }
});

// 处理窗口关闭
ipcMain.on('close-window', () => {
  app.quit();
});