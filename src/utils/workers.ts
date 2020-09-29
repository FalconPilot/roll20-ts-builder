import { Roll20Event } from '$types/core'

declare function on (events: string, callback: () => void): void

const composeEvents = <CustomProperties extends string>(
  event: Roll20Event<CustomProperties>
): string => (
  `${event[0]}:${event[1]}`
)

export const onEvents = <CustomProperties extends string>(
  events: Roll20Event<CustomProperties>[],
  callback: () => void
): void => {
  on(events.map(composeEvents).join(' '), callback)
}
