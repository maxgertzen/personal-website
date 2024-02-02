import React from 'react';
import Section from '../common/Section';

const SocialLinks: React.FC = () => {
  return (
    <Section id='social-links'>
      <ul>
        <li>
          <a
            href='#'
            target='_blank'
            rel='noopener noreferrer'
            title='GitHub'
            aria-label='GitHub'>
            GitHub
          </a>
        </li>
        <li>
          <a
            href='#'
            target='_blank'
            rel='noopener noreferrer'
            title='Twitter'
            aria-label='Twitter'>
            Twitter
          </a>
        </li>
      </ul>
    </Section>
  );
};

export default SocialLinks;
