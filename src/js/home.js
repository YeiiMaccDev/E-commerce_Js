import { getCurrentMonth } from "./utils/getCurrentMonth.js";
import { truncateTextByLines } from "./utils/truncateTextByLines.js";

// ----- Banner-offers
/* Getting the current month and displaying it on the page banner-offers. */
const currentMonthNameHtml = document.getElementById('current-month');
currentMonthNameHtml.textContent = getCurrentMonth();


// ----- Cards for each product.
/* Selecting the element with the class product__title, and then calling the function
truncateTextByLines function, truncating the title to 2 lines. */
const titleProducts = document.querySelector('.product__title');
truncateTextByLines(titleProducts, 2);

/* Select the element with the class product__description, and then call the function
truncateTextByLines function, truncating the description to 4 lines. */
const descriptionProducts = document.querySelector('.product__description');
truncateTextByLines(descriptionProducts, 4);
