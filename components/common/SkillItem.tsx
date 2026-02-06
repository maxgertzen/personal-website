import type { CSSProperties, FC, SVGProps } from 'react';

interface SkillItemProps {
  Icon: FC<SVGProps<SVGSVGElement>>;
  title: string;
  style?: CSSProperties;
  darkClass?: string;
}

function SkillItem({ Icon, title, style, darkClass }: SkillItemProps) {
  const iconClass = darkClass !== undefined ? darkClass : 'svg-icon';

  return (
    <div className='flex flex-col items-center' style={style}>
      <Icon className={iconClass || undefined} aria-hidden='true' />
      <span className='sr-only'>{title}</span>
    </div>
  );
}

export default SkillItem;
