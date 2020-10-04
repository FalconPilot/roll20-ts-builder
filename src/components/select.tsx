import * as React from 'react'
import styled from '@emotion/styled'
import { SerializedStyles } from '@emotion/react'

import { WithStylesProps } from '../types/style'

const styledSelect = (styles?: SerializedStyles) => styled.select`${styles ?? ''}`

export interface OptionProps {
  value: string | number
  name: string
}

export type SelectProps = WithStylesProps & React.SelectHTMLAttributes<HTMLSelectElement> & {
  name: 'string'
  options: OptionProps[]
}

export const SelectableList: React.FunctionComponent<SelectProps> = ({ styles, name, options, ...props }) => {
  const Select = styledSelect(styles)
  return (
    <Select {...props} name={`attr_${name}`}>
      {options.map(opt => (
        <option key={`${name}_${opt.name}_${opt.value}`} value={opt.value}>{opt.name}</option>
      ))}
    </Select>
  )
}
