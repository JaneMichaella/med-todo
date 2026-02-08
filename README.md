# 药物清单 (Medicine Tracking App)

一个帮助管理每日药物服用的 Android 应用。专为需要服用多种药物的用户设计，特别是老年人。

## 功能特点

- ✅ **每日清单**: 自动生成每日药物清单，按时段（早上/中午/晚上）分组
- ✅ **打勾记录**: 点击药物即可标记已服用
- ✅ **清晰显示**: 大字体、高对比度，显示每次需要服用的药片数量
- ✅ **自动重置**: 每天自动重置清单，无需手动操作
- ✅ **中文界面**: 完整的中文用户界面
- ✅ **离线使用**: 所有数据存储在本地，无需网络连接

## 技术栈

- **React** + TypeScript + Vite - 前端框架
- **Capacitor** - Web 到 Native 桥接，支持 Android APK 打包
- **Zustand** - 状态管理
- **date-fns** - 日期处理
- **Capacitor Preferences** - 本地数据存储

## 开发

### 安装依赖

```bash
npm install
```

### 启动开发服务器（Web 调试）

```bash
npm run dev
```

在浏览器打开 http://localhost:5173

### 构建 Web 版本

```bash
npm run build
```

### 添加 Android 平台

```bash
npx cap add android
```

### 同步代码到 Android

```bash
npm run build
npx cap sync
```

### 在 Android Studio 中打开

```bash
npx cap open android
```

### 构建 APK

1. 在 Android Studio 中打开项目
2. Build → Build Bundle(s) / APK(s) → Build APK(s)
3. APK 文件将生成在 `android/app/build/outputs/apk/`

## 使用说明

### 添加药物

1. 点击底部的 "添加药物" 按钮
2. 填写药物信息：
   - 药物名称（必填）
   - 服用时段：早上/中午/晚上/全天
   - 每天次数：1-3 次
   - 每次片数：1 片或更多
   - 药片外观（可选）
3. 点击"保存"

### 记录服用

- 在清单中点击药物名称或复选框即可标记为已服用
- 已服用的药物会显示绿色背景和完成时间

### 编辑/删除药物

- 点击药物名称进入编辑界面
- 在编辑界面可以修改信息或删除药物

### 每日重置

- 应用会自动检测日期变化
- 每天的清单会自动重置，所有药物恢复为未服用状态

## 数据存储

所有数据存储在设备本地，使用 Capacitor Preferences API：

- `medicines_list`: 药物列表
- `daily_checklist`: 每日清单
- `last_active_date`: 上次活跃日期

## 项目结构

```
src/
├── components/       # UI 组件
│   ├── Header.tsx
│   ├── MedicineList.tsx
│   ├── MedicineGroup.tsx
│   ├── MedicineItem.tsx
│   ├── PillCountBadge.tsx
│   ├── AddButton.tsx
│   └── MedicineForm.tsx
├── hooks/           # React Hooks
│   └── useDailyReset.ts
├── services/        # 数据服务
│   ├── storage.ts
│   ├── medicineService.ts
│   └── checklistService.ts
├── store/           # 状态管理
│   └── appStore.ts
├── types/           # TypeScript 类型定义
│   └── index.ts
├── utils/           # 工具函数
│   ├── dateUtils.ts
│   └── checklistGenerator.ts
├── locales/         # 本地化文本
│   └── zh-CN.ts
└── styles/          # 样式
    └── global.css
```

## License

MIT
