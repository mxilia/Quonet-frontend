"use client"

import * as React from "react"
import { UseFormRegisterReturn } from "react-hook-form"
import { FieldWrapper, FieldWrapperPassThroughProps } from "./field-wrapper"

type Option = {
  label: string
  value: string
}

type SelectFieldProps = FieldWrapperPassThroughProps & {
  options: Option[] | undefined
  className?: string
  defaultValue?: string
  registration: Partial<UseFormRegisterReturn>
}

export const Select = (props: SelectFieldProps) => {
  const { label, options, error, className, defaultValue, registration } = props
  return (
    <FieldWrapper label={label} error={error}>
      <select className={className} defaultValue={defaultValue} {...registration}>
        {options?.map(({ label, value }) => (
          <option key={label} value={value}>
            {label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  )
}
