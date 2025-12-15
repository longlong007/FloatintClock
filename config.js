// 默认配置
module.exports = {
  // 窗口设置
  window: {
    width: 320,
    height: 480,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    resizable: false,
    movable: true
  },
  
  // 时钟显示设置
  clock: {
    timeFormat: 'HH:mm:ss', // 时间格式
    dateFormat: 'YYYY-MM-DD', // 日期格式
    showDate: true, // 是否显示日期
    fontSize: {
      time: 24,
      date: 12
    }
  },
  
  // 样式设置
  style: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    textColor: '#ffffff',
    borderRadius: 10,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)'
  }
};