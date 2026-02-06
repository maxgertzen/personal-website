'use client';

import React from 'react';
import Section from '../common/Section';
import SocialRow from '../common/SocialRow';
import SocialIcon from '../common/SocialIcon';
import { socialLinks } from '@/constants/social';

const SocialLinks: React.FC = () => {
  return (
    <Section id='social-links'>
      <h2>Social Links</h2>
      <div className='mt-section-gap w-full'>
        <SocialRow>
          {socialLinks.map((link) => (
            <SocialIcon
              key={link.title}
              Icon={link.Icon}
              title={link.title}
              href={link.href}
            />
          ))}
        </SocialRow>
      </div>
      <div className='mt-section-gap-xl' />
    </Section>
  );
};

export default SocialLinks;
