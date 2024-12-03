export interface WindData {
  angle: number;  // Angle in degrees (0-360, 0 = North, clockwise)
  speed: number;  // Wind speed in km/h
}

export interface WindRoseConfig {
  zoom: number;
  showDot?: boolean;
}