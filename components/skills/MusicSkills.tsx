'use client';

import React from 'react';
import SkillItem from '../common/SkillItem';
import SkillRow from '../common/SkillRow';
import LogicLogo from '../../public/assets/music/logic.svg';
import AbletonLogo from '../../public/assets/music/ableton.svg';
import PianoLogo from '../../public/assets/music/libre-music-piano.svg';
import MixerLogo from '../../public/assets/music/music-player-mixer.svg';

const skills = [
  { title: 'Logic Pro', icon: <LogicLogo /> },
  { title: 'Ableton Live', icon: <AbletonLogo /> },
  { title: 'Piano', icon: <PianoLogo /> },
  { title: 'Mixer', icon: <MixerLogo /> },
];

const MusicSkills = () => {
  return (
    <SkillRow title='Music Production & Performance' isMusic>
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

export default MusicSkills;
