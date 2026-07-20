import type { FC, SVGProps } from 'react';

import AnthropicLogo from '@/public/assets/skills/anthropic.svg';
import OpenaiLogo from '@/public/assets/skills/openai.svg';
import AiAgentsLogo from '@/public/assets/skills/ai-agents.svg';
import ReactLogo from '@/public/assets/skills/react.svg';
import NextLogo from '@/public/assets/skills/next.svg';
import TypescriptLogo from '@/public/assets/skills/typescript.svg';
import JavascriptLogo from '@/public/assets/skills/javascript.svg';
import DotnetLogo from '@/public/assets/skills/dotnet.svg';
import NodeLogo from '@/public/assets/skills/node.svg';
import PhpLogo from '@/public/assets/skills/php.svg';
import MakeLogo from '@/public/assets/skills/make.svg';
import N8nLogo from '@/public/assets/skills/n8n.svg';
import GithubActionsLogo from '@/public/assets/skills/githubactions.svg';
import WordpressLogo from '@/public/assets/skills/wordpress.svg';
import WixLogo from '@/public/assets/skills/wix.svg';
import ShopifyLogo from '@/public/assets/skills/shopify.svg';
import LogicLogo from '@/public/assets/skills/logic.svg';
import AbletonLogo from '@/public/assets/skills/ableton.svg';
import PianoLogo from '@/public/assets/skills/piano.svg';

export type SkillDefinition = {
  title: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
};

export type SkillCategory = {
  title: string;
  skills: SkillDefinition[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: 'AI & LLM',
    skills: [
      { title: 'Anthropic', Icon: AnthropicLogo },
      { title: 'OpenAI', Icon: OpenaiLogo },
      { title: 'AI Agents', Icon: AiAgentsLogo },
    ],
  },
  {
    title: 'Front End Development',
    skills: [
      { title: 'React', Icon: ReactLogo },
      { title: 'Next.js', Icon: NextLogo },
      { title: 'TypeScript', Icon: TypescriptLogo },
      { title: 'JavaScript', Icon: JavascriptLogo },
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
    title: 'Automation',
    skills: [
      { title: 'Make', Icon: MakeLogo },
      { title: 'n8n', Icon: N8nLogo },
      { title: 'Claude', Icon: AnthropicLogo },
    ],
  },
  {
    title: 'CI/CD',
    skills: [{ title: 'GitHub Actions', Icon: GithubActionsLogo }],
  },
  {
    title: 'Content Management & E-Commerce',
    skills: [
      { title: 'WordPress', Icon: WordpressLogo },
      { title: 'Wix', Icon: WixLogo },
      { title: 'Shopify', Icon: ShopifyLogo },
    ],
  },
  {
    title: 'Music Production & Performance',
    skills: [
      { title: 'Logic Pro', Icon: LogicLogo },
      { title: 'Ableton Live', Icon: AbletonLogo },
      { title: 'Piano', Icon: PianoLogo },
    ],
  },
];
