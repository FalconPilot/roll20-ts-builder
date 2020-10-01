import * as React from 'react'
import { SerializedStyles } from '@emotion/react'

interface WithStylesProps {
  styles: SerializedStyles
}

export type InputProps = WithStylesProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  name: string
}

export type TextareaProps = WithStylesProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>

export const TextInput: React.FunctionComponent<InputProps> = ({ styles, name, ...props }) => (
  <input {...props} name={`attr_${name}`} type='text' />
)

export const NumberInput: React.FunctionComponent<InputProps> = ({ styles, name, ...props }) => (
  <input {...props} name={`attr_${name}`} type='number' />
)

export const TextArea: React.FunctionComponent<TextareaProps> = ({ styles, name, ...props }) => (
  <textarea {...props} name={`attr_${name}`}></textarea>
)
