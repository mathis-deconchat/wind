import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-coordinate-pointer',
  standalone: true,
  templateUrl: './coordinate-pointer.component.html',
  styleUrls: ['./coordinate-pointer.component.css']
})
export class CoordinatePointerComponent {
  @Input() lng: number = 0;
  @Input() lat: number = 0;
}