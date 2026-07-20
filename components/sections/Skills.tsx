import React from 'react';
import Section from '../common/Section';
import SkillMarquee from '../common/SkillMarquee';

const Skills: React.FC = () => {
  return (
    <Section id='skills' className='text-center px-16'>
      <h2>Skills</h2>
      <p className='text-base'>Some of my tools, frameworks & technologies</p>
      <SkillMarquee />
      <div className='mt-section-gap-lg' />
    </Section>
  );
};

export default Skills;
