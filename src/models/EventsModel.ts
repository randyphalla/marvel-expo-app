import { Url, CreatorList } from "./CreatorsModel";
import { Image, ComicList } from "./ComicsModel";
import { SeriesList } from "./SeriesModel";
import { StoryList } from "./StoriesModel";
import { CharacterList } from "./CharacterModel";

export interface EventList {
  available: number;
  returned: number;
  collectionURI: string;
  items: EventSummary[];
}

export interface EventSummary {
  resourceURI: string;
  name: string;
}

export interface EventsModel {
  id: number;
  title: string;
  description: string;
  resourceURI: string;
  urls: Url[];
  modified: Date;
  start: Date;
  end: Date;
  thumbnail: Image;
  comics: ComicList;
  stories: StoryList;
  series: SeriesList;
  characters: CharacterList;
  creators: CreatorList;
  next: EventSummary;
  previous: EventSummary;
}