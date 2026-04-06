import { getDatabase, saveDatabase, generateId, Conversation } from '../utils/database.js';

export const conversationModel = {
  getByStoryId(storyId: string): Conversation[] {
    const db = getDatabase();
    const stmt = db.prepare(`
      SELECT * FROM conversations
      WHERE story_id = ?
      ORDER BY created_at ASC
    `);
    stmt.bind([storyId]);
    const results: Conversation[] = [];
    while (stmt.step()) {
      results.push(stmt.getAsObject() as Conversation);
    }
    stmt.free();
    return results;
  },

  create(storyId: string, role: 'user' | 'assistant', content: string): Conversation {
    const db = getDatabase();
    const id = generateId();
    const now = new Date().toISOString();

    db.run(
      `INSERT INTO conversations (id, story_id, role, content, created_at) VALUES (?, ?, ?, ?, ?)`,
      [id, storyId, role, content, now]
    );
    saveDatabase();

    return {
      id,
      story_id: storyId,
      role,
      content,
      created_at: now,
    };
  },

  deleteByStoryId(storyId: string): boolean {
    const db = getDatabase();
    db.run('DELETE FROM conversations WHERE story_id = ?', [storyId]);
    saveDatabase();
    return true;
  },
};
