'use client';

import type { FC, SVGProps } from 'react';

interface SocialIconProps {
  Icon: FC<SVGProps<SVGSVGElement>>;
  title: string;
  href: string;
}

function SocialIcon({ Icon, title, href }: SocialIconProps) {
  return (
    <li className='flex flex-col items-center social-icon-item'>
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        aria-label={title}
      >
        <Icon className='svg-icon' aria-hidden='true' />
      </a>
    </li>
  );
}

export default SocialIcon;
