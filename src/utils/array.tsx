export function randomOf<T>(array: T[]): T | undefined {
  return array[Math.floor(Math.random() * array.length)]
}