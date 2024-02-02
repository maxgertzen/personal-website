import React from 'react';
import SkillItem from '../common/SkillItem';
import SkillRow from '../common/SkillRow';
import ReactLogo from '../../public/assets/front-end/react.svg';
import NextLogo from '../../public/assets/front-end/next.svg';
import JavascriptLogo from '../../public/assets/front-end/javascript.svg';

const skills = [
  { title: 'React', icon: <ReactLogo /> },
  { title: 'Next.js', icon: <NextLogo className='-mr-4' /> },
  { title: 'JavaScript', icon: <JavascriptLogo /> },
];

const FrontEndSkills = () => {
  return (
    <SkillRow title='Front End Development'>
      {skills.map((skill, index) => (
        <SkillItem
          key={`${index}-${skill.title}`}
          icon={skill.icon}
          title={skill.title}
        />
      ))}
    </SkillRow>
  );
};

export default FrontEndSkills;
