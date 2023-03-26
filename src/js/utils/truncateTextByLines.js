/**
 * It takes an element and a number of lines, and it sets the max-height of the element to the height
 * of the number of lines
 * @param elemento - The element you want to truncate.
 * @param numeroRenglones - The number of lines you want to show.
 */
export const truncateTextByLines = (elemento, numeroRenglones) => {
    const alturaMaxima = parseFloat(window.getComputedStyle(elemento).lineHeight) * numeroRenglones;
    elemento.style.maxHeight = alturaMaxima + 'px';
    elemento.style.overflow = 'hidden';
};
