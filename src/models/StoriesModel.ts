export interface StoryList {
  available: number;
  returned: number;
  collectionURI: number;
  items: StorySummary[]
}

export interface StorySummary {
  resourceURI: string; 
  name: string;
  type: string;
}

export interface StoryModel {}