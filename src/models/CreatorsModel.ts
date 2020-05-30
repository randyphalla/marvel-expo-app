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

export interface CreatorModel {

}