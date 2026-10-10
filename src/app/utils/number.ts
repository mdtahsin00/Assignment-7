export function toBanglaNumber(value: number | string) {
  return Number(value).toLocaleString("bn-BD");
}