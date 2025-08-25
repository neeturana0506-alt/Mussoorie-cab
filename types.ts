
import type { FC, SVGProps } from 'react';

export interface BookingDetails {
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
}

export enum CarType {
  SEDAN = 'SEDAN',
  SUV = 'SUV',
}

export interface CarOption {
  type: CarType;
  name: string;
  capacity: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  baseFare: number;
  perKm: number;
}

export interface FareEstimate {
  fare: number;
  distance: string;
  duration: string;
  description: string;
}

export type AppStep = 'BOOKING_FORM' | 'FARE_DETAILS' | 'PAYMENT' | 'CONFIRMED';

export type UserRole = 'ADMIN' | 'GUEST';