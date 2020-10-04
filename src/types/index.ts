/**
 * @typedef Roll20Event
 * Type constructor for Roll20 events
 * @template Properties
 * Should be a string-based enum listing possible editable sheet properties
 * @template Buttons
 * Should be a string-baseed enum listing possible clickable sheet buttons
 */
export type Roll20Event<
  Properties extends string,
  Buttons extends string
> = ['sheet', 'opened']
  | ['change', Properties]
  | ['clicked', Buttons]

/**
 * @typedef Roll20RepeatingFieldEvent
 * Type constructor for Roll20 repeating field events
 * @template Group
 * Should be a string equal to the repeating field key
 * @template GroupProperties
 * Should be a string-based enum listing possible repeating field properties
 */
export type Roll20RepeatingFieldEvent<
  Group extends string,
  GroupProperties extends string
> = ['change', Group, GroupProperties]
  | ['remove', Group]
