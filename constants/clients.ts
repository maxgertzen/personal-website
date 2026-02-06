import type { FC, SVGProps } from 'react';

import RadicalIcon from '@/public/assets/clients/radical.svg';
import ChargeAfterIcon from '@/public/assets/clients/chargeafter.svg';
import UnitedSeatsIcon from '@/public/assets/clients/unitedseats.svg';

export type ClientDefinition = {
  title: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
  href?: string;
};

export const clients: ClientDefinition[] = [
  {
    title: 'Radical Publishing',
    Icon: RadicalIcon,
    href: 'https://radical.org.il/about-en/',
  },
  {
    title: 'ChargeAfter',
    Icon: ChargeAfterIcon,
    href: 'https://chargeafter.com/',
  },
  {
    title: 'United Seats Ltd.',
    Icon: UnitedSeatsIcon,
    href: 'https://united-seats.com/en/',
  },
];
