import { EventList } from "./EventsModel";
import { StoryList } from "./StoriesModel";
import { CharacterList } from "./CharacterModel";
import { ComicPrice, ComicDate, ComicSummary } from "./ComicsModel";
import { SeriesSummary } from "./SeriesModel";

export interface CreatorList {
  available: number;
  returned: number;
  collectionURI: string;
  items: CreatorSummary[];
}

export interface CreatorSummary {
  resourceURI: string;
  name: string;
  role: string;
}

export interface Url {
  type: string;
  url: string;
}

export interface Thumbnail {
  extension: string;
  path: string
}

export interface CreatorModel {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: number;
  variantDescription: string;
  description: string;
  modified: Date;
  isbn: string;
  upc: string;
  diamondCode: string;
  issn: string;
  ean: string;
  format: string;
  pageCount: number;
  textObjects: any;
  resourceURI: string;
  urls: Url;
  series: SeriesSummary;
  variants: ComicSummary;
  collections: ComicSummary;
  collectedIssues: ComicSummary;
  dates: ComicDate;
  prices: ComicPrice;
  thumbnail: Thumbnail;
  images: Thumbnail[];
  creators: CreatorList;
  characters: CharacterList;
  stories: StoryList
  events: EventList;

  firstName: string;
  fullName: string;
  lastName: string;
  middleName: string;
}