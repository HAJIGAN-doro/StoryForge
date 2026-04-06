# 人生故事记录AI产品需求文档

## 1. 确定核心目标

### 1.1 产品定位

本产品是一款利用AI与用户对话，帮助用户记录、整理个人人生故事的智能应用。通过自然语言交互，引导用户回忆和讲述生活中的重要事件，AI会智能分析、整理并生成结构化的人生故事内容。

### 1.2 核心价值

- **便捷性**：通过AI对话方式，降低用户记录故事的门槛
- **智能化**：AI自动整理对话内容，生成结构化故事文本
- **隐私性**：本地部署，数据完全存储在用户本地
- **灵活性**：支持云服务API和本地大模型两种AI接入方式

### 1.3 目标用户

- 希望记录人生故事的个人用户
- 对AI技术感兴趣，愿意尝试新工具的用户
- 注重数据隐私，不希望将个人数据上传到云端的用户

### 1.4 MVP版本目标

MVP版本将验证以下核心假设：
- 用户愿意通过与AI对话的方式记录人生故事
- AI能够有效地引导用户讲述完整的故事
- 本地部署方案能够被个人用户接受和使用

---

## 2. 功能规划清单

### 2.1 核心功能（MVP版本）

| 功能模块 | 功能点 | 优先级 | 说明 |
|----------|--------|--------|------|
| AI对话系统 | 对话引导 | P0 | AI通过提问引导用户讲述故事 |
| | 多轮对话 | P0 | 支持上下文理解，保持对话连贯性 |
| | 语音输入 | P1 | 支持语音输入（浏览器Web Speech API） |
| 故事生成 | 自动整理 | P0 | 基于对话内容生成结构化故事 |
| | 故事分段 | P0 | 自动识别故事章节和段落 |
| | 内容润色 | P1 | 自动优化故事文字表达 |
| 故事管理 | 故事列表 | P0 | 展示所有已创建的故事 |
| | 故事详情 | P0 | 查看完整故事内容和对话记录 |
| | 编辑功能 | P0 | 编辑和修改故事内容 |
| | 删除功能 | P0 | 删除不需要的故事 |
| 故事导出 | TXT导出 | P0 | 导出为纯文本格式 |
| | Markdown导出 | P0 | 导出为Markdown格式 |
| 设置功能 | AI模型配置 | P0 | 配置云服务API或本地大模型 |
| | 数据管理 | P1 | 查看数据存储路径 |
| | 主题设置 | P2 | 界面主题和语言设置 |

### 2.2 后续功能规划

| 功能模块 | 功能点 | 优先级 | 说明 |
|----------|--------|--------|------|
| 故事管理 | 故事搜索 | P2 | 通过关键词搜索故事 |
| | 故事分类 | P2 | 按主题或时间分类整理 |
| 故事导出 | PDF导出 | P2 | 导出为PDF格式 |
| | 批量导出 | P2 | 一次性导出多个故事 |
| 数据管理 | 数据备份 | P1 | 支持完整数据备份 |
| | 数据恢复 | P1 | 从备份文件恢复数据 |
| | 数据导入 | P1 | 从外部导入故事数据 |
| 故事主题 | 主题模板 | P2 | 提供预设的故事主题模板 |
| | 自定义主题 | P2 | 用户创建自己的故事主题 |
| 语音功能 | 语音播报 | P2 | AI语音播报生成的故事 |
| | 多语言支持 | P2 | 支持多种语言的对话 |

### 2.3 页面功能规划

| 页面 | 模块 | 功能 |
|------|------|------|
| 首页 | 故事概览 | 展示已创建故事列表 |
| | 快速开始 | 一键开始新故事对话 |
| | 推荐主题 | 展示故事主题卡片 |
| 对话页面 | AI对话 | 实时对话界面 |
| | 对话历史 | 查看当前对话记录 |
| | 语音输入 | 语音输入开关 |
| 故事管理页面 | 故事列表 | 所有故事的列表视图 |
| | 故事详情 | 完整故事内容展示 |
| | 编辑器 | 故事内容编辑 |
| 设置页面 | AI配置 | AI模型和API设置 |
| | 数据管理 | 存储路径和备份 |
| | 主题设置 | 个性化设置 |

---

## 3. 技术选型要点

### 3.1 技术栈总览

