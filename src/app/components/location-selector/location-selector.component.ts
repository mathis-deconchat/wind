import { Component, EventEmitter, Output } from '@angular/core';
import { PRESET_LOCATIONS } from '../../data/locations.data';
import { Zone } from '../../types/location.type';

@Component({
  selector: 'app-location-selector',
  standalone: true,
  templateUrl: './location-selector.component.html'
})
export class LocationSelectorComponent {
  @Output() locationSelected = new EventEmitter<Zone>();

  readonly locations = PRESET_LOCATIONS;

  selectLocation(location: Zone): void {
    this.locationSelected.emit(location);
  }
}