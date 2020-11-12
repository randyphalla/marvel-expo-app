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

export interface StoryOriginalIssue {
  name?: string;
  resourceURI?: string;
}

export interface StoriesModel {
  characters?: any;
  comics?: any;
  creators?: any;
  description?: any;
  events?: any;
  id: number;
  modified?: any;
  originalIssue?: StoryOriginalIssue;
  resourceURI?: any;
  series?: any;
  thumbnail?: any;
  title?: string;
  type?: string;
  name?: string;
}