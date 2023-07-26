export function celciusToFahrenheit(c: number) {
  return Math.round(c * (9 / 5) + 32)
}

export function fahrenheitToCelcius(f: number) {
  return Math.round(((f - 32) * 5) / 9)
}
