import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, PageHeader } from '@/components/layout';
import { Input, Button } from '@/components/common';
import { useSettings } from '@/hooks';
import { useStoryStore } from '@/stores';
import { downloadFile } from '@/utils/helpers';
import type { AIProvider } from '@/types';

export const SettingsPage: React.FC = () => {
  const { t } = useTranslation();
  const { aiConfig, updateAIConfig, setProvider, theme, setTheme, language, setLanguage } = useSettings();
  const stories = useStoryStore((state) => state.stories);
  const [isExporting, setIsExporting] = useState(false);

  const handleProviderChange = (provider: AIProvider) => {
    setProvider(provider);
  };

  const handleSaveConfig = () => {
    const config = {
      ...aiConfig,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem('apstory-ai-config', JSON.stringify(config));
    alert(t('settings.configSaved'));
  };

  const handleExportData = () => {
    setIsExporting(true);
    try {
      const exportData = {
        version: '1.0',
        exportedAt: new Date().toISOString(),
        stories: stories,
        settings: {
          aiConfig,
          theme,
          language,
        },
      };
      const filename = `apstory-export-${new Date().toISOString().split('T')[0]}.json`;
      downloadFile(JSON.stringify(exportData, null, 2), filename, 'application/json');
      alert(t('settings.exportSuccess'));
    } catch (error) {
      alert(t('common.error'));
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Container>
      <PageHeader
        title={t('settings.title')}
        subtitle={t('settings.subtitle')}
      />

      <div className="space-y-6">
        <div className="bg-surface-light dark:bg-surface-dark rounded-card shadow-card p-6 transition-colors duration-300">
          <h2 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark mb-4">{t('settings.aiConfig')}</h2>

          <div className="mb-6">
            <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-2">{t('settings.aiProvider')}</label>
            <div className="flex gap-4">
              {[
                { value: 'openai', label: t('settings.openai') },
                { value: 'ollama', label: t('settings.ollama') },
                { value: 'lmstudio', label: t('settings.lmstudio') },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleProviderChange(option.value as AIProvider)}
                  className={`px-4 py-2 rounded-btn border transition-all ${
                    aiConfig.provider === option.value
                      ? 'border-primary bg-primary bg-opacity-10 text-primary'
                      : 'border-border-light dark:border-border-dark text-text-secondary-light dark:text-text-secondary-dark hover:border-primary'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {aiConfig.provider === 'openai' && (
            <>
              <div className="mb-4">
                <Input
                  label={t('settings.apiKey')}
                  type="password"
                  value={aiConfig.apiKey || undefined}
                  onChange={(e) => updateAIConfig({ apiKey: e.target.value })}
                  placeholder="sk-..."
                />
              </div>
              <div className="mb-4">
                <Input
                  label={t('settings.apiEndpoint')}
                  value={aiConfig.apiUrl || undefined}
                  onChange={(e) => updateAIConfig({ apiUrl: e.target.value })}
                  placeholder="https://api.openai.com/v1"
                />
              </div>
              <div className="mb-4">
                <Input
                  label={t('settings.model')}
                  value={aiConfig.model || undefined}
                  onChange={(e) => updateAIConfig({ model: e.target.value })}
                  placeholder="gpt-3.5-turbo"
                />
              </div>
            </>
          )}

          {(aiConfig.provider === 'ollama' || aiConfig.provider === 'lmstudio') && (
            <>
              <div className="mb-4">
                <Input
                  label={t('settings.apiUrl')}
                  value={aiConfig.apiUrl || undefined}
                  onChange={(e) => updateAIConfig({ apiUrl: e.target.value })}
                  placeholder={aiConfig.provider === 'ollama' ? 'http://localhost:11434' : 'http://localhost:1234'}
                />
              </div>
              <div className="mb-4">
                <Input
                  label={t('settings.modelName')}
                  value={aiConfig.model || undefined}
                  onChange={(e) => updateAIConfig({ model: e.target.value })}
                  placeholder={aiConfig.provider === 'ollama' ? 'llama2' : ''}
                />
              </div>
            </>
          )}

          <Button onClick={handleSaveConfig}>
            {t('settings.saveConfig')}
          </Button>
        </div>

        <div className="bg-surface-light dark:bg-surface-dark rounded-card shadow-card p-6 transition-colors duration-300">
          <h2 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark mb-4">{t('settings.appSettings')}</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-2">{t('settings.theme')}</label>
            <div className="flex gap-4">
              <button
                onClick={() => setTheme('light')}
                className={`px-4 py-2 rounded-btn border transition-all ${
                  theme === 'light'
                    ? 'border-primary bg-primary bg-opacity-10 text-primary'
                    : 'border-border-light dark:border-border-dark text-text-secondary-light dark:text-text-secondary-dark hover:border-primary'
                }`}
              >
                {t('settings.light')}
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`px-4 py-2 rounded-btn border transition-all ${
                  theme === 'dark'
                    ? 'border-primary bg-primary bg-opacity-10 text-primary'
                    : 'border-border-light dark:border-border-dark text-text-secondary-light dark:text-text-secondary-dark hover:border-primary'
                }`}
              >
                {t('settings.dark')}
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-2">{t('settings.language')}</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-3 border border-border-light dark:border-border-dark rounded-btn focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none bg-surface-light dark:bg-surface-dark text-text-primary-light dark:text-text-primary-dark transition-colors duration-300"
            >
              <option value="zh-CN">简体中文</option>
              <option value="zh-TW">繁體中文</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>

        <div className="bg-surface-light dark:bg-surface-dark rounded-card shadow-card p-6 transition-colors duration-300">
          <h2 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark mb-4">{t('settings.dataManagement')}</h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4">
            {t('settings.dataManagementDesc')}
          </p>
          <Button variant="secondary" onClick={handleExportData} isLoading={isExporting}>
            {t('settings.exportData')}
          </Button>
        </div>
      </div>
    </Container>
  );
};
