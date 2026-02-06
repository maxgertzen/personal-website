import type { FC, SVGProps } from 'react';

import GitIcon from '@/public/assets/social/git.svg';
import LinkedInIcon from '@/public/assets/social/linkedin.svg';
import InstagramIcon from '@/public/assets/social/instagram.svg';
import SoundCloudIcon from '@/public/assets/social/soundcloud.svg';

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
  {
    title: 'Instagram',
    Icon: InstagramIcon,
    href: 'https://www.instagram.com/maxgertzen/',
  },
  {
    title: 'SoundCloud',
    Icon: SoundCloudIcon,
    href: 'https://soundcloud.com/maxgertzen',
  },
];
