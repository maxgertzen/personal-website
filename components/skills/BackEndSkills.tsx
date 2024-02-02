import React from 'react';
import SkillItem from '../common/SkillItem';
import SkillRow from '../common/SkillRow';
import DotnetLogo from '../../public/assets/back-end/dotnet.svg';
import NodeLogo from '../../public/assets/back-end/node.svg';
import PhpLogo from '../../public/assets/back-end/php.svg';

const skills = [
  { title: 'Dotnet', icon: <DotnetLogo className='-ml-2' /> },
  { title: 'Node', icon: <NodeLogo /> },
  { title: 'Php', icon: <PhpLogo className='self-center' /> },
];

const BackEndSkills = () => {
  return (
    <SkillRow title='Back End Development'>
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

export default BackEndSkills;
