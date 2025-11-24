# Easy Clock 打包和分发完整指南

## 目录
1. [准备工作](#准备工作)
2. [打包方法](#打包方法)
3. [分发选项](#分发选项)
4. [自定义配置](#自定义配置)
5. [故障排除](#故障排除)

## 准备工作

在开始打包之前，请确保：

1. 已安装Node.js和npm
2. 已在项目根目录运行 `npm install` 安装所有依赖
3. 项目可以正常运行（`npm start`）

## 打包方法

### 方法一：使用Electron Builder（推荐）

```bash
# 打包Windows应用
npm run dist
```

这将：
- 下载Electron运行时
- 打包应用文件
- 生成完整的Windows应用程序
- 输出到 `dist` 目录

输出文件：
- `dist/win-unpacked/` - 便携式版本
- `dist/Easy Clock Setup.exe` - 安装程序（如果配置了NSIS）

### 方法二：简化打包

```bash
# 创建简化版可执行文件
npm run package
```

这将：
- 复制必要文件到 `dist` 目录
- 生成 `EasyClock.exe` 在项目根目录

## 分发选项

### 1. 完整安装程序
- 优点：用户体验好，自动创建快捷方式
- 缺点：需要安装过程
- 适用：面向普通用户

### 2. 便携式版本
- 优点：无需安装，解压即用
- 缺点：文件分散，不易管理
- 适用：技术用户或测试

### 3. 简化版本
- 优点：单文件，易于分发
- 缺点：功能可能受限
- 适用：快速测试或演示

## 自定义配置

### 添加应用图标

1. 准备256x256 PNG图片
2. 转换为ICO格式
3. 命名为 `icon.ico`
4. 放置在项目根目录
5. 更新 `electron-builder.json`：

```json
{
  "win": {
    "icon": "icon.ico"
  }
}
```

### 自定义应用信息

编辑 `package.json`：

```json
{
  "build": {
    "appId": "com.yourcompany.easyclock",
    "productName": "Your Clock Name",
    "copyright": "Copyright © 2023 Your Company"
  }
}
```

### 配置安装程序

在 `electron-builder.json` 中自定义NSIS设置：

```json
{
  "nsis": {
    "oneClick": false,
    "allowToChangeInstallationDirectory": true,
    "createDesktopShortcut": true,
    "createStartMenuShortcut": true
  }
}
```

## 故障排除

### 常见问题

1. **打包过程中断**
   - 检查网络连接
   - 确保磁盘空间充足
   - 清理 `node_modules` 并重新安装

2. **生成的exe无法运行**
   - 检查Windows防火墙/杀毒软件设置
   - 以管理员身份运行
   - 检查Windows SmartScreen设置

3. **文件过大**
   - 这是Electron的特性，正常现象
   - 可以使用asar打包减少文件数量

### 调试技巧

1. 查看打包日志：
   ```bash
   npm run dist -- --log-level=debug
   ```

2. 手动测试打包文件：
   ```bash
   # 进入打包目录
   cd dist/win-unpacked
   # 运行应用
   ./easy-clock.exe
   ```

## 高级主题

### 代码签名
为避免Windows SmartScreen警告，可以对exe文件进行代码签名：

```bash
# 使用Windows SDK中的signtool
signtool sign /f certificate.pfx /p password /t http://timestamp.digicert.com EasyClock.exe
```

### 自动更新
配置自动更新功能：

```json
{
  "build": {
    "publish": [
      {
        "provider": "github",
        "owner": "your-username",
        "repo": "easy-clock"
      }
    ]
  }
}
```

## 支持和资源

- [Electron官方文档](https://www.electronjs.org/docs)
- [Electron Builder文档](https://www.electron.build/)
- [Node.js](https://nodejs.org/)

如有问题，请检查GitHub上的相关项目或提交issue。