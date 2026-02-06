import type { FC, SVGProps } from 'react';

// CMS
import WordpressLogo from '@/public/assets/cms/wordpress.svg';
import WixLogo from '@/public/assets/cms/wix.svg';
import ShopifyLogo from '@/public/assets/cms/shopify.svg';

// Front End
import ReactLogo from '@/public/assets/front-end/react.svg';
import NextLogo from '@/public/assets/front-end/next.svg';
import JavascriptLogo from '@/public/assets/front-end/javascript.svg';

// Back End
import DotnetLogo from '@/public/assets/back-end/dotnet.svg';
import NodeLogo from '@/public/assets/back-end/node.svg';
import PhpLogo from '@/public/assets/back-end/php.svg';

// Music
import LogicLogo from '@/public/assets/music/logic.svg';
import AbletonLogo from '@/public/assets/music/ableton.svg';
import PianoLogo from '@/public/assets/music/libre-music-piano.svg';
import MixerLogo from '@/public/assets/music/music-player-mixer.svg';

export type SkillDefinition = {
  title: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
  darkClass?: string;
};

export type SkillCategory = {
  title: string;
  skills: SkillDefinition[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: 'Content Management & E-Commerce',
    skills: [
      { title: 'WordPress', Icon: WordpressLogo },
      { title: 'Wix', Icon: WixLogo },
      { title: 'Shopify', Icon: ShopifyLogo },
    ],
  },
  {
    title: 'Front End Development',
    skills: [
      { title: 'React', Icon: ReactLogo },
      { title: 'Next.js', Icon: NextLogo },
      { title: 'JavaScript', Icon: JavascriptLogo, darkClass: '' },
    ],
  },
  {
    title: 'Back End Development',
    skills: [
      { title: 'Dotnet', Icon: DotnetLogo },
      { title: 'Node', Icon: NodeLogo },
      { title: 'Php', Icon: PhpLogo },
    ],
  },
  {
    title: 'Music Production & Performance',
    skills: [
      { title: 'Logic Pro', Icon: LogicLogo, darkClass: '' },
      { title: 'Ableton Live', Icon: AbletonLogo },
      { title: 'Piano', Icon: PianoLogo },
      { title: 'Mixer', Icon: MixerLogo },
    ],
  },
];
