import type { FC, SVGProps } from 'react';

interface ClientItemProps {
  Icon: FC<SVGProps<SVGSVGElement>>;
  title: string;
  href?: string;
}

function ClientItem({ Icon, title, href }: ClientItemProps) {
  const icon = (
    <div className="w-32 h-10 sm:w-44 sm:h-14 flex items-center justify-center">
      <Icon className="max-h-full max-w-full svg-icon" aria-label={title} />
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {icon}
      </a>
    );
  }

  return icon;
}

export default ClientItem;
