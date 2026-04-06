import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header, Layout } from '@/components/layout';
import { HomePage, ChatPage, StoryPage, StoryDetailPage, SettingsPage } from '@/pages';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { I18nProvider } from '@/components/providers/I18nProvider';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <I18nProvider>
        <ThemeProvider>
          <Layout>
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/chat/:storyId" element={<ChatPage />} />
                <Route path="/stories" element={<StoryPage />} />
                <Route path="/stories/:id" element={<StoryDetailPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </main>
          </Layout>
        </ThemeProvider>
      </I18nProvider>
    </BrowserRouter>
  );
};

export default App;
