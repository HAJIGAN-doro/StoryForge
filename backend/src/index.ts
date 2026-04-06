import express from 'express';
import cors from 'cors';
import { config } from './config/index.js';
import { errorHandler } from './middleware/index.js';
import storyRoutes from './routes/storyRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
  res.json({
    name: 'Apstory API',
    version: '0.1.0',
    status: 'running',
  });
});

app.use('/api/stories', storyRoutes);
app.use('/api/chat', chatRoutes);

app.use((req, res) => {
  res.status(404).json({ error: { message: 'Not found', statusCode: 404 } });
});

app.use(errorHandler);

async function startServer() {
  try {
    const { initDatabase } = await import('./utils/database.js');
    await initDatabase();
    console.log('Database initialized');

    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
      console.log(`AI Provider: ${config.ai.provider}`);
      console.log(`Database: ${config.database.path}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

export default app;
