
// https://app.quicktype.io/
// https://docs.mapbox.com/playground/geocoding/

// token aqui es antiguo cambia
// https://api.mapbox.com/geocoding/v5/mapbox.places/bodega.json?proximity=-77.0428%2C-12.0464&language=es&access_token=pk.eyJ1IjoidGhvbXJvbWFuIiwiYSI6ImNrenQyd2Z2MDAzOHIycm54dmtnNzZrNTgifQ.KvNmWDwDTyBFQvTBMi-pHQ

export interface PlacesResponse {
  type:        string;
  query:       string[];
  features:    Feature[];
  attribution: string;
}

export interface Feature {
  id:            string;
  type:          string;
  place_type:    string[];
  relevance:     number;
  properties:    Properties;
  text_es:       string;
  place_name_es: string;
  text:          string;
  place_name:    string;
  center:        number[];
  geometry:      Geometry;
  context:       Context[];
}

export interface Context {
  id:           string;
  text_es:      string;
  text:         string;
  wikidata?:    Wikidata;
  language_es?: Language;
  language?:    Language;
  short_code?:  ShortCode;
}

export enum Language {
  Es = "es",
}

export enum ShortCode {
  PE = "pe",
  PELma = "PE-LMA",
}

export enum Wikidata {
  Q2868 = "Q2868",
  Q419 = "Q419",
  Q579240 = "Q579240",
}

export interface Geometry {
  coordinates: number[];
  type:        string;
}

export interface Properties {
  foursquare: string;
  landmark:   boolean;
  category:   string;
  address?:   string;
}