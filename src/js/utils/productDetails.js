import { renderProductDetails } from "../components/ProductDetails";

/**
 * The function adds a product to the cart when the "Add to Cart" button is clicked.
 * @param btnAddToCart - a button element that triggers the addToCart function when clicked 
 * and contains a dataset attribute called "productId".
 */
const showDetails = (link) => {
    const { productId } = link.dataset;
    renderProductDetails(parseInt(productId));
}


/**
 * This function adds an event listener to the "add-to-cart-button" 
 * and calls the addToCart function when clicked.
 * @param productoHTML - An HTML element that contains a product. 
 * The function adds an event listener to the "Add to Cart" button.
 */
export const addEventListenerShowDetails = (productoHTML) => {
    const links = productoHTML.querySelectorAll('.show__product-details');
    links.forEach((link) => {
        link.addEventListener('click', () => showDetails(link));
    })
}