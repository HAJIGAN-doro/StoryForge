# AI接口文档

## 基础信息

- 基础URL: `http://localhost:3001/api`
- 所有请求的Content-Type: `application/json`

## 故事管理

### 获取故事列表

```
GET /stories
```

响应示例:
```json
[
  {
    "id": "lxyz123",
    "title": "我的童年",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
]
```

### 获取故事详情

```
GET /stories/:id
```

响应示例:
```json
{
  "id": "lxyz123",
  "title": "我的童年",
  "content": "# 我的童年\n\n这是一段关于...",
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z"
}
```

### 创建故事

```
POST /stories
```

请求体:
```json
{
  "title": "我的童年"
}
```

### 更新故事

```
PUT /stories/:id
```

请求体:
```json
{
  "title": "新的标题",
  "content": "新的内容..."
}
```

### 删除故事

```
DELETE /stories/:id
```

### 导出故事

```
GET /stories/:id/export?format=md
```

查询参数:
- `format`: `md` (默认) 或 `txt`

## AI对话

### 获取对话历史

```
GET /chat/conversation/:storyId
```

响应示例:
```json
[
  {
    "id": "msg123",
    "story_id": "lxyz123",
    "role": "user",
    "content": "我想讲讲我的童年...",
    "created_at": "2024-01-01T00:00:00.000Z"
  },
  {
    "id": "msg124",
    "story_id": "lxyz123",
    "role": "assistant",
    "content": "听起来很有趣！能否详细说说...",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
]
```

### 发送消息

```
POST /chat/message/:storyId
```

请求体:
```json
{
  "content": "我想讲讲我的童年..."
}
```

响应示例:
```json
{
  "message": {
    "id": "msg124",
    "story_id": "lxyz123",
    "role": "assistant",
    "content": "听起来很有趣！能否详细说说...",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

### 生成故事

```
POST /chat/generate/:storyId
```

根据对话历史生成结构化的故事内容。

响应示例:
```json
{
  "content": "# 我的童年\n\n## 开头\n\n那是..." }
```

## 错误响应

所有错误响应遵循以下格式:

```json
{
  "error": {
    "message": "错误描述",
    "statusCode": 404
  }
}
```

常见状态码:
- `400` - 请求参数错误
- `404` - 资源不存在
- `500` - 服务器内部错误
