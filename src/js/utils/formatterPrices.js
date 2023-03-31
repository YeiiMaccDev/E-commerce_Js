/**
 * It takes a number and returns a string with the number formatted as a currency
 * @param num - The number to format.
 * @returns A function that takes a number and returns a formatted string.
 */
export const formatPrice = (num) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(num);
  };