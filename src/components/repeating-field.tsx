import * as React from 'react'

export interface RepeatingFieldProps {
  name: string
}

export const RepeatingField: React.FunctionComponent<RepeatingFieldProps> = ({ children, name }) => (
  <fieldset className={`repeating_${name}`}>
    {children}
  </fieldset>
)
