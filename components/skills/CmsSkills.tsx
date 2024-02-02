import React from 'react';
import SkillItem from '../common/SkillItem';
import SkillRow from '../common/SkillRow';
import WordpressLogo from '../../public/assets/cms/wordpress.svg';
import WixLogo from '../../public/assets/cms/wix.svg';
import ShopifyLogo from '../../public/assets/cms/shopify.svg';

const skills = [
  { title: 'WordPress', icon: <WordpressLogo className='-ml-5' /> },
  { title: 'Wix', icon: <WixLogo /> },
  { title: 'Shopify', icon: <ShopifyLogo /> },
];

const CmsSkills = () => {
  return (
    <SkillRow title='Content Management & E-Commerce'>
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

export default CmsSkills;
