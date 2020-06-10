import { Image, ComicList, ComicSummary } from "./ComicsModel";
import { EventList } from "./EventsModel";
import { CharacterList } from "./CharacterModel";
import { CreatorList } from "./CreatorsModel";

export interface SeriesList {
  available: number;
  returned: number;
  collectionURI: number;
  items: SeriesSummary[]
}

export interface SeriesSummary {
  resourceURI: string;
  name: string;
}

export interface SeriesModel {
  id: number;
  title: string;
  description: string;
  resourceURI: string;
  type: string;
  modified: Date;
  thumbnail: Image;
  comics: ComicList;
  series: SeriesList;
  events: EventList;
  characters: CharacterList;
  creators: CreatorList;
  originalissue: ComicSummary;
}