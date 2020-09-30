import { Roll20Event } from '../types'

declare function on (events: string, callback: () => void): void

const composeEvents = <Properties extends string, Buttons extends string>(
  event: Roll20Event<Properties, Buttons>
): string => (
  `${event[0]}:${event[1]}`
)

export const onEvents = <Properties extends string, Buttons extends string>(
  events: Roll20Event<Properties, Buttons>[],
  callback: () => void
): void => {
  on(events.map(composeEvents).join(' '), callback)
}
