import React from 'react';

interface AlertProps {
  variant: 'success' | 'error';
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

const variantStyles = {
  success: 'bg-green-100 border-green-500 text-green-700',
  error: 'bg-red-100 border-red-500 text-red-700',
};

const Alert: React.FC<AlertProps> = ({ variant, title, children, onClose }) => {
  return (
    <div
      className={`${variantStyles[variant]} border-l-4 rounded-2xl p-4 animate__animated animate__fadeInUp absolute top-0 left-0 right-0 z-40`}
      role="alert"
      onClick={onClose}
    >
      <p className="font-bold">{title}</p>
      {children}
    </div>
  );
};

export default Alert;
