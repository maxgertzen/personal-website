import type { FC, SVGProps } from 'react';

import GitIcon from '@/public/assets/social/git.svg';
import LinkedInIcon from '@/public/assets/social/linkedin.svg';

export type SocialLinkDefinition = {
  title: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
  href: string;
};

export const socialLinks: SocialLinkDefinition[] = [
  {
    title: 'GitHub',
    Icon: GitIcon,
    href: 'https://github.com/maxgertzen',
  },
  {
    title: 'LinkedIn',
    Icon: LinkedInIcon,
    href: 'https://www.linkedin.com/in/maxgertzen/',
  },
];
