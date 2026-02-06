import type { FC, SVGProps } from 'react';

interface SkillItemProps {
  Icon: FC<SVGProps<SVGSVGElement>>;
  title: string;
}

function SkillItem({ Icon, title }: SkillItemProps) {
  return (
    <li className='flex flex-col items-center'>
      <Icon aria-hidden='true' />
      <span className='sr-only'>{title}</span>
    </li>
  );
}

export default SkillItem;
