# 分发说明

## 如何分发你的Easy Clock应用

### 方法一：分发完整的安装包（推荐）

1. 运行打包命令：
   ```bash
   npm run dist
   ```

2. 在 `dist` 目录中找到安装程序文件（如 `.exe` 或 `.msi`）

3. 将安装程序文件分发给用户

### 方法二：分发便携式版本

1. 运行打包命令：
   ```bash
   npm run dist
   ```

2. 将整个 `dist/win-unpacked` 文件夹压缩成zip文件

3. 用户解压后可以直接运行 `Easy Clock.exe`

### 方法三：分发简化版本

1. 运行简化打包命令：
   ```bash
   npm run package
   ```

2. 将生成的 `EasyClock.exe` 文件分发给用户

## 注意事项

1. **运行环境**：用户不需要安装Node.js或任何其他依赖，因为Electron应用包含了所有必要的运行时

2. **防病毒软件**：某些防病毒软件可能会将Electron应用标记为可疑文件，这是误报

3. **Windows SmartScreen**：首次运行时，Windows可能会显示SmartScreen警告，这是正常的

4. **文件大小**：由于包含了Chromium内核，Electron应用的文件体积较大是正常的

## 自定义分发

如需创建自定义安装程序或添加更多功能，请参考以下资源：

- [Electron Builder文档](https://www.electron.build/)
- [NSIS脚本编写](https://nsis.sourceforge.io/Main_Page)
- [Inno Setup](https://jrsoftware.org/isinfo.php)