| 层级 | 技术 | 版本 | 说明 |
|------|------|------|------|
| 前端框架 | React | 18.0+ | 组件化开发，用户体验好 |
| 前端语言 | TypeScript | 5.0+ | 类型安全，可维护性高 |
| 前端样式 | Tailwind CSS | 3.0+ | 快速构建响应式界面 |
| 后端框架 | Express | 4.18+ | 轻量级Web框架 |
| 后端语言 | Node.js | 18.0+ | 高效的服务器运行环境 |
| 数据库 | SQLite | 3.0+ | 轻量级本地数据库 |
| AI服务 | OpenAI API | - | 云服务API |
| 本地AI | Ollama | - | 本地大模型运行工具 |
| 本地AI | LM Studio | - | 本地大模型运行工具 |
| 部署 | Docker | - | 容器化部署 |

### 3.2 前端技术选型

**React 18.0+**
- 理由：成熟的组件化框架，生态系统丰富，适合开发复杂交互应用
- 替代方案：Vue.js（更轻量，但社区生态较小）

**TypeScript 5.0+**
- 理由：提供类型检查，减少运行时错误，提升代码质量
- 替代方案：JavaScript（开发更快，但维护成本高）

**Tailwind CSS 3.0+**
- 理由：原子化CSS，快速构建自定义设计，减少CSS代码量
- 替代方案：Styled Components（更符合React开发习惯，但样式管理较分散）

### 3.3 后端技术选型

**Node.js 18.0+**
- 理由：高效的事件驱动模型，适合处理IO密集型任务，与前端技术栈统一
- 替代方案：Deno（更安全，但生态较小）

**Express 4.18+**
- 理由：简洁灵活，中间件机制强大，学习曲线平缓
- 替代方案：Fastify（性能更好，但社区较小）

**SQLite 3.0+**
- 理由：零配置，数据库就是一个文件，非常适合本地应用
- 替代方案：better-sqlite3（同步API，更简单）或 IndexedDB（前端存储，但功能较弱）

### 3.4 AI服务选型

**OpenAI API**
- 适用场景：需要高质量对话效果，用户愿意支付API费用
- 配置项：API Key、Endpoint、Model选择

**Ollama**
- 适用场景：用户希望在本地运行大模型，完全离线使用
- 配置项：API URL (默认 http://localhost:11434)、Model选择
- 支持模型：llama2、mistral、codellama等

**LM Studio**
- 适用场景：用户需要图形界面管理本地大模型
- 配置项：API URL、Model选择

### 3.5 部署方案选型

**Docker部署**
- 优点：一键部署，环境隔离，易于管理
- 适用用户：熟悉Docker的用户

**本地直接运行**
- 优点：资源占用更少，调试方便
- 适用用户：技术能力强，喜欢定制的用户

---

## 4. 管理项目依赖

### 4.1 前端依赖

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "axios": "^1.6.0",
    "zustand": "^4.4.0",
    "react-markdown": "^9.0.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "tailwindcss": "^3.3.0",
    "vite": "^5.0.0",
    "eslint": "^8.54.0"
  }
}
```

| 依赖 | 版本 | 用途 |
|------|------|------|
| react | ^18.2.0 | UI框架 |
| react-dom | ^18.2.0 | React DOM渲染 |
| react-router-dom | ^6.20.0 | 路由管理 |
| axios | ^1.6.0 | HTTP请求 |
| zustand | ^4.4.0 | 状态管理 |
| react-markdown | ^9.0.0 | Markdown渲染 |
| typescript | ^5.3.0 | 类型检查 |
| tailwindcss | ^3.3.0 | CSS框架 |
| vite | ^5.0.0 | 构建工具 |
| eslint | ^8.54.0 | 代码检查 |

### 4.2 后端依赖

```json
{
  "dependencies": {
    "express": "^4.18.0",
    "cors": "^2.8.5",
    "better-sqlite3": "^9.2.0",
    "dotenv": "^16.3.0",
    "openai": "^4.20.0",
    "axios": "^1.6.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "@types/express": "^4.17.0",
    "@types/cors": "^2.8.0",
    "@types/better-sqlite3": "^7.6.0",
    "tsx": "^4.6.0",
    "eslint": "^8.54.0",
    "nodemon": "^3.0.0"
  }
}
```

| 依赖 | 版本 | 用途 |
|------|------|------|
| express | ^4.18.0 | Web框架 |
| cors | ^2.8.5 | 跨域资源共享 |
| better-sqlite3 | ^9.2.0 | SQLite数据库 |
| dotenv | ^16.3.0 | 环境变量管理 |
| openai | ^4.20.0 | OpenAI API客户端 |
| axios | ^1.6.0 | HTTP请求 |
| tsx | ^4.6.0 | TypeScript执行 |
| nodemon | ^3.0.0 | 开发热重载 |

### 4.3 依赖管理规范

1. **版本锁定**：使用package-lock.json锁定依赖版本
2. **安全更新**：定期检查和更新依赖的安全补丁
3. **最小依赖**：避免引入不必要的依赖，保持项目轻量
4. **环境分离**：devDependencies仅用于开发环境

---

## 5. 服务配置管理

### 5.1 配置文件结构

```
项目根目录/
├── .env              # 环境变量配置
├── .env.example      # 环境变量示例
└── config/
    └── default.json  # 默认配置文件
