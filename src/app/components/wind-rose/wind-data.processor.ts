import { WindData } from '../../types/wind.types';

export function processWindData(windData: WindData[], sectors: number): number[] {
  const sectorArrays: number[][] = Array(sectors).fill(0).map(() => []);
  const sectorSize = 360 / sectors;

  windData.forEach(point => {
    const sectorIndex = Math.floor(point.angle / sectorSize) % sectors;
    sectorArrays[sectorIndex].push(point.speed);
  });

  return sectorArrays.map(speeds =>
    speeds.length > 0
      ? speeds.reduce((sum, speed) => sum + speed, 0) / speeds.length
      : 0
  );
}