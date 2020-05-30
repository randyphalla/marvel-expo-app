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

export interface EventModel {}