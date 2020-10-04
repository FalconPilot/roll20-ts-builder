const property = (name: string): string => `@{${name}}`

const interpolate = (formula: string): string => `[[${formula}]]`

const dice = (amt: string | number, faces: string | number): string => `${amt}D${faces}`

const math = {
  add: (p1: string | number, p2: string | number): string => `${p1}+${p2}`,
  sub: (p1: string | number, p2: string | number): string => `${p1}-${p2}`,
  mul: (p1: string | number, p2: string | number): string => `${p1}*${p2}`,
  div: (p1: string | number, p2: string | number): string => `${p1}/${p2}`
}

export const Formula = {
  interpolate,
  property,
  dice,
  math
}
