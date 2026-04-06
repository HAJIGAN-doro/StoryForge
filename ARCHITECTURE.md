# 项目架构文档

## 1. 项目概述

**项目名称**: Apstory - 人生故事记录AI
**项目定位**: 本地部署的个人工具，通过AI对话帮助用户记录人生故事
**技术栈**: React + TypeScript + Tailwind CSS (前端) | Node.js + Express + SQLite (后端)
**部署方式**: Docker / 本地运行

---

## 2. 目录结构

```
apstory/
├── frontend/                          # 前端项目
│   ├── src/
│   │   ├── components/               # React组件
│   │   │   ├── chat/                # 对话组件
│   │   │   │   ├── ChatInput.tsx    # 聊天输入框(支持语音)
│   │   │   │   ├── ChatMessage.tsx  # 消息气泡
│   │   │   │   └── ChatWindow.tsx   # 聊天窗口
│   │   │   ├── common/              # 通用组件
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   └── Modal.tsx
│   │   │   ├── layout/              # 布局组件
│   │   │   │   ├── Header.tsx
│   │   │   │   └── Layout.tsx
│   │   │   └── story/              # 故事组件
│   │   │       ├── StoryCard.tsx
│   │   │       ├── StoryEditor.tsx
│   │   │       └── StoryList.tsx
│   │   ├── hooks/                   # 自定义Hooks
│   │   │   ├── useChat.ts
│   │   │   ├── useSettings.ts
│   │   │   └── useStory.ts
│   │   ├── pages/                   # 页面组件
│   │   │   ├── ChatPage.tsx         # /chat/:storyId
│   │   │   ├── HomePage.tsx         # /
│   │   │   ├── SettingsPage.tsx     # /settings
│   │   │   ├── StoryDetailPage.tsx  # /stories/:id
│   │   │   └── StoryPage.tsx        # /stories
│   │   ├── services/                # API服务层
│   │   │   ├── api.ts              # Axios实例配置
│   │   │   ├── chatService.ts
│   │   │   └── storyService.ts
│   │   ├── stores/                  # Zustand状态管理
│   │   │   ├── chatStore.ts
│   │   │   ├── settingsStore.ts
│   │   │   └── storyStore.ts
│   │   ├── types/                   # TypeScript类型定义
│   │   │   ├── chat.ts
│   │   │   ├── settings.ts
│   │   │   └── story.ts
│   │   ├── utils/                   # 工具函数
│   │   │   ├── format.ts            # 日期格式化
│   │   │   └── helpers.ts           # 通用帮助函数
│   │   ├── App.tsx                  # 根组件
│   │   ├── main.tsx                 # 入口文件
│   │   └── index.css                # 全局样式
│   ├── package.json
│   ├── vite.config.ts               # Vite配置(含API代理)
│   ├── tailwind.config.js           # Tailwind主题配置
│   └── tsconfig.json
├── backend/                          # 后端项目
│   ├── src/
│   │   ├── config/
│   │   │   └── index.ts            # 环境配置
│   │   ├── controllers/             # 控制器
│   │   │   ├── chatController.ts
│   │   │   └── storyController.ts
│   │   ├── middleware/             # Express中间件
│   │   │   ├── cors.ts
│   │   │   └── errorHandler.ts
│   │   ├── models/                 # 数据模型
│   │   │   ├── Conversation.ts
│   │   │   └── Story.ts
│   │   ├── routes/                 # 路由定义
│   │   │   ├── chatRoutes.ts       # /api/chat/*
│   │   │   ├── index.ts            # /api
│   │   │   └── storyRoutes.ts     # /api/stories/*
│   │   ├── services/               # 业务逻辑
│   │   │   ├── aiService.ts        # AI对话服务
│   │   │   ├── chatService.ts
│   │   │   └── storyService.ts
│   │   ├── utils/                  # 工具函数
│   │   │   └── database.ts         # SQLite数据库
│   │   └── index.ts                # 入口文件
│   ├── data/                        # SQLite数据目录
│   ├── package.json
│   └── tsconfig.json
├── docker/                          # Docker配置
│   ├── docker-compose.yml
│   └── .env.example
├── docs/
│   └── API.md                       # API接口文档
├── prd.md                           # 产品需求文档
└── README.md                        # 项目说明文档
```

---

