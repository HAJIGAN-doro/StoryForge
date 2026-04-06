# StoryForge

> 人生故事记录AI - AI-Powered Life Story Recorder

[English](#english) | [中文](#中文)

---

## English

### StoryForge - AI-Powered Life Story Recorder

StoryForge is an intelligent application that uses AI to converse with users, helping them record and organize personal life stories.

### Features

- 🤖 **AI Conversation Guide** - AI guides you through recalling and sharing life stories
- 📝 **Intelligent Generation** - Automatically organizes conversation content into structured stories
- 🔒 **Local Deployment** - All data stored locally to protect privacy
- 🔧 **Flexible Configuration** - Supports cloud service APIs and local LLMs
- 📱 **Responsive Design** - Adapts to various devices

### Quick Start

#### Prerequisites

- Node.js 18+
- npm 9+
- (Optional) Docker
- (Optional) Ollama or LM Studio (for local LLMs)

#### Installation

##### Option 1: Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/storyforge.git
cd storyforge

# Install backend dependencies
cd backend
npm install
cp .env.example .env
# Edit .env with your AI configuration

# Install frontend dependencies
cd ../frontend
npm install
cp .env.example .env
# Edit .env with your API address

# Start backend (new terminal)
cd backend
npm run dev

# Start frontend (new terminal)
cd frontend
npm run dev
```

Visit http://localhost:5173

##### Option 2: Docker Deployment

```bash
cd docker
cp .env.example .env
# Edit .env with your AI configuration

docker-compose up -d
```

Visit http://localhost:5173

### AI Configuration

#### Using OpenAI API

Edit the `.env` file:

```env
AI_PROVIDER=openai
OPENAI_API_KEY=your-api-key
OPENAI_MODEL=gpt-3.5-turbo
```

#### Using Local LLM (Ollama)

1. Install [Ollama](https://ollama.ai/)
2. Pull model: `ollama pull llama2`
3. Start Ollama service: `ollama serve`

Edit the `.env` file:

```env
AI_PROVIDER=ollama
OLLAMA_API_URL=http://localhost:11434
OLLAMA_MODEL=llama2
```

#### Using LM Studio

1. Download [LM Studio](https://lmstudio.ai/)
2. Download a model
3. Start the local server

Edit the `.env` file:

```env
AI_PROVIDER=lmstudio
LMSTUDIO_API_URL=http://localhost:1234
LMSTUDIO_MODEL=your-model-name
```

### Usage Guide

1. **Start a New Story** - Click the "Start New Story" button on the homepage
2. **Chat with AI** - The AI will guide you through telling your story via text or voice input
3. **Generate Story** - After the conversation, AI will automatically organize and generate a structured story
4. **View and Edit** - View, edit, and export stories in the story management page

### Project Structure

```
storyforge/
├── frontend/          # Frontend (React + TypeScript)
├── backend/           # Backend (Node.js + Express)
├── docker/            # Docker configuration
└── docs/              # Documentation
```

### Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Zustand
- **Backend**: Node.js, Express, SQLite
- **AI**: OpenAI API, Ollama, LM Studio
- **Deployment**: Docker

### Development Guide

#### Frontend

```bash
cd frontend
npm install
npm run dev     # Development mode
npm run build   # Production build
npm run lint    # Linting
```

#### Backend

```bash
cd backend
npm install
npm run dev     # Development mode
npm run build   # Production build
npm start       # Run production
npm run lint    # Linting
```

### License

MIT

---

## 中文

# StoryForge

> 人生故事记录AI

StoryForge 是一款利用AI与用户对话，帮助用户记录、整理个人人生故事的智能应用。

### 特性

- 🤖 **AI对话引导** - 通过AI引导回忆和讲述人生故事
- 📝 **智能生成** - 自动整理对话内容生成结构化故事
- 🔒 **本地部署** - 数据完全存储在本地，保护隐私
- 🔧 **灵活配置** - 支持云服务API和本地大模型
- 📱 **响应式设计** - 适配各种设备

### 快速开始

#### 前置要求

- Node.js 18+
- npm 9+
- (可选) Docker
- (可选) Ollama 或 LM Studio (用于本地大模型)

#### 安装部署

##### 方式一：本地开发

```bash
# 克隆项目
git clone https://github.com/yourusername/storyforge.git
cd storyforge

# 安装后端依赖
cd backend
npm install
cp .env.example .env
# 编辑 .env 填入你的AI配置

# 安装前端依赖
cd ../frontend
npm install
cp .env.example .env
# 编辑 .env 填入API地址

# 启动后端 (新终端)
cd backend
npm run dev

# 启动前端 (新终端)
cd frontend
npm run dev
```

访问 http://localhost:5173

##### 方式二：Docker部署

```bash
cd docker
cp .env.example .env
# 编辑 .env 填入你的AI配置

docker-compose up -d
```

访问 http://localhost:5173

### AI配置

#### 使用OpenAI API

编辑 `.env` 文件：

```env
AI_PROVIDER=openai
OPENAI_API_KEY=your-api-key
OPENAI_MODEL=gpt-3.5-turbo
```

#### 使用本地大模型 (Ollama)

1. 安装 [Ollama](https://ollama.ai/)
2. 拉取模型：`ollama pull llama2`
3. 启动Ollama服务：`ollama serve`

编辑 `.env` 文件：

```env
AI_PROVIDER=ollama
OLLAMA_API_URL=http://localhost:11434
OLLAMA_MODEL=llama2
```

#### 使用LM Studio

1. 下载 [LM Studio](https://lmstudio.ai/)
2. 下载模型
3. 启动本地服务器

编辑 `.env` 文件：

```env
AI_PROVIDER=lmstudio
LMSTUDIO_API_URL=http://localhost:1234
LMSTUDIO_MODEL=your-model-name
```

### 使用指南

1. **开始新故事** - 点击首页的"开始新故事"按钮
2. **与AI对话** - AI会引导你讲述故事，通过文字或语音输入
3. **生成故事** - 完成对话后，AI会自动整理生成结构化故事
4. **查看编辑** - 在故事管理页面查看、编辑和导出故事

### 项目结构

```
storyforge/
├── frontend/          # 前端项目 (React + TypeScript)
├── backend/           # 后端项目 (Node.js + Express)
├── docker/            # Docker配置
└── docs/              # 文档
```

### 技术栈

- **前端**: React, TypeScript, Tailwind CSS, Zustand
- **后端**: Node.js, Express, SQLite
- **AI**: OpenAI API, Ollama, LM Studio
- **部署**: Docker

### 开发指南

#### 前端

```bash
cd frontend
npm install
npm run dev     # 开发模式
npm run build   # 构建生产版本
npm run lint    # 代码检查
```

#### 后端

```bash
cd backend
npm install
npm run dev     # 开发模式
npm run build   # 构建生产版本
npm start       # 运行生产版本
npm run lint    # 代码检查
```

### 许可证

MIT
