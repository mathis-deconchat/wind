import { Component, Input, OnChanges, OnInit } from '@angular/core';
import type { EChartsOption } from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import { WindService } from '../../services/wind.service';
import { WindRoseConfig } from '../../types/wind.types';
import { createChartOptions } from './chart-config';
import { processWindData } from './wind-data.processor';

@Component({
  selector: 'app-wind-rose',
  standalone: true,
  imports: [NgxEchartsModule],
  templateUrl: './wind-rose.component.html',
  styleUrls: ['./wind-rose.component.css']
})
export class WindRoseComponent implements OnInit, OnChanges {
  @Input() zoom: number = 15;

  protected config: WindRoseConfig = {
    zoom: 15,
    showDot: false
  };

  protected chartOption: EChartsOption = {};
  private readonly windData = this.windService.getWindData(36);

  constructor(private windService: WindService) { }

  ngOnInit() {
    this.updateDisplay();
  }

  ngOnChanges() {
    this.config = {
      zoom: this.zoom,
      showDot: this.zoom <= 13
    };
    this.updateDisplay();
  }

  private updateDisplay() {
    if (!this.config.showDot) {
      const data = processWindData(this.windData, 36);
      this.chartOption = createChartOptions(data, {
        indicators: 36,
        maxSpeed: 50,
        radius: '85%',
        splitNumber: 6,


      });
    }
  }
}