## 3. 页面路由

| 路径 | 组件 | 功能 |
|------|------|------|
| `/` | HomePage | 首页，故事列表，快速开始 |
| `/chat/:storyId` | ChatPage | AI对话页面 |
| `/chat/new` | ChatPage | 新建故事对话 |
| `/stories` | StoryPage | 故事管理列表 |
| `/stories/:id` | StoryDetailPage | 故事详情/编辑 |
| `/settings` | SettingsPage | AI配置/应用设置 |

---

## 4. API接口

### 后端端口: 3001

### 故事管理 `/api/stories`
| 方法 | 路径 | 功能 |
|------|------|------|
| GET | `/` | 获取故事列表 |
| GET | `/:id` | 获取故事详情 |
| POST | `/` | 创建故事 |
| PUT | `/:id` | 更新故事 |
| DELETE | `/:id` | 删除故事 |
| GET | `/:id/export` | 导出故事 |

### AI对话 `/api/chat`
| 方法 | 路径 | 功能 |
|------|------|------|
| GET | `/conversation/:storyId` | 获取对话历史 |
| POST | `/message/:storyId` | 发送消息 |
| POST | `/generate/:storyId` | 生成故事 |

---

## 5. 数据模型

### stories表
```sql
CREATE TABLE stories (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '无标题故事',
  content TEXT DEFAULT '',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### conversations表
```sql
CREATE TABLE conversations (
  id TEXT PRIMARY KEY,
  story_id TEXT NOT NULL,
  role TEXT NOT NULL,           -- 'user' | 'assistant' | 'system'
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (story_id) REFERENCES stories(id) ON DELETE CASCADE
);
```

---

## 6. AI服务配置

### 环境变量
```env
AI_PROVIDER=openai|ollama|lmstudio

# OpenAI
OPENAI_API_KEY=
OPENAI_API_ENDPOINT=https://api.openai.com/v1
OPENAI_MODEL=gpt-3.5-turbo

# Ollama
OLLAMA_API_URL=http://localhost:11434
OLLAMA_MODEL=llama2

# LM Studio
LMSTUDIO_API_URL=http://localhost:1234
LMSTUDIO_MODEL=
```

---

## 7. 状态管理 (Zustand)

### storyStore
- `stories: StoryListItem[]` - 故事列表
- `currentStory: Story | null` - 当前故事
- `fetchStories()` - 获取列表
- `fetchStory(id)` - 获取详情
- `createStory(title?)` - 创建故事
- `updateStory(id, title, content)` - 更新
- `deleteStory(id)` - 删除
- `exportStory(id, format)` - 导出

### chatStore
- `messages: ChatMessage[]` - 消息列表
- `isLoading` - 加载状态
- `sendMessage(storyId, content)` - 发送
- `loadConversation(storyId)` - 加载历史
- `generateStory(storyId)` - 生成故事

### settingsStore (持久化)
- `aiConfig` - AI配置
- `theme` - 主题
- `language` - 语言

---

## 8. 组件库

### 通用组件
- **Button** - variant(primary/secondary/ghost), size(sm/md/lg), isLoading
- **Input** - label, error, 支持所有原生属性
- **Modal** - isOpen, onClose, title

### 对话组件
- **ChatInput** - 文字输入 + 语音输入
- **ChatMessage** - 用户/AI消息气泡
- **ChatWindow** - 消息列表 + 加载动画

### 故事组件
- **StoryCard** - 故事卡片
- **StoryList** - 故事列表网格
- **StoryEditor** - Markdown编辑器/预览

---

## 9. 开发命令

### 前端
```bash
cd frontend
npm install
npm run dev      # 开发服务器 :5173
npm run build    # 构建
```

### 后端
```bash
cd backend
npm install
npm run dev      # 开发服务器 :3001
npm run build    # 构建
npm start        # 生产运行
```

---

## 10. Docker部署
```bash
cd docker
cp .env.example .env
# 编辑.env配置AI
docker-compose up -d
```
访问 http://localhost:5173

---

## 11. 后续开发要点

1. **AI对话优化** - 完善prompt，支持更多本地模型
2. **语音功能** - Web Speech API集成
3. **故事主题** - 预设引导问题模板
4. **数据备份** - 导入/导出完整数据
5. **PDF导出** - 添加PDF生成功能
