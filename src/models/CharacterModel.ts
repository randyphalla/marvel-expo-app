import { ComicList } from "./ComicsModel";
import { StoryList } from "./StoriesModel";
import { EventList } from "./EventsModel";
import { SeriesList } from "./SeriesModel";

export interface Thumbnail {
  extension: string;
  path: string;
}

export interface URLs {
  type: string;
  url: string;
}

export interface CharacterList {
  available: number;
  returned: number;
  collectionURI: string;
  items: CharacterSummary[];
}

export interface CharacterSummary {
  resourceURI: string;
  name: string;
  role: string;
}

export interface CharacterModel {
  id: number;
  name: string;
  description: string;
  modified: Date;
  resourceURI: string;
  urls: URLs;
  thumbnail: Thumbnail;
  comics: ComicList[];
  stories: StoryList[];
  events: EventList[];
  series: SeriesList[];
}
