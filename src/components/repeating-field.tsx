import * as React from 'react'

export interface RepeatingFieldProps {
  name: string
}

export const RepeatingField: React.FunctionComponent<RepeatingFieldProps> = ({ children, name }) => (
  <fieldset name={`repeating_${name}`}>
    {children}
  </fieldset>
)
