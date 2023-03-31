import { getCurrentMonth } from "./utils/getCurrentMonth.js";
import { truncateTextByLines } from "./utils/truncateTextByLines.js";
import { offerCountdown } from "./utils/offerCountdown.js";
import { getProductList } from "./controllers/products";
import { ListProducts } from "./components/ListProducts.js";

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

// ----- Countdown to expiration of the offer.
const countdownOfferHTML = document.querySelector('#countdown-offer');
let deadlineDate = new Date();
deadlineDate.setHours(22, 0, 0, 0); // 10 p.m.
offerCountdown(countdownOfferHTML, deadlineDate);


// ----- Favorite icon - btn.
/**
 * When the user clicks on the icon, 
 * toggle the class of the icon between 'fa-regular' and 'fa-solid'.
 * @param icon - the icon element that you want to toggle.
 */
const toggleFavorite = (icon) => {
    icon.classList.toggle('fa-regular');
    icon.classList.toggle('fa-solid');
}

/** Adding an event listener to each button. 
 * When the button is clicked, it will call the toggleFavoritefunction. 
*/
const btnsIconFavorite = document.querySelectorAll('.btn-favorite');
btnsIconFavorite.forEach(btn => {
    const iconFavorite = btn.querySelector('.icon-favorite');
    btn.addEventListener('click', () => toggleFavorite(iconFavorite));
});



const getAllDiscountedProducts = (productsList) => {
    const discountedProducts = productsList.filter(({ discount }) => discount > 0);
    if (discountedProducts.length === 0) {
        console.warn('No se encontraron productos con descuento en getAllDiscountedProducts()');
    }
    return discountedProducts;
}

const getAllDiscountedProductsSortedDescending = (discountedProductsList) => {
    return discountedProductsList.sort((a, b) => b.discount - a.discount);
}



/**
 * This is a test function to list all products.
 */
const renderProducts = async () => {
    try {
        const productsList = await getProductList();
        
        if (!Array.isArray(productsList)) {
            throw new Error(`Error al consultar los datos, se esperaba una lista de productos.`);
        }

        const discountedProductsList = getAllDiscountedProducts(productsList);
        const discountedProductsDescendingList =  getAllDiscountedProductsSortedDescending(discountedProductsList);
        

        const productsOfferdiv = document.querySelector('[data-offer-products]');
        ListProducts(discountedProductsDescendingList, productsOfferdiv);

    } catch (error) {
        throw new Error(`Error en renderProducts(): ${error.message}`);
    }
}


renderProducts();