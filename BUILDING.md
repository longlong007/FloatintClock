# 打包说明

## 打包成Windows可执行文件

### 方法一：使用npm脚本（推荐）

```bash
# 打包Windows应用
npm run dist
```

打包完成后，可执行文件将位于 `dist` 目录中。

### 方法二：使用npx命令

```bash
# 直接使用electron-builder打包
npx electron-builder --win
```

### 方法三：使用批处理脚本

在Windows系统中，可以直接运行项目根目录下的 `build.bat` 文件：

```cmd
build.bat
```

## 打包输出说明

打包完成后，`dist` 目录中将包含以下内容：

1. `win-unpacked` 文件夹：包含未打包的Windows应用程序
2. 安装程序文件（如 `.exe` 或 `.msi`）

## 自定义图标

为了给应用程序添加自定义图标：

1. 准备一个 256x256 像素的 PNG 图片
2. 将其转换为 ICO 格式
3. 重命名为 `icon.ico`
4. 将文件放置在项目根目录
5. 在 `electron-builder.json` 中添加图标配置：

```json
{
  "win": {
    "target": "nsis",
    "icon": "icon.ico"
  }
}
```

## 常见问题

### 打包过程中出现错误
如果打包过程中出现错误，请确保：
1. 已正确安装所有依赖：`npm install`
2. 网络连接正常（需要下载Electron运行时）
3. 磁盘空间充足

### 打包后的文件过大
Electron应用包含完整的Chromium内核，因此文件体积较大是正常的。

## 高级配置

如需自定义打包配置，请修改 `electron-builder.json` 文件。