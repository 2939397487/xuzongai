# AI大模型技术学习平台

基于 Next.js 16 + TypeScript + Tailwind CSS 构建的AI大模型技术学习平台。

## 📋 项目概述

这是一个完整的AI学习平台，包含以下功能：
- 多页面应用架构（首页、大模型、工作流、智能体、提示词、教程、关于我）
- 教程文件夹管理系统（支持100+视频）
- 响应式设计，支持移动端和桌面端
- 暗色/亮色主题切换
- 现代化的UI设计

## 🎯 技术栈

- **框架**: Next.js 16 (App Router)
- **语言**: TypeScript 5
- **样式**: Tailwind CSS 4
- **图标**: Lucide React
- **主题**: next-themes
- **包管理**: pnpm

## 📁 项目结构

```
src/
├── app/                    # Next.js页面路由
│   ├── about/             # 关于我们页面
│   ├── agents/            # 智能体页面
│   ├── models/            # 大模型页面
│   ├── prompts/           # 提示词页面
│   ├── tutorials/         # 教程页面
│   ├── workflow/          # 工作流页面
│   └── page.tsx           # 首页
├── components/            # React组件
│   ├── about/            # 关于我们组件
│   ├── agents/           # 智能体展示组件
│   ├── footer/           # 页脚组件
│   ├── header/           # 导航栏组件
│   ├── hero/             # 首页主视觉组件
│   ├── models/           # 大模型展示组件
│   ├── prompts/          # 提示词组件
│   ├── resources/        # 资源组件
│   ├── tutorials/        # 教程组件
│   └── workflow/         # 工作流组件
├── data/                 # 数据文件
│   ├── agents.json       # 智能体数据
│   ├── models.json       # 大模型数据
│   ├── prompts.json      # 提示词数据
│   ├── tutorials.json    # 教程数据（含文件夹）
│   └── workflows.json    # 工作流数据
├── lib/                  # 工具函数
│   ├── constants.ts     # 常量定义
│   └── utils.ts         # 工具函数
└── types/               # TypeScript类型定义
    └── index.ts         # 类型定义

配置文件：
├── .coze                # 项目配置
├── package.json         # 依赖配置
├── tsconfig.json        # TypeScript配置
└── next.config.ts       # Next.js配置
```

## 🚀 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 启动开发服务器

```bash
pnpm dev
```

访问 http://localhost:5000 查看网站

### 3. 构建生产版本

```bash
pnpm build
```

### 4. 启动生产服务器

```bash
pnpm start
```

## 📦 压缩包内容

压缩包 `ai-learning-platform.tar.gz` 包含：

### 核心文件
- ✅ 所有源代码 (src/)
- ✅ 配置文件 (.coze, package.json, tsconfig.json, next.config.ts)
- ✅ 样式配置 (postcss.config.mjs, eslint.config.mjs)
- ✅ 构建脚本 (.cozeproj/scripts/)

### 已排除
- ❌ node_modules/ (需要重新安装)
- ❌ .next/ (构建缓存)
- ❌ .git/ (版本控制)
- ❌ pnpm-lock.yaml (锁文件)

## 🎨 功能特性

### 1. 多页面应用
- 首页：Hero区域 + 教程组件
- 大模型：展示主流AI模型
- 工作流：LangChain工作流教程
- 智能体：AI Agent案例展示
- 提示词：提示词工程技巧
- 教程：视频教程管理系统（含文件夹）
- 关于我们：团队介绍

### 2. 教程文件夹系统
- 支持文件夹分类管理
- "迪哥AI"文件夹：100+小视频
- 文件夹层级浏览
- 视频搜索和筛选
- 分类和难度标签

### 3. 主题切换
- 亮色模式/暗色模式
- 持久化存储
- 平滑过渡动画

### 4. 响应式设计
- 移动端优先
- 自适应布局
- 触摸友好

## 🔧 配置说明

### 端口配置
- 开发环境: 5000
- 热更新端口: 6000 (如使用)

### 环境变量
创建 `.env.local` 文件：
```env
# 添加你的环境变量
```

## 📝 数据管理

### 修改教程数据
编辑 `src/data/tutorials.json`：
- `folders`: 文件夹配置
- `videos`: 视频配置（关联folderId）

### 修改其他数据
- 大模型: `src/data/models.json`
- 智能体: `src/data/agents.json`
- 提示词: `src/data/prompts.json`
- 工作流: `src/data/workflows.json`

## 🎯 自定义开发

### 添加新页面
1. 在 `src/app/` 创建新目录
2. 添加 `page.tsx` 文件
3. 在导航栏 `src/components/header/Header.tsx` 添加链接

### 修改主题颜色
编辑 `src/lib/constants.ts`：
```typescript
export const colors = {
  primary: 'slate-800',
  secondary: 'slate-100',
  // ...
};
```

## 📱 部署

### 构建项目
```bash
pnpm build
```

### 部署到Vercel
1. 推送代码到GitHub
2. 连接Vercel项目
3. 自动部署

### 部署到其他平台
按照 `.coze` 配置文件的构建和运行命令进行部署

## 🐛 常见问题

### 1. 依赖安装失败
```bash
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install
```

### 2. 端口被占用
修改 `.cozeproj/scripts/dev_run.sh` 中的端口号

### 3. 样式不生效
```bash
rm -rf .next
pnpm dev
```

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系方式

如有问题，请通过以下方式联系：
- 提交 Issue
- 发送邮件

---

**注意**: 解压压缩包后，请先运行 `pnpm install` 安装依赖，然后使用 `pnpm dev` 启动项目。
