import { getDatabase, saveDatabase, generateId, Story } from '../utils/database.js';

export const storyModel = {
  getAll(): Omit<Story, 'content'>[] {
    const db = getDatabase();
    const stmt = db.prepare(`
      SELECT id, title, created_at, updated_at
      FROM stories
      ORDER BY updated_at DESC
    `);
    const results: Omit<Story, 'content'>[] = [];
    while (stmt.step()) {
      results.push(stmt.getAsObject() as Omit<Story, 'content'>);
    }
    stmt.free();
    return results;
  },

  getById(id: string): Story | undefined {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM stories WHERE id = ?');
    stmt.bind([id]);
    let result: Story | undefined;
    if (stmt.step()) {
      result = stmt.getAsObject() as Story;
    }
    stmt.free();
    return result;
  },

  create(title?: string): Story {
    const db = getDatabase();
    const id = generateId();
    const now = new Date().toISOString();
    const storyTitle = title || '无标题故事';

    db.run(
      `INSERT INTO stories (id, title, content, created_at, updated_at) VALUES (?, ?, '', ?, ?)`,
      [id, storyTitle, now, now]
    );
    saveDatabase();

    return {
      id,
      title: storyTitle,
      content: '',
      created_at: now,
      updated_at: now,
    };
  },

  update(id: string, title: string, content: string): Story | undefined {
    const db = getDatabase();
    const now = new Date().toISOString();
    db.run(
      `UPDATE stories SET title = ?, content = ?, updated_at = ? WHERE id = ?`,
      [title, content, now, id]
    );
    saveDatabase();
    return this.getById(id);
  },

  delete(id: string): boolean {
    const db = getDatabase();
    db.run('DELETE FROM conversations WHERE story_id = ?', [id]);
    db.run('DELETE FROM stories WHERE id = ?', [id]);
    saveDatabase();
    return true;
  },
};
