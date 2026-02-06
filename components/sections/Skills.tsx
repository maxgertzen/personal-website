'use client';

import React from 'react';
import Section from '../common/Section';
import SkillRow from '../common/SkillRow';
import SkillItem from '../common/SkillItem';
import { skillCategories } from '@/constants/skills';

const Skills: React.FC = () => {
  return (
    <Section id='skills' className='text-center px-16'>
      <h2>Skills</h2>
      <h6>Some of my tools, frameworks & technologies</h6>
      <div className='mt-section-gap w-full flex flex-col gap-section-gap'>
        {skillCategories.map((category) => (
          <SkillRow
            key={category.title}
            title={category.title}
            columns={category.skills.length}>
            {category.skills.map((skill) => (
              <SkillItem
                key={skill.title}
                Icon={skill.Icon}
                title={skill.title}
              />
            ))}
          </SkillRow>
        ))}
      </div>
      <div className='mt-section-gap-lg' />
    </Section>
  );
};

export default Skills;
