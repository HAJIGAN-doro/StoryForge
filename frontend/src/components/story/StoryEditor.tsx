import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface StoryEditorProps {
  initialTitle?: string;
  initialContent?: string;
  onSave: (title: string, content: string) => void;
  onCancel?: () => void;
  isSaving?: boolean;
}

export const StoryEditor: React.FC<StoryEditorProps> = ({
  initialTitle = '',
  initialContent = '',
  onSave,
  onCancel,
  isSaving = false,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [isPreview, setIsPreview] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(title, content);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-1">标题</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 border border-border rounded-btn focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none"
          placeholder="输入故事标题..."
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-sm font-medium text-text-primary">内容</label>
          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className="text-sm text-secondary hover:text-secondary-dark"
          >
            {isPreview ? '编辑' : '预览'}
          </button>
        </div>
        {isPreview ? (
          <div className="w-full px-4 py-3 border border-border rounded-btn min-h-[300px] bg-gray-50 prose">
            <ReactMarkdown>{content || '*暂无内容*'}</ReactMarkdown>
          </div>
        ) : (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-btn focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none min-h-[300px] resize-y"
            placeholder="输入故事内容..."
          />
        )}
      </div>

      <div className="flex items-center gap-4 pt-4">
        <button
          type="submit"
          disabled={isSaving}
          className="px-6 py-3 bg-primary text-white rounded-btn hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSaving ? '保存中...' : '保存故事'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-border text-text-secondary rounded-btn hover:bg-gray-100 transition-colors"
          >
            取消
          </button>
        )}
      </div>
    </form>
  );
};
