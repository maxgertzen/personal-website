import React from 'react';
import Section from '../common/Section';
import SocialRow from '../common/SocialRow';

import GitIcon from '../../public/assets/social/git.svg';
import LinkedInIcon from '../../public/assets/social/linkedin.svg';
import InstagramIcon from '../../public/assets/social/instagram.svg';
import SoundCloudIcon from '../../public/assets/social/soundcloud.svg';
import SocialIcon from '../common/SocialIcon';
import { Spacer } from '@nextui-org/react';

const socialLinks = [
  {
    title: 'GitHub',
    icon: (
      <GitIcon className='inline-block animate__animated animate__bounce' />
    ),
    link: 'https://github.com/maxgertzen',
  },
  {
    title: 'LinkedIn',
    icon: (
      <LinkedInIcon className='inline-block animate__animated animate__shakeX' />
    ),
    link: 'https://www.linkedin.com/in/maxgertzen/',
  },
  {
    title: 'Instagram',
    icon: (
      <InstagramIcon className='inline-block animate__animated animate__pulse' />
    ),
    link: 'https://www.instagram.com/maxgertzen/',
  },
  {
    title: 'SoundCloud',
    icon: (
      <SoundCloudIcon className='inline-block animate__animated animate__wobble' />
    ),
    link: 'https://soundcloud.com/maxgertzen',
  },
];

const SocialLinks: React.FC = () => {
  return (
    <Section id='social-links'>
      <h2 className='sm:text-4xl'>Social Links</h2>
      <Spacer y={8} />
      <SocialRow>
        {socialLinks.map((link, index) => (
          <SocialIcon
            key={index}
            title={link.title}
            icon={link.icon}
            link={link.link}
            animationIndex={index}
          />
        ))}
      </SocialRow>
      <Spacer y={32} />
    </Section>
  );
};

export default SocialLinks;
