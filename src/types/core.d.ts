export interface Roll20BaseElement {
  name: string
  displayName: string
}

/**
 * @template CustomProperties
 * Should be a string-based enum listing possible custom sheet properties
 */
export type Roll20Event<CustomProperties extends string>
  = ['change', CustomProperties]

/**
 * @template RepeatingFieldKeys
 * 
 * @template RepeatingFieldProperties
 * Should be a string-based enum listing possible custom repeating field subproperties
 */
export type Roll20RepeatingFieldEvent<
  RepeatingFieldKeys extends string,
  RepeatingFieldProperties extends string
>
  = ['change', RepeatingFieldProperties]

export interface Roll20InputProps {
  name: string
  value: string
}
