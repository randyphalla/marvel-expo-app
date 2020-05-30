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

export interface SeriesModel {}