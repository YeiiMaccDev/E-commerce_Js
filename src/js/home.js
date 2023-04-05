import { getCurrentMonth } from "./utils/getCurrentMonth.js";
import { truncateTextByLines } from "./utils/truncateTextByLines.js";
import { offerCountdown } from "./utils/offerCountdown.js";
import { getProductList } from "./controllers/products";
import { ListProducts } from "./components/ListProducts.js";
import { saveProductsLocalStorage } from "./controllers/LocalStorage.js";




// ----- Banner-offers
/* Getting the current month and displaying it on the page banner-offers. */
const currentMonthNameHtml = document.getElementById('current-month');
currentMonthNameHtml.textContent = getCurrentMonth();

// ----- Countdown to expiration of the offer.
const countdownOfferHTML = document.querySelector('#countdown-offer');
let deadlineDate = new Date();
deadlineDate.setHours(22, 0, 0, 0); // 10 p.m.
offerCountdown(countdownOfferHTML, deadlineDate);



/**
 * It returns a list of products that have a discount greater than 0.
 * @param productsList - Array of objects.
 * @returns An array of objects of the discounted products.
 */
const getAllDiscountedProducts = (productsList) => {
    const discountedProducts = productsList.filter(({ discount }) => discount > 0);
    if (discountedProducts.length === 0) {
        console.warn('No se encontraron productos con descuento en getAllDiscountedProducts()');
    }
    return discountedProducts;
}

/**
 * Sort the discountedProductsList array in descending order by the discount property of each object in
 * the array.
 * @param discountedProductsList - An array of product objects containing discount.
 * @returns an array of objects sorted by discount in descending order.
 */
const getAllDiscountedProductsSortedDescending = (discountedProductsList) => {
    return discountedProductsList.sort((a, b) => b.discount - a.discount);
}


/**
 * It takes a list of products with the best discounted product and displays it.
 * @param bestProductsList - An array with the product with the best discount.
 */
const renderBestDiscountedProduct = (bestProductsList) => {
    try {
        const offerProductsDiv = document.querySelector("[data-offer-products]");
        ListProducts(bestProductsList, offerProductsDiv);
    } catch (error) {
        console.log('Error en renderBestDiscountedProduct():', error);
    }
};


/**
 * It takes a list of discounted products sorted in descending order and displays them.
 * @param discountedProductsDescendingList - A matrix of the discounted products ordered from highest to lowest.
 *  @param limit - is a limited number of products.
 */
const renderDiscountedProduct = (discountedProductsDescendingList, limit = 4) => {
    try {
        const offerProductsDiv = document.querySelector("[data-discounted-products]");
        ListProducts(discountedProductsDescendingList.slice(1, limit), offerProductsDiv);
    } catch (error) {
        console.log('Error en renderDiscountedProduct():', error);
    }
};


/**
 * It takes a list of products and displays them.
 * @param productsList - is an array of product objects.
 * @param limit - is a limited number of products.
 */
const renderAllProducts = (productsList, limit = 15) => {
    try {
        const productsDiv = document.querySelector("[data-products]");
        ListProducts(productsList.slice(0, limit), productsDiv);
    } catch (error) {
        console.log('Error en renderDiscountedProduct():', error);
    }
};


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
        const discountedProductsDescendingList = getAllDiscountedProductsSortedDescending(discountedProductsList);

        renderBestDiscountedProduct([discountedProductsDescendingList[0]]);
        renderDiscountedProduct(discountedProductsDescendingList);
        renderAllProducts(productsList);


        saveProductsLocalStorage(productsList);

    } catch (error) {
        throw new Error(`Error en renderProducts(): ${error.message}`);
    }
}


renderProducts();