'use client';

import React from 'react';
import { Button } from '@nextui-org/react';

interface FormButtonProps {
  id?: string;
  type?: 'button' | 'submit' | 'reset';
  isDisabled?: boolean;
  isLoading?: boolean;
  className?: string;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const FormButton: React.FC<FormButtonProps> = ({
  type = 'button',
  ...props
}) => {
  return <Button color="default" type={type} {...props} />;
};

export default FormButton;
