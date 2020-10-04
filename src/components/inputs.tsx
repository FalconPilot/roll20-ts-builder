import * as React from 'react'
import { SerializedStyles } from '@emotion/react'
import styled from '@emotion/styled'

import { WithStylesProps } from '../types/style'

const styledInput = (styles?: SerializedStyles) => styled.input`${styles ?? ''}`
const styledTextArea = (styles?: SerializedStyles) => styled.textarea`${styles ?? ''}`

export type InputProps = WithStylesProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  name: string
}

export type TextareaProps = WithStylesProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>

/**
 * @param {InputProps} props - Component props, with input properties
 */
export const TextInput: React.FunctionComponent<InputProps> = ({ styles, name, ...props }) => {
  const Input = styledInput(styles)
  return <Input {...props} name={`attr_${name}`} type='text' />
}

/**
 * @param {InputProps} props - Component props, with input properties
 */
export const NumberInput: React.FunctionComponent<InputProps> = ({ styles, name, ...props }) => {
  const Input = styledInput(styles)
  return <Input {...props} name={`attr_${name}`} type='number' />
}

/**
 * @param {InputProps} props - Component props, with input properties
 */
export const CheckboxInput: React.FunctionComponent<InputProps> = ({ styles, name, ...props }) => {
  const Input = styledInput(styles)
  return <Input {...props} name={`attr_${name}`} type='checkbox' />
}

/**
 * @param {TextareaProps} props - Component props, with textarea properties
 */
export const TextArea: React.FunctionComponent<TextareaProps> = ({ styles, name, ...props }) => {
  const Textarea = styledTextArea(styles)
  return <Textarea {...props} name={`attr_${name}`}></Textarea>
}
