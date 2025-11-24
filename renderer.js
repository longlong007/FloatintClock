const { ipcRenderer } = require('electron');

// 获取时钟指针元素
const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');
const digitalTime = document.getElementById('digital-time');
const marksContainer = document.querySelector('.marks');

// 生成时钟刻度
function createClockMarks() {
    const numbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const radius = 65; // 数字距离中心的距离
    const centerX = 80; // 时钟中心X坐标
    const centerY = 80; // 时钟中心Y坐标
    
    for (let i = 0; i < 12; i++) {
        // 计算角度（12点方向为0度）
        const angle = (i * 30) * (Math.PI / 180); // 转换为弧度
        
        // 计算数字的位置
        const x = centerX + radius * Math.sin(angle);
        const y = centerY - radius * Math.cos(angle);
        
        // 创建数字元素
        const numberElement = document.createElement('div');
        numberElement.className = 'mark-text';
        numberElement.textContent = numbers[i];
        numberElement.style.position = 'absolute';
        numberElement.style.left = `${x}px`;
        numberElement.style.top = `${y}px`;
        numberElement.style.transform = 'translate(-50%, -50%)';
        
        marksContainer.appendChild(numberElement);
    }
}

// 初始化刻度
createClockMarks();

// 更新数字时间显示
function updateDigitalTime() {
    const now = new Date();
    
    // 格式化数字时间
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const hoursStr = String(hours).padStart(2, '0');
    const minutesStr = String(minutes).padStart(2, '0');
    const secondsStr = String(seconds).padStart(2, '0');
    const timeString = `${hoursStr}:${minutesStr}:${secondsStr}`;
    
    // 格式化日期
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
    const weekday = weekdays[now.getDay()];
    const dateString = `${year}-${month}-${day} 星期${weekday}`;
    
    // 更新数字时间显示
    digitalTime.textContent = timeString;
    
    // 更新日期显示
    document.getElementById('date').textContent = dateString;
}

// 初始更新
updateDigitalTime();

// 每秒更新一次数字时间
setInterval(updateDigitalTime, 1000);

// 添加平滑的时针、分针和秒针移动效果
function smoothClockHands() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();
    
    // 计算时针的角度（包括分钟和秒的平滑过渡）
    // 时针每小时30度，每分钟0.5度，每秒0.0083度
    const hourDeg = (hours % 12) * 30 + minutes * 0.5 + seconds * (0.5 / 60) + milliseconds * (0.5 / 60000);
    
    // 计算分针的角度（包括秒的平滑过渡）
    // 分针每分钟6度，每秒0.1度
    const minuteDeg = minutes * 6 + seconds * 0.1 + milliseconds * 0.0001;
    
    // 计算秒针的角度（包括毫秒的平滑过渡）
    // 秒针每秒6度
    const secondDeg = seconds * 6 + milliseconds * 0.006;
    
    // 更新指针位置
    hourHand.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
    minuteHand.style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
    secondHand.style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;
}

// 更频繁地更新指针位置以获得平滑效果
setInterval(smoothClockHands, 50);

// 拖拽功能实现
let isDragging = false;
let offsetX, offsetY;
let isVisible = true;

const clockContainer = document.getElementById('clock-container');

// 鼠标按下事件
clockContainer.addEventListener('mousedown', (e) => {
    // 忽略关闭按钮的点击
    if (e.target.id === 'close-btn') return;
    
    isDragging = true;
    
    // 计算鼠标相对于窗口左上角的偏移量
    const rect = clockContainer.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    
    // 设置鼠标样式
    clockContainer.style.cursor = 'grabbing';
});

// 鼠标移动事件
document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    // 计算新的窗口位置
    const x = e.screenX - offsetX;
    const y = e.screenY - offsetY;
    
    // 发送位置更新消息到主进程
    ipcRenderer.send('update-position', { x, y });
});

// 鼠标释放事件
document.addEventListener('mouseup', () => {
    isDragging = false;
    clockContainer.style.cursor = 'default';
});

// 双击隐藏/显示
clockContainer.addEventListener('dblclick', () => {
    isVisible = !isVisible;
    if (isVisible) {
        document.body.style.opacity = '1';
    } else {
        document.body.style.opacity = '0';
    }
});

// 关闭按钮事件
document.getElementById('close-btn').addEventListener('click', () => {
    ipcRenderer.send('close-window');
});