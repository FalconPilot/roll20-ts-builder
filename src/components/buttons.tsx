import * as React from 'react'
import styled from '@emotion/styled'
import { SerializedStyles } from '@emotion/react'
import { WithStylesProps } from 'src/types/style'

const styledButton = (styles?: SerializedStyles) => styled.button`${styles ?? ''}`

export type RollButtonProps = WithStylesProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
  name: string
}

/**
 * @param {RollButtonProps} props - Roll button props
 */
export const RollButton: React.FunctionComponent<RollButtonProps> = ({ styles, children, ...props }) => {
  const Button = styledButton(styles)
  return <Button {...props} type={'roll' as any}>{children}</Button>
}
