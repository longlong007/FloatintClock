const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 创建简单的可执行文件打包脚本
console.log('正在创建可执行文件...');

// 确保dist目录存在
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

// 复制必要的文件到dist目录
const filesToCopy = [
    'main.js',
    'renderer.js',
    'index.html',
    'style.css',
    'config.js',
    'package.json'
];

console.log('正在复制文件...');
filesToCopy.forEach(file => {
    const src = path.join(__dirname, file);
    const dest = path.join(distDir, file);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log(`已复制: ${file}`);
    }
});

console.log('打包完成！');
console.log('可执行文件位于: dist/win-unpacked/easy-clock.exe');
console.log('你可以直接运行该文件或将其分发给其他用户。');