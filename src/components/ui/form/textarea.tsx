import * as React from "react"
import { UseFormRegisterReturn } from "react-hook-form"

import { FieldWrapper, FieldWrapperPassThroughProps } from "./field-wrapper"

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  FieldWrapperPassThroughProps & {
    className?: string
    registration: Partial<UseFormRegisterReturn>
  }

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, registration, ...props }, ref) => {
    return (
      <FieldWrapper label={label} error={error}>
        <textarea className={className} ref={ref} {...registration} {...props} />
      </FieldWrapper>
    )
  },
)