```

### 5.2 环境变量配置

**前端环境变量 (.env)**
```env
VITE_API_BASE_URL=http://localhost:3001
VITE_APP_TITLE=人生故事记录AI
```

**后端环境变量 (.env)**
```env
PORT=3001
NODE_ENV=development

# AI服务配置
AI_PROVIDER=openai
OPENAI_API_KEY=your-api-key
OPENAI_API_ENDPOINT=https://api.openai.com/v1
OPENAI_MODEL=gpt-3.5-turbo

# 或使用本地大模型
OLLAMA_API_URL=http://localhost:11434
OLLAMA_MODEL=llama2

# 数据库配置
DATABASE_PATH=./data/stories.db
```

### 5.3 AI服务配置

**云服务API配置**

| 配置项 | 说明 | 示例 |
|--------|------|------|
| AI_PROVIDER | AI服务提供商 | openai / ollama / lmstudio |
| OPENAI_API_KEY | OpenAI API密钥 | sk-xxx |
| OPENAI_API_ENDPOINT | API端点 | https://api.openai.com/v1 |
| OPENAI_MODEL | 使用的模型 | gpt-4 / gpt-3.5-turbo |

**本地大模型配置**

| 工具 | 配置项 | 默认值 | 说明 |
|------|--------|--------|------|
| Ollama | OLLAMA_API_URL | http://localhost:11434 | Ollama服务地址 |
| | OLLAMA_MODEL | llama2 | 本地模型名称 |
| LM Studio | LMSTUDIO_API_URL | http://localhost:1234 | LM Studio服务地址 |
| | LMSTUDIO_MODEL | - | 本地模型名称 |

### 5.4 配置验证

系统启动时验证以下配置：
1. AI服务连接可用性
2. 数据库路径可访问
3. 必需的环境变量已设置

---

## 6. 文档建设

### 6.1 文档体系

| 文档 | 位置 | 说明 |
|------|------|------|
| README.md | 根目录 | 项目介绍、快速开始 |
| DEPLOY.md | 根目录 | 详细部署指南 |
| API.md | docs/ | API接口文档 |
| .env.example | 根目录 | 环境变量示例 |
| CONTRIBUTING.md | 根目录 | 开发贡献指南 |

### 6.2 README.md 内容大纲

```markdown
# 人生故事记录AI

## 特性

## 快速开始

### 前置要求

### 安装部署

### 配置说明

## 使用指南

## 开发指南

## 贡献指南

## 许可证
```

### 6.3 DEPLOY.md 内容大纲

```markdown
# 部署指南

## 部署方式

### Docker部署

### 本地部署

## 环境配置

## 数据存储

## 故障排除

## 常见问题
```

### 6.4 API.md 内容大纲

```markdown
# API接口文档

## 基础信息

## 故事管理

### 获取故事列表
### 获取故事详情
### 创建故事
### 更新故事
### 删除故事

## AI对话

### 发送消息
### 获取对话历史

## 导出功能

### 导出故事

## 设置

### 获取配置
### 更新配置
```

### 6.5 代码注释规范

```typescript
/**
 * 生成故事标题
 * @param content - 故事内容
 * @returns 生成的故事标题
 */
