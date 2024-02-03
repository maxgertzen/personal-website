import React from 'react';
import Section from '../common/Section';
import { Spacer } from '@nextui-org/react';
import FrontEndSkills from '../skills/FrontEndSkills';
import CmsSkills from '../skills/CmsSkills';
import BackEndSkills from '../skills/BackEndSkills';
import MusicSkills from '../skills/MusicSkills';

const Skills: React.FC = () => {
  return (
    <Section id='skills' className='text-center px-16'>
      <h2>Skills</h2>
      <Spacer y={8} />
      <CmsSkills />
      <Spacer y={8} />
      <FrontEndSkills />
      <Spacer y={8} />
      <BackEndSkills />
      <Spacer y={8} />
      <MusicSkills />
      <Spacer y={16} />
    </Section>
  );
};

export default Skills;
