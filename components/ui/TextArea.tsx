'use client';

import React from 'react';
import { Textarea } from '@nextui-org/react';

interface TextAreaProps {
  id?: string;
  name?: string;
  label: string;
  variant?: 'bordered' | 'flat' | 'faded' | 'underlined';
  isInvalid?: boolean;
  errorMessage?: React.ReactNode;
  maxLength?: number;
  isRequired?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ variant = 'bordered', onChange, ...props }, ref) => {
    return (
      <Textarea ref={ref} variant={variant} onValueChange={onChange} {...props} />
    );
  },
);

TextArea.displayName = 'TextArea';

export default TextArea;