function generateTitle(content: string): string {
  // ...
}
```

---

## 7. 项目结构设计

### 7.1 整体目录结构

```
apstory/
├── frontend/                 # 前端项目
│   ├── src/
│   │   ├── components/       # React组件
│   │   ├── pages/            # 页面组件
│   │   ├── hooks/            # 自定义Hooks
│   │   ├── stores/            # 状态管理
│   │   ├── services/          # API服务
│   │   ├── types/             # TypeScript类型
│   │   ├── utils/             # 工具函数
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── tailwind.config.js
├── backend/                  # 后端项目
│   ├── src/
│   │   ├── routes/            # 路由
│   │   ├── controllers/       # 控制器
│   │   ├── services/          # 业务逻辑
│   │   ├── models/            # 数据模型
│   │   ├── middleware/        # 中间件
│   │   ├── config/            # 配置
│   │   ├── utils/             # 工具函数
│   │   └── index.ts
│   ├── data/                  # 数据存储
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
├── docker/                   # Docker配置
│   └── docker-compose.yml
├── docs/                     # 文档
├── prd.md                    # 产品需求文档
└── README.md
```

### 7.2 前端目录结构

```
frontend/src/
├── components/               # 可复用组件
│   ├── common/              # 通用组件
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Modal.tsx
│   ├── layout/              # 布局组件
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── Footer.tsx
│   ├── story/               # 故事相关组件
│   │   ├── StoryCard.tsx
│   │   ├── StoryList.tsx
│   │   └── StoryEditor.tsx
│   └── chat/                # 对话相关组件
│       ├── ChatWindow.tsx
│       ├── ChatMessage.tsx
│       └── ChatInput.tsx
├── pages/                   # 页面组件
│   ├── HomePage.tsx
│   ├── ChatPage.tsx
│   ├── StoryPage.tsx
│   ├── StoryDetailPage.tsx
│   └── SettingsPage.tsx
├── hooks/                   # 自定义Hooks
│   ├── useChat.ts
│   ├── useStory.ts
│   └── useSettings.ts
├── stores/                  # 状态管理
│   ├── chatStore.ts
│   ├── storyStore.ts
│   └── settingsStore.ts
├── services/                # API服务
│   ├── api.ts
│   ├── chatService.ts
│   └── storyService.ts
├── types/                   # TypeScript类型
│   ├── story.ts
│   ├── chat.ts
│   └── settings.ts
├── utils/                   # 工具函数
│   ├── format.ts
│   └── storage.ts
├── App.tsx
└── main.tsx
```

### 7.3 后端目录结构

```
backend/src/
├── routes/                  # 路由定义
│   ├── index.ts
│   ├── storyRoutes.ts
│   ├── chatRoutes.ts
│   └── settingsRoutes.ts
├── controllers/             # 控制器
│   ├── storyController.ts
│   ├── chatController.ts
│   └── settingsController.ts
├── services/                # 业务逻辑
│   ├── storyService.ts
│   ├── chatService.ts
│   └── aiService.ts
├── models/                  # 数据模型
│   ├── Story.ts
│   └── Conversation.ts
├── middleware/              # 中间件
│   ├── errorHandler.ts
│   └── cors.ts
├── config/                  # 配置
│   └── index.ts
├── utils/                   # 工具函数
│   └── database.ts
└── index.ts                 # 入口文件
```

### 7.4 数据库表结构

**stories表**
```sql
CREATE TABLE stories (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**conversations表**
```sql
CREATE TABLE conversations (
  id TEXT PRIMARY KEY,
  story_id TEXT NOT NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (story_id) REFERENCES stories(id)
);
```

---

## 8. 开发模板准备

### 8.1 前端项目模板

**初始化命令**
```bash
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**vite.config.ts配置**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
```

**tailwind.config.js配置**
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF8C42',
        secondary: '#4A90A4',
      },
    },
  },
  plugins: [],
}
```

### 8.2 后端项目模板

**初始化命令**
```bash
mkdir backend && cd backend
npm init -y
npm install express cors better-sqlite3 dotenv openai axios
npm install -D typescript @types/express @types/cors @types/better-sqlite3 tsx nodemon
npx tsc --init
```

**tsconfig.json配置**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

### 8.3 Docker配置模板

**docker-compose.yml**
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "3001:3001"
    volumes:
      - ./data:/app/data
    environment:
      - NODE_ENV=production
    depends_on:
      - ollama

  frontend:
    build: ./frontend
    ports:
      - "5173:80"
    depends_on:
      - backend

  ollama:
    image: ollama/ollama
    ports:
      - "11434:11434"
    volumes:
      - ollama_data:/root/.ollama

volumes:
  ollama_data:
```

### 8.4 开发工作流

**开发启动命令**

前端开发：
```bash
cd frontend
npm run dev
```

后端开发：
```bash
cd backend
npm run dev
```

**代码检查**
```bash
# 前端
npm run lint

# 后端
npm run lint
```

---

## 9. UI设计规范

### 9.1 设计原则

1. **简洁性**：界面简洁，聚焦核心功能，减少干扰
2. **一致性**：统一的视觉风格和交互模式
3. **可及性**：确保各种用户都能方便使用
4. **反馈性**：及时给用户提供操作反馈

