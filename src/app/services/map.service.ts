import { Injectable } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { PRESET_LOCATIONS } from '../data/locations.data';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private mapInstance = new BehaviorSubject<mapboxgl.Map | null>(null);
  map = this.mapInstance.asObservable();


  initializeMap(container: HTMLElement): mapboxgl.Map {
    const map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container,
      style: environment.mapbox.style,
      center: PRESET_LOCATIONS[0].coordinates,
      zoom: environment.mapbox.defaultZoom,
      minZoom: environment.mapbox.minZoom,
      maxZoom: environment.mapbox.maxZoom,
      attributionControl: false

    });

    map.on('error', (e) => {
      console.error('Mapbox error:', e);
    });

    map.on('load', () => {
      this.mapInstance.next(map);
    });

    return map;
  }

  getCurrentMap(): mapboxgl.Map | null {
    return this.mapInstance.getValue();
  }

  centerMap(coordinates: [number, number], zoom: number = 15) {
    const map = this.mapInstance.getValue();
    if (map) {
      map.flyTo({
        center: coordinates,
        zoom,
        duration: 2000
      });
    }
  }

  destroyMap() {
    const map = this.mapInstance.getValue();
    if (map) {
      map.remove();
      this.mapInstance.next(null);
    }
  }
}