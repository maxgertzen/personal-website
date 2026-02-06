import type { CSSProperties, FC, SVGProps } from 'react';

interface SkillItemProps {
  Icon: FC<SVGProps<SVGSVGElement>>;
  title: string;
  style?: CSSProperties;
}

function SkillItem({ Icon, title, style }: SkillItemProps) {
  return (
    <div className='flex flex-col items-center' style={style}>
      <Icon aria-hidden='true' />
      <span className='sr-only'>{title}</span>
    </div>
  );
}

export default SkillItem;