### 9.2 色彩系统

**主色调**
| 颜色 | 色值 | 用途 |
|------|------|------|
| Primary | #FF8C42 | 主要按钮、强调元素 |
| Primary Dark | #E67A35 | 按钮悬停状态 |
| Primary Light | #FFB380 | 背景装饰 |

**辅助色**
| 颜色 | 色值 | 用途 |
|------|------|------|
| Secondary | #4A90A4 | 次要强调元素 |
| Secondary Dark | #3A7A8A | 辅助按钮悬停 |
| Secondary Light | #6BB0C4 | 辅助背景 |

**中性色**
| 颜色 | 色值 | 用途 |
|------|------|------|
| Background | #F5F5F5 | 页面背景 |
| Surface | #FFFFFF | 卡片、面板背景 |
| Text Primary | #333333 | 主要文字 |
| Text Secondary | #666666 | 次要文字 |
| Border | #E0E0E0 | 边框、分隔线 |

**语义色**
| 颜色 | 色值 | 用途 |
|------|------|------|
| Success | #4CAF50 | 成功状态 |
| Warning | #FFC107 | 警告状态 |
| Error | #F44336 | 错误状态 |
| Info | #2196F3 | 信息提示 |

### 9.3 字体系统

**字体族**
- 标题字体：无衬线字体 (Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)
- 正文字体：无衬线字体 (Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)
- 代码字体：等宽字体 ('Fira Code', 'Consolas', monospace)

**字体大小**
| 元素 | 大小 | 行高 |
|------|------|------|
| H1 | 32px | 1.2 |
| H2 | 24px | 1.3 |
| H3 | 20px | 1.4 |
| Body | 16px | 1.5 |
| Small | 14px | 1.5 |
| Caption | 12px | 1.4 |

**字体粗细**
| 名称 | 字重 | 用途 |
|------|------|------|
| Bold | 700 | 标题强调 |
| Semibold | 600 | 副标题 |
| Medium | 500 | 按钮文字 |
| Regular | 400 | 正文 |
| Light | 300 | 辅助文字 |

### 9.4 间距系统

**基础间距单位**：4px

| 名称 | 大小 | 用途 |
|------|------|------|
| xs | 4px | 紧凑间距 |
| sm | 8px | 小间距 |
| md | 16px | 标准间距 |
| lg | 24px | 大间距 |
| xl | 32px | 特大间距 |
| 2xl | 48px | 页面级间距 |

### 9.5 组件规范

**按钮**

| 类型 | 样式 | 用途 |
|------|------|------|
| Primary | 背景#FF8C42, 白色文字, 圆角8px | 主要操作 |
| Secondary | 边框#4A90A4, 蓝色文字, 圆角8px | 次要操作 |
| Ghost | 透明背景, 灰色文字 | 辅助操作 |
| Disabled | 背景#E0E0E0, 灰色文字 | 禁用状态 |

**按钮尺寸**
| 尺寸 | 内边距 | 字体大小 |
|------|--------|----------|
| Small | 8px 16px | 14px |
| Medium | 12px 24px | 16px |
| Large | 16px 32px | 18px |

**输入框**
- 边框：1px solid #E0E0E0
- 圆角：8px
- 内边距：12px 16px
- 聚焦边框：2px solid #FF8C42
- 错误边框：2px solid #F44336

**卡片**
- 背景：#FFFFFF
- 边框：1px solid #E0E0E0
- 圆角：12px
- 阴影：0 2px 8px rgba(0, 0, 0, 0.08)
- 内边距：16px 24px

### 9.6 响应式断点

| 断点 | 宽度 | 布局 |
|------|------|------|
| Mobile | < 640px | 单列，触摸优化 |
| Tablet | 640px - 1024px | 双列，适度间距 |
| Desktop | > 1024px | 多列，完整功能 |

### 9.7 动画规范

**过渡时长**
| 类型 | 时长 | 用途 |
|------|------|------|
| Fast | 150ms | 微交互、按钮反馈 |
| Normal | 250ms | 页面元素过渡 |
| Slow | 400ms | 页面切换 |

**缓动函数**
- 标准：ease-out (用于进入动画)
- 标准：ease-in (用于退出动画)
- 特殊：ease-in-out (用于状态变化)

### 9.8 图标规范

- 图标库：Lucide Icons
- 图标尺寸：16px (小)、20px (中)、24px (大)
- 图标颜色：跟随文字颜色或设置固定颜色
