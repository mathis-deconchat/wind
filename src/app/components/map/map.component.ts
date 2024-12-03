import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { PRESET_LOCATIONS } from '../../data/locations.data';
import { MapService } from '../../services/map.service';
import { Zone } from '../../types/location.type';
import { CoordinatePointerComponent } from '../coordinate-pointer/coordinate-pointer.component';
import { LocationSelectorComponent } from '../location-selector/location-selector.component';
import { WindDirectionLinesComponent } from '../wind-direction-lines/wind-direction-lines.component';
import { WindRoseComponent } from '../wind-rose/wind-rose.component';
import { MapControlComponent } from './components/map-control/map-control.component';

interface MapState {
  zoom: number;
  lng: number;
  lat: number;
  showCoordinates: boolean;
  showDirectionLines: boolean;
  isPointerVisible: boolean;
  pointerPosition: { x: number; y: number };
}

interface WindRoseMarker {
  marker: mapboxgl.Marker;
  container: ElementRef<HTMLElement>;
}

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    CommonModule,
    WindRoseComponent,
    MapControlComponent,
    LocationSelectorComponent,
    CoordinatePointerComponent,
    WindDirectionLinesComponent
  ],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map') private mapContainer!: ElementRef<HTMLElement>;
  @ViewChild('mapContainer') private containerRef!: ElementRef<HTMLElement>;
  @ViewChildren('windRoseContainer') private windRoseContainers!: QueryList<ElementRef<HTMLElement>>; // Array with query list

  private map?: mapboxgl.Map;
  private windRoseMarkers: WindRoseMarker[] = [];
  private readonly NUMBER_OF_WIND_ROSES = 3;

  protected readonly locations = PRESET_LOCATIONS;
  protected selectedLocation: Zone = PRESET_LOCATIONS[0];
  protected windRoseIndices = Array.from(
    { length: this.selectedLocation.locations?.length ?? 0 },
    (_, i) => i
  );

  protected mapState: MapState = {
    zoom: 15,
    lng: 0,
    lat: 0,
    showCoordinates: false,
    showDirectionLines: false,
    isPointerVisible: false,
    pointerPosition: { x: 0, y: 0 }
  };

  protected containerDimensions = {
    width: 0,
    height: 0
  };

  protected chartPositions: Array<{ x: number; y: number }> = [];

  constructor(private mapService: MapService) { }

  @HostListener('window:resize')
  protected onResize(): void {
    this.updateContainerDimensions();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initializeMap();
    });
  }

  protected onLocationSelected(location: Zone): void {
    this.goToLocation(location);
  }

  protected goToLocation(location: Zone): void {
    this.selectedLocation = location;

    // Always initialize with 3 wind roses
    this.windRoseIndices = Array.from(
      { length: this.NUMBER_OF_WIND_ROSES },
      (_, i) => i
    );

    this.map?.flyTo({
      center: location.coordinates,
      zoom: location.zoom,
      duration: 2000
    });

    setTimeout(() => {
      this.initializeWindRoseMarkers();
      this.updateChartPositions();
    }, 2100);
  }

  private initializeMap(): void {
    this.updateContainerDimensions();
    this.map = this.mapService.initializeMap(this.mapContainer.nativeElement);
    this.initializeMapEvents();
    this.initializeWindRoseMarkers();
  }

  private initializeMapEvents(): void {
    if (!this.map) return;

    this.map.on('mousemove', (e) => {
      this.mapState = {
        ...this.mapState,
        isPointerVisible: true,
        pointerPosition: { x: e.point.x, y: e.point.y },
        lng: e.lngLat.lng,
        lat: e.lngLat.lat
      };
    });

    this.map.on('mouseout', () => {
      this.mapState = {
        ...this.mapState,
        isPointerVisible: false
      };
    });

    this.map.on('zoom', () => {
      if (!this.map) return;
      this.mapState.zoom = Math.round(this.map.getZoom());
      this.updateChartPositions();
    });

    this.map.on('move', () => this.updateChartPositions());
  }

  protected addWindRose(): void {
    if (!this.selectedLocation.locations) return;

    const currentLength = this.windRoseIndices.length;
    if (currentLength < this.selectedLocation.locations.length) {
      this.windRoseIndices.push(currentLength);

      setTimeout(() => {
        const containers = this.windRoseContainers.toArray();
        const newContainer = containers[containers.length - 1];
        const location = this.selectedLocation.locations![currentLength];

        if (newContainer && this.map && location) {
          const newMarker = this.createWindRoseMarker(
            newContainer,
            location.coordinates
          );

          this.windRoseMarkers.push(newMarker);
          this.updateChartPositions();
        }
      });
    }
  }

  protected removeWindRose(): void {
    if (this.windRoseIndices.length <= 1) return;

    const lastMarker = this.windRoseMarkers.pop();
    lastMarker?.marker.remove();
    this.windRoseIndices.pop();
    this.updateChartPositions();
  }

  protected initializeWindRoseMarkers(): void {
    if (!this.map) return;

    // Clear existing markers
    this.windRoseMarkers.forEach(({ marker }) => marker.remove());
    this.windRoseMarkers = [];

    // Create a wind rose for each location in the zone
    if (this.selectedLocation.locations) {
      this.selectedLocation.locations.forEach((location, index) => {
        const container = this.windRoseContainers.get(index);
        if (container) {
          this.windRoseMarkers.push(
            this.createWindRoseMarker(
              container,
              location.coordinates
            )
          );
        }
      });
    }

    this.updateChartPositions();
  }

  private createWindRoseMarker(
    container: ElementRef<HTMLElement>,
    coordinates: [number, number]
  ): WindRoseMarker {
    if (!this.map) throw new Error('Map not initialized');

    const marker = new mapboxgl.Marker({
      element: container.nativeElement,
      anchor: 'center'
    })
      .setLngLat(coordinates)
      .addTo(this.map);

    return { marker, container };
  }

  private updateContainerDimensions(): void {
    if (!this.containerRef?.nativeElement) return;

    const rect = this.containerRef.nativeElement.getBoundingClientRect();
    this.containerDimensions = {
      width: rect.width,
      height: rect.height
    };
    this.updateChartPositions();
  }

  private updateMarkersPosition(location: Zone): void {
    if (!location.locations?.length) return;

    this.windRoseMarkers.forEach((markerData, index) => {
      const locationPoint = location.locations![index];
      if (locationPoint) {
        markerData.marker.setLngLat(locationPoint.coordinates);
      }
    });
  }

  private updateChartPositions(): void {
    if (!this.map) return;

    this.chartPositions = this.windRoseMarkers.map(({ marker }) => {
      const pos = this.map!.project(marker.getLngLat());
      return { x: pos.x, y: pos.y };
    });
  }

  protected resetView(): void {
    if (!this.map) return;
    this.goToLocation(this.locations[0]);
  }

  protected toggleWindRose(): void {
    if (this.windRoseIndices.length > 1) {
      this.removeWindRose();
    } else {
      this.addWindRose();
    }
  }

  protected toggleDirectionLines(show: boolean): void {
    this.mapState = {
      ...this.mapState,
      showDirectionLines: show
    };
  }

  protected toggleCoordinates(show: boolean): void {
    this.mapState = {
      ...this.mapState,
      showCoordinates: show
    };
  }

  ngOnDestroy(): void {
    this.windRoseMarkers.forEach(({ marker }) => marker.remove());
    this.mapService.destroyMap();
  }
}