import * as React from 'react'
import { SerializedStyles } from '@emotion/react'

interface WithStylesProps {
  styles: SerializedStyles
}

export type InputProps = WithStylesProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>

export interface TextareaProps {

}

export const TextInput: React.FunctionComponent<InputProps> = ({ styles, ...props }) => (
  <input {...props} type='text' />
)

export const NumberInput: React.FunctionComponent<InputProps> = ({ styles, ...props }) => (
  <input {...props} type='number' />
)
