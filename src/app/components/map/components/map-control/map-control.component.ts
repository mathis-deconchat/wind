import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-map-control',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './map-control.component.html',
})
export class MapControlComponent {
    @Input() zoom: number = 0;
    @Input() windRoseCount: number = 0;
    @Input() showDirectionLines: boolean = true;
    @Input() showCoordinates: boolean = true;

    @Output() resetView = new EventEmitter<void>();
    @Output() toggleWindRose = new EventEmitter<void>();
    @Output() addWindRose = new EventEmitter<void>();
    @Output() showDirectionLinesChange = new EventEmitter<boolean>();
    @Output() showCoordinatesChange = new EventEmitter<boolean>();
} 