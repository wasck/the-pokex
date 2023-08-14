/**
 * 
 * @param divisor the dividers of value
 * @param max the maximum value until array ends; default: 50
 * @returns Returns an array of all dividers
 */
export function dividersOf(divisor: number, max = 50): Array<number> {
  return Array(max)
    .fill(1)
    .map((_, index) => index + 1)
    .filter(value => value % divisor === 0)
}