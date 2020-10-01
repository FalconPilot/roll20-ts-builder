import * as React from 'react'
import styled from '@emotion/styled'

const HiddenInput = styled.input`
  &[value='0'] + * {
    display: none;
  }
`

export interface TogglableSectionProps {
  togglableProperty: string
  defaultDisplayed?: boolean
}

export const TogglableSection = (
  TogglableWrapper: React.FunctionComponent
): React.FunctionComponent<TogglableSectionProps> => ({
  children,
  defaultDisplayed,
  togglableProperty
}) => (
  <>
    <HiddenInput
      type='hidden'
      name={`attr_${togglableProperty}`}
      value={defaultDisplayed ? 'on' : '0'}
    />
    <TogglableWrapper>{children}</TogglableWrapper>
  </>
)
