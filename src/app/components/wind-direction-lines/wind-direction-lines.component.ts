import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-wind-direction-lines',
  standalone: true,
  templateUrl: './wind-direction-lines.component.html'
})
export class WindDirectionLinesComponent {
  @Input() containerWidth = 0;
  @Input() containerHeight = 0;

  @Input() set mousePosition({ x, y }: { x: number, y: number }) {
    if (x !== undefined && y !== undefined) {
      this.updateLines(x, y);
    }
  }

  @Input() set chartPositions(positions: Array<{ x: number, y: number }>) {
    this._chartPositions = positions;
    if (this._mouseX !== undefined && this._mouseY !== undefined) {
      this.updateLines(this._mouseX, this._mouseY);
    }
  }

  protected lines: Array<{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    // strength: number;
  }> = [];

  private _chartPositions: Array<{ x: number, y: number }> = [];
  private _mouseX?: number;
  private _mouseY?: number;

  private updateLines(mouseX: number, mouseY: number) {
    this._mouseX = mouseX;
    this._mouseY = mouseY;

    this.lines = this._chartPositions.map(chartPos => {
      const dx = mouseX - chartPos.x;
      const dy = mouseY - chartPos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const strength = Math.max(0.2, 1 - distance / 500);

      return {
        x1: chartPos.x,
        y1: chartPos.y,
        x2: mouseX,
        y2: mouseY,
        // strength
      };
    });
  }
}