import React from 'react';

interface AlertProps {
  variant: 'success' | 'error';
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

const tintClass: Record<AlertProps['variant'], string> = {
  success: 'glass-alert__tint--success',
  error: 'glass-alert__tint--error',
};

const textClass: Record<AlertProps['variant'], string> = {
  success: 'text-emerald-950 dark:text-emerald-50',
  error: 'text-rose-950 dark:text-rose-50',
};

const Alert: React.FC<AlertProps> = ({ variant, title, children, onClose }) => {
  return (
    <div
      className="glass glass-alert absolute top-0 left-0 right-0 z-40 cursor-pointer"
      role="alert"
      onClick={onClose}
    >
      <div className="glass__effect" />
      <div className={`glass__tint ${tintClass[variant]}`} />
      <div className="glass__shine" />
      <div className={`glass-alert__content ${textClass[variant]}`}>
        <p className="font-bold">{title}</p>
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
};

export default Alert;
