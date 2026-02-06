'use client';

import React from 'react';
import { Checkbox } from '@nextui-org/react';

interface FormCheckboxProps {
  id?: string;
  name?: string;
  isSelected?: boolean;
  onChange?: (checked: boolean) => void;
  isInvalid?: boolean;
  isRequired?: boolean;
  children?: React.ReactNode;
}

const FormCheckbox = React.forwardRef<HTMLLabelElement, FormCheckboxProps>(
  ({ onChange, ...props }, ref) => {
    return <Checkbox ref={ref} onValueChange={onChange} {...props} />;
  }
);

FormCheckbox.displayName = 'FormCheckbox';

export default FormCheckbox;
