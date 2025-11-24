# 如何为Easy Clock添加图标

为了创建Windows可执行文件，你需要一个.ico格式的图标文件。

## 创建图标的方法：

1. **使用在线工具**：
   - 访问 https://convertio.co/png-ico/ 或类似网站
   - 上传一个PNG格式的图片
   - 转换为ICO格式并下载
   - 将下载的文件重命名为 `icon.ico` 并放置在项目根目录

2. **使用图像编辑软件**：
   - 使用GIMP、Photoshop等软件创建图标
   - 保存为.ico格式

3. **使用命令行工具**：
   - 安装ImageMagick: `npm install -g imagemagick`
   - 转换PNG到ICO: `convert icon.png icon.ico`

## 图标要求：
- 文件名必须为 `icon.ico`
- 放置在项目根目录（与 package.json 同级）
- 建议尺寸：256x256像素

## 替代方案：
如果暂时没有图标文件，可以：
1. 从electron-builder配置中移除icon引用
2. 使用默认的Electron图标