import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MapComponent } from '../components/map/map.component';
import { WindRoseComponent } from '../components/wind-rose/wind-rose.component';

export enum ViewTab {
  Map = 'map',
  Rose = 'rose'
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MapComponent, WindRoseComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  readonly ViewTab = ViewTab;
  activeTab: ViewTab = ViewTab.Map;

  setActiveTab(tab: ViewTab): void {
    this.activeTab = tab;
  }
}