export interface Story {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface StoryListItem {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStoryRequest {
  title?: string;
}

export interface UpdateStoryRequest {
  title?: string;
  content?: string;
}
