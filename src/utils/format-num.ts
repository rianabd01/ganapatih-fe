export default function NumberFormatEN(num: number | string = 0): string {
  const parsedNumber = parseFloat(String(num));
  if (isNaN(parsedNumber)) return "0";

  return Intl.NumberFormat("en-EN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(parsedNumber);
}
