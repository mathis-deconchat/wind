export interface Location {
  name: string;
  coordinates: [number, number];
  zoom: number;
  radius?: number;
}

export interface Zone extends Location {
  locations?: LocationPoint[];
}

export interface LocationPoint {
  name: string;
  coordinates: [number, number];
  zoneId: string;
}