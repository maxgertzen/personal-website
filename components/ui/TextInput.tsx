'use client';

import React from 'react';
import { Input } from '@nextui-org/react';

interface TextInputProps {
  id?: string;
  name?: string;
  label: string;
  type?: string;
  variant?: 'bordered' | 'flat' | 'faded' | 'underlined';
  isInvalid?: boolean;
  errorMessage?: React.ReactNode;
  maxLength?: number;
  autoComplete?: string;
  isRequired?: boolean;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: () => void;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ variant = 'bordered', ...props }, ref) => {
    return <Input ref={ref} variant={variant} {...props} />;
  },
);

TextInput.displayName = 'TextInput';

export default TextInput;
