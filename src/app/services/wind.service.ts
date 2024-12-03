import { Injectable } from '@angular/core';
import { WindData } from '../types/wind.types';

@Injectable({
  providedIn: 'root'
})
export class WindService {
  getWindData(points: number = 36): WindData[] {
    return Array.from({ length: points }, (_, i) => {
      const angle = (i * (360 / points)) % 360;
      const baseSpeed = 5 + Math.random() * 40;
      
      return {
        angle,
        speed: Math.round(baseSpeed * 10) / 10
      };
    });
  }
}