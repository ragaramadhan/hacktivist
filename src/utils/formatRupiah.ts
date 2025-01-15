export function formatRupiah(amount: number): string {
  const number = Number(amount);
  if (isNaN(number)) {
    return "Invalid input";
  }
  const fixedNumber = number.toFixed(2);

  // Split the number into whole and decimal parts
  const [wholePart, decimalPart] = fixedNumber.split(".");

  // Add thousand separators to the whole part
  const formattedWholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Combine the parts and add the 'Rp' prefix
  return `Rp ${formattedWholePart},${decimalPart}`;
}
