import * as React from 'react';
import { type FieldError } from 'react-hook-form';

import { Error } from './error';

type FieldWrapperProps = {
  label?: string;
  className?: string;
  children: React.ReactNode;
  error?: FieldError | undefined;
};

export type FieldWrapperPassThroughProps = Omit<FieldWrapperProps, 'className' | 'children'>;

export const FieldWrapper = (props: FieldWrapperProps) => {
  const { label, error, children } = props;
  return (
    <div>
      {label}
      <div className="mt-1">{children}</div>
      <Error errorMessage={error?.message} />
    </div>
  );
};