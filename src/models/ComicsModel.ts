
import { CreatorList } from "./CreatorsModel";
import { SeriesSummary } from "./SeriesModel";
import { CharacterList } from "./CharacterModel";
import { StoryList } from "./StoriesModel";
import { EventList } from "./EventsModel";

export interface ComicDate {
  type: string;
  date: Date;
}

export interface ComicPrice {
  type: string;
  price: number;
}

export interface Image {
  path: string;
  extension: string;
}

export interface Thumbnail {
  path: string;
  extension: string;
}

export interface ComicList {
  available: number;
  returned: number;
  collectionURI: string;
  items: ComicSummary[];
}

export interface ComicSummary {
  resourceURI: string;
  name: string;
}

export interface ComicModel {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: string;
  variantDescription: string;
  description: string;
  modified: string;
  isbn: string;
  issn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  format: string;
  pageCount: number;
  textObjects: string[];
  resourceURI: string;
  urls: string[];
  series: SeriesSummary;
  variants: ComicSummary[];
  collections: ComicSummary[];
  collectedIssues: ComicSummary[];
  dates: ComicDate[];
  prices: ComicPrice[];
  thumbnail: Thumbnail;
  images: Image[];
  creators: CreatorList[];
  characters: CharacterList[];
  stories: StoryList[];
  events: EventList[];
}