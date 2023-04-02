/**
 * It takes an element and a number of lines, and it sets the max-height of the element to the height
 * of the number of lines
 * @param elemento - The element you want to truncate.
 * @param numeroRenglones - The number of lines you want to show.
 */
const truncateTextByLines = (elemento, numeroRenglones) => {
    const alturaMaxima = parseFloat(window.getComputedStyle(elemento).lineHeight) * numeroRenglones;
    elemento.style.maxHeight = alturaMaxima + 'px';
    elemento.style.overflow = 'hidden';
};

/**
 * The function truncateElementText takes a productHtml as a parameter, and then selects the element
 * with the class product__title, and then calls the function truncateTextByLines function, truncating
 * the title to 2 lines. Then, it selects the element with the class product__description, and then
 * calls the function truncateTextByLines function, truncating the description to 4 lines.
 * @param productHtml - The HTML element that contains the product information.
 */
export const truncateElementText = (productHtml) => {
    const titleProducts = productHtml.querySelector('.product__title');
    truncateTextByLines(titleProducts, 2); 
    const descriptionProducts = productHtml.querySelector('.product__description');
    truncateTextByLines(descriptionProducts, 4);
}



