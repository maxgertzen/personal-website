'use client';

import React, { CSSProperties } from 'react';
import Section from '../common/Section';
import SkillItem from '../common/SkillItem';
import { skillCategories } from '@/constants/skills';

const MAX_COLUMNS = Math.max(...skillCategories.map((c) => c.skills.length));

function getItemPlacement(
  index: number,
  count: number
): CSSProperties | undefined {
  if (count >= MAX_COLUMNS) return undefined;
  const isLast = index === count - 1;
  const isMiddle = index > 0 && !isLast;
  if (isLast) return { gridColumn: MAX_COLUMNS };
  if (isMiddle) return { gridColumn: `2 / ${MAX_COLUMNS}`, justifySelf: 'center' };
  return undefined;
}

const Skills: React.FC = () => {
  return (
    <Section id='skills' className='text-center px-16'>
      <h2>Skills</h2>
      <h6>Some of my tools, frameworks & technologies</h6>
      <div
        className='mt-section-gap w-full grid place-items-center gap-y-4 m-auto px-4 sm:w-6/12 sm:px-0'
        style={{
          gridTemplateColumns: `repeat(${MAX_COLUMNS}, minmax(0, 1fr))`,
        }}
      >
        {skillCategories.map((category, index) => (
          <React.Fragment key={category.title}>
            <h3 className='col-span-full mt-4'>{category.title}</h3>
            {category.skills.map((skill, skillIndex) => (
              <SkillItem
                key={skill.title}
                Icon={skill.Icon}
                title={skill.title}
                darkClass={skill.darkClass}
                style={getItemPlacement(skillIndex, category.skills.length)}
              />
            ))}
            {index < skillCategories.length - 1 && (
              <hr className='hidden sm:block border-divider col-span-full mt-8 w-full' />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className='mt-section-gap-lg' />
    </Section>
  );
};

export default Skills;
