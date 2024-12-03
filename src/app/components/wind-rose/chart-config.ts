import { EChartsOption } from 'echarts';

export interface ChartConfig {
  indicators: number;
  maxSpeed: number;
  radius: string;
  splitNumber: number;
}

export function createChartOptions(data: number[], config: ChartConfig): EChartsOption {
  const indicators = Array.from({ length: config.indicators }, (_, i) => ({
    max: config.maxSpeed,
    min: 0,
    axisLabel: { show: false },
    tooltip: {
      show: false
    }
  }));

  return {
    backgroundColor: 'transparent',
    tooltip: {
      show: false
    },

    radar: {
      shape: 'circle',
      indicator: indicators,
      center: ['50%', '50%'],
      startAngle: 90,
      splitNumber: config.splitNumber,
      axisName: { show: false },
      splitArea: { show: false },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#3f3f46', // gray-700
          width: 3
        }
      },
      axisLine: { show: false }
    },

    series: [{
      type: 'radar',
      symbol: 'none', // Remove circle symbols at data points
      tooltip: {
        show: false,
        backgroundColor: 'transparent'
      },

      data: [{
        value: data,
        name: 'Wind Speed',
        areaStyle: {
          color: 'red',
          opacity: 0.9
        },
        lineStyle: {
          color: 'red',
          width: 1
        }
      }]
    }]
  };
}