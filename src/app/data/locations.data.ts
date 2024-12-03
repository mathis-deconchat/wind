import { Zone } from '../types/location.type';

export const PRESET_LOCATIONS: Zone[] = [
  {
    name: 'Tour Eiffel',
    coordinates: [2.2945, 48.8584],
    zoom: 15,
    radius: 500,
    locations: [
      {
        name: 'Tour Eiffel Base',
        coordinates: [2.2945, 48.8584],
        zoneId: 'tour-eiffel'
      },
      {
        name: 'Trocadéro',
        coordinates: [2.2890, 48.8617],
        zoneId: 'tour-eiffel'
      },
      {
        name: 'Champ de Mars',
        coordinates: [2.2979, 48.8556],
        zoneId: 'tour-eiffel'
      }
    ]
  },
  {
    name: 'Mont Saint-Michel',
    coordinates: [-1.5114, 48.6361],
    zoom: 14,
    radius: 1000,
    locations: [
      {
        name: 'Abbey',
        coordinates: [-1.5114, 48.6361],
        zoneId: 'mont-saint-michel'
      },
      {
        name: 'Parking',
        coordinates: [-1.5087, 48.6150],
        zoneId: 'mont-saint-michel'
      },
      {
        name: 'Bay Point',
        coordinates: [-1.5214, 48.6361],
        zoneId: 'mont-saint-michel'
      }
    ]
  },
  {
    name: 'Marseille',
    coordinates: [5.3698, 43.2965],
    zoom: 13,
    radius: 2000,
    locations: [
      {
        name: 'Vieux Port',
        coordinates: [5.3698, 43.2965],
        zoneId: 'marseille'
      },
      {
        name: 'Notre-Dame',
        coordinates: [5.3711, 43.2840],
        zoneId: 'marseille'
      },
      {
        name: 'Pharo',
        coordinates: [5.3567, 43.2897],
        zoneId: 'marseille'
      }
    ]
  }
];
