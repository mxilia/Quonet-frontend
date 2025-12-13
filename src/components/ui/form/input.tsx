import { UseFormRegisterReturn } from "react-hook-form";
import { FieldWrapper, FieldWrapperPassThroughProps } from "./field-wrapper";
import * as React from 'react';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> 
  & FieldWrapperPassThroughProps 
  & {
    className?: string;
    registration: Partial<UseFormRegisterReturn>;
  };

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, registration, ...props }, ref) => {
    return (
      <FieldWrapper label={label} error={error}>
        <input
          type={type}
          className={className}
          ref={ref}
          {...registration}
          {...props}
        />
      </FieldWrapper>
    );
  }
)