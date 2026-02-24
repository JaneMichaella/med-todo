# Android APK 打包说明

## 修改代码后的打包流程

### 重要提示
**每次修改代码后，都需要在这个项目目录（med-todo）中重新打包，不要直接在 Android Studio 中修改代码！**

### 完整流程

#### 1. 停止开发服务器（如果正在运行）
```bash
# 按 Ctrl+C 停止 npm run dev
```

#### 2. 构建 Web 版本
```bash
npm run build
```
- 这会在 `dist/` 文件夹中生成优化后的网页文件

#### 3. 同步到 Android 项目
```bash
npx cap sync android
```
- 这会把 `dist/` 中的文件复制到 Android 项目中

#### 4. 打开 Android Studio
```bash
npx cap open android
```
- 会自动在 Android Studio 中打开项目

#### 5. 等待 Gradle 同步完成
- 打开 Android Studio 后，底部会显示 "Gradle sync" 进度
- 第一次可能需要 2-10 分钟，后续会更快
- **一定要等待同步完成**，否则构建会失败

#### 6. 构建 APK
在 Android Studio 菜单中：
1. **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
2. 等待构建完成（1-3 分钟）
3. 看到通知："APK(s) generated successfully"
4. 点击通知中的 **locate** 链接

#### 7. 找到 APK 文件
APK 位置：
```
/Users/jane/Desktop/med-todo/android/app/build/outputs/apk/debug/app-debug.apk
```

#### 8. 安装到手机
**方法 A - USB 连接：**
1. 用数据线连接手机
2. 在手机上启用"开发者选项"和"USB 调试"
3. 把 `app-debug.apk` 复制到手机
4. 在手机上打开文件并安装

**方法 B - AirDrop/其他：**
1. 通过 AirDrop、邮件或云盘发送 APK 到手机
2. 在手机上打开文件
3. 允许"安装未知来源应用"
4. 安装

---

## 快捷命令（修改代码后一键打包）

你可以一次运行所有命令：
```bash
npm run build && npx cap sync android && npx cap open android
```

然后在 Android Studio 中：
1. 等待 Gradle sync 完成
2. Build → Build Bundle(s) / APK(s) → Build APK(s)

---

## 常见问题

### Q: 修改代码后，可以直接在 Android Studio 中改吗？
**A: 不行！** Android Studio 中的是生成的代码，你的源代码在 `src/` 文件夹中。
- ✅ **正确做法**：在 VSCode/Cursor 中修改 `src/` 中的代码，然后重新打包
- ❌ **错误做法**：在 Android Studio 中修改代码（会丢失）

### Q: 每次都要重新构建吗？
**A: 是的。** 每次修改代码后都需要：
1. `npm run build` - 重新构建网页
2. `npx cap sync android` - 同步到 Android
3. 在 Android Studio 中重新构建 APK

### Q: 为什么 APK 这么大？
**A:** debug APK 通常 5-10MB。如果要发布到应用商店，需要构建 release 版本（会更小，但需要签名）。

### Q: 需要每次都打开 Android Studio 吗？
**A:** 是的，因为需要用 Android Studio 构建 APK。但如果只是测试网页版，可以用 `npm run dev`。

### Q: 可以自动化这个流程吗？
**A:** 可以！你可以使用命令行工具 `gradlew` 来构建，但第一次还是建议用 Android Studio。

---

## 代码结构（方便你知道改哪里）

```
med-todo/
├── src/                          # 源代码（你应该修改这里！）
│   ├── components/               # UI 组件
│   │   ├── MedicineForm.tsx      # 添加/编辑药物表单
│   │   ├── MedicineList.tsx      # 今日清单页面
│   │   ├── MedicineManagement.tsx # 药物管理页面
│   │   └── ...
│   ├── services/                 # 业务逻辑
│   │   ├── checklistService.ts   # 清单管理（打勾记录）
│   │   ├── medicineService.ts    # 药物数据管理
│   │   └── storage.ts            # 数据存储
│   ├── store/                    # 状态管理
│   │   └── appStore.ts           # 全局状态
│   └── types/                    # TypeScript 类型定义
│       └── index.ts              # 数据结构定义
│
├── android/                      # Android 项目（自动生成，不要手动改！）
│   └── app/build/outputs/apk/    # APK 输出位置
│
├── dist/                         # 构建输出（自动生成）
├── package.json                  # 依赖配置
└── 打包APK说明.md                # 本文件

```

---

## 修改记录

### 2024-XX-XX
- ✅ 修复 Bug：修改药物后不再丢失打勾记录
- ✅ 修复 Bug：每次片数输入框默认为空，可以正常输入

### 未来可能的改进
- [ ] 添加提醒功能（到点提醒吃药）
- [ ] 查看历史记录（过去几天的服药记录）
- [ ] 导出数据功能
- [ ] 支持拍照（药片照片）
