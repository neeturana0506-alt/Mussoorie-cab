
import React from 'react';
import type { CarOption } from '../types';
import { CarType } from '../types';
import { SedanIcon, SuvIcon } from './IconComponents';

// The application currently supports only Sedan and SUV vehicle types.
export const CAR_OPTIONS: Record<CarType, CarOption> = {
  [CarType.SEDAN]: {
    type: CarType.SEDAN,
    name: 'Sedan',
    capacity: '1-4 Passengers',
    icon: SedanIcon,
    baseFare: 150,
    perKm: 18,
  },
  [CarType.SUV]: {
    type: CarType.SUV,
    name: 'SUV',
    capacity: '1-6 Passengers',
    icon: SuvIcon,
    baseFare: 250,
    perKm: 25,
  },